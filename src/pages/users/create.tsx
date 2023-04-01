import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';

type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const createUserFormSchema = z
  .object({
    name: z.string().nonempty('Nome obrigatório'),
    email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .nonempty('Senha obrigatória')
      .min(6, 'No mínimo 6 caracteres'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas precisam ser iguais',
    path: ['passwordConfirmation'],
  });

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserForm> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <Stack spacing="8">
            <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
              <Input
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                error={errors.passwordConfirmation}
                {...register('passwordConfirmation')}
              />
            </SimpleGrid>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Button as={Link} href="/users" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="yellow"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
