import { api } from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { User } from '@/types/user';

async function getUser(userId: string) {
  const { data } = await api.get<{ user: User }>(`users/${userId}`);

  return data;
}

function usePrefetchUserQuery(userId: string) {
  return queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePrefetchUser() {
  return { prefetchUser: usePrefetchUserQuery };
}
