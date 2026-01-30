import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";
import { useSubscriptionModal } from "@/features/subscriptions/hooks/use-subscription-modal";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

export const SubscriptionModal = () => {
  const checkout = useCheckoutSubscription();

  const { isOpen, onClose } = useSubscriptionModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Get unlimited access to all features and priority support.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center gap-x-2">
            <CheckCircle2 className="size-5 fill-emerald-500 mr-2 text-white" />
            <p className="text-sm text-muted-foreground">
              Bank account syncing
            </p>
          </li>
          <li className="flex items-center gap-x-2">
            <CheckCircle2 className="size-5 fill-emerald-500 mr-2 text-white" />
            <p className="text-sm text-muted-foreground">Upload CSV files</p>
          </li>
          <li className="flex items-center gap-x-2">
            <CheckCircle2 className="size-5 fill-emerald-500 mr-2 text-white" />
            <p className="text-sm text-muted-foreground">
              Different chart types
            </p>
          </li>
              </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            disabled={checkout.isPending}
            onClick={() => checkout.mutate()}
            className="w-full"
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
