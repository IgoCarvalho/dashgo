import { api } from '@/services/api';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

async function getUsers(page: number) {
  const { data, headers } = await api.get<{ users: User[] }>('users', {
    params: {
      page,
    },
  });

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  const totalCount = Number(headers['x-total-count']);

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
    staleTime: 6000,
  });
}
