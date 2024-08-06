// This hook will commicate with the accounts 
// (/api/accounnts) GET API endpoint

import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await client.api.accounts.$get();

            if (!response.ok) {
                throw new Error('Failed to get accounts')
            }
            // destructure data
            const { data } = await response.json();
            return data;
        }
    });

    return query;
}