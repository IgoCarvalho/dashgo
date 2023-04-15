import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '@/components/Header/Header';
import { Pagination } from '@/components/Pagination/Pagination';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { usePrefetchUser } from '@/hooks/usePrefetchUser';
import { useUsers } from '@/hooks/useUsers';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isRefetching, error } = useUsers(currentPage);
  const { prefetchUser } = usePrefetchUser();

  function handlePrefetchUser(userId: string) {
    prefetchUser(userId);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={isWideVersion ? '8' : '6'}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isRefetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Button
              as={NextLink}
              href="/users/create"
              size="sm"
              fontSize="sm"
              colorScheme="yellow"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </Flex>

          {isLoading ? (
            <Flex justify="center" align="center" height={250}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center" align="center" height={250}>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <TableContainer>
                <Table color="whiteAlpha" size={isWideVersion ? 'md' : 'sm'}>
                  <Thead>
                    <Tr>
                      <Th px={['4', '4', '6']} color="gray.300" width="8">
                        <Checkbox colorScheme="yellow" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th w="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.users.map((user) => (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="yellow" />
                        </Td>

                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            iconSpacing={isWideVersion ? 2 : 0}
                          >
                            {isWideVersion && 'Editar'}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Pagination
                totalCountOfRegisters={data?.totalCount || 0}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                siblingPagesCount={2}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
