// This hook will commicate with the accounts 
// (/api/accounnts) GET API endpoint

import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['transaction', { id }],
        queryFn: async () => {
            const response = await client.api.transactions[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error('Failed to get transaction')
            }
            // destructure data
            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromMiliunits(data.amount),
            }
        }
    });

    return query;
}