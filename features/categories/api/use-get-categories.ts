// This hook will commicate with the categories 
// (/api/categories) GET API endpoint

import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await client.api.categories.$get();

            if (!response.ok) {
                throw new Error('Failed to get categories')
            }
            // destructure data
            const { data } = await response.json();
            return data;
        }
    });

    return query;
}