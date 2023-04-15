import { useMutation } from '@tanstack/react-query';

import { api } from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { User } from '@/types/user';

type CreateUserData = Omit<User, 'id' | 'createdAt'>;

async function createUser(userData: CreateUserData) {
  const { data } = await api.post('users', {
    user: {
      ...userData,
      created_at: new Date(),
    },
  });

  return data;
}

export function useCreateUserMutation() {
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { createUserMutation };
}
