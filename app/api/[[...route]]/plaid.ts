import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

const plaidConfiguration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_TOKEN,
      "PLAID-SECRET": process.env.PLAID_SECRET_TOKEN,
    //   "Plaid-Version": "2024-05-07",
    },
  },
});

const plaidClient = new PlaidApi(plaidConfiguration);

const app = new Hono().post(
  "/create-link-token",
  clerkMiddleware(),
  async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: auth.userId,
      },
      client_name: "Finance App",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    return c.json({ data: token.data.link_token }, 200);
  },
);

export default app;
