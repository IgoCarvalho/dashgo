import { api } from '@/services/api';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

async function getUsers() {
  const { data } = await api.get<{ users: User[] }>('users');

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users };
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 6000,
  });
}
