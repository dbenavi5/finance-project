// This hook will commicate with the transactions 
// (/api/transactions) GET API endpoint

import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useGetTransactions = () => {
    const params = useSearchParams();
    const from = params.get('from') || '';
    const to = params.get('to') || '';
    const accountId = params.get('accountId') || '';
    const query = useQuery({
        // TODO: check if the params are needed in the key
        queryKey: ['transactions', { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get transactions')
            }
            // destructure data
            const { data } = await response.json();
            return data.map((transaction) => ({
                ...transaction,
                amount: convertAmountFromMiliunits(transaction.amount),
            }))
        }
    });

    return query;
}