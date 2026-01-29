// This hook will commicate with the category 
// (/api/category) GET API endpoint

import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetConnectedBank = () => {
    const query = useQuery({
        queryKey: ['connectedBank'],
        queryFn: async () => {
            const response = await client.api.plaid['connected-bank'].$get();

            if (!response.ok) {
                throw new Error('Failed to get connected bank')
            }
            // destructure data
            const { data } = await response.json();
            return data;
        }
    });

    return query;
}