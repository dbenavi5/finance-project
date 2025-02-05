// This hook will commicate with the accounts 
// (/api/accounnts) GET API endpoint

import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['account', { id }],
        queryFn: async () => {
            const response = await client.api.accounts[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error('Failed to get account')
            }
            // destructure data
            const { data } = await response.json();
            return data;
        }
    });

    return query;
}