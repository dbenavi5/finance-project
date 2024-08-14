// This hook will commicate with the category 
// (/api/category) GET API endpoint

import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['category', { id }],
        queryFn: async () => {
            const response = await client.api.categories[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error('Failed to get category')
            }
            // destructure data
            const { data } = await response.json();
            return data;
        }
    });

    return query;
}