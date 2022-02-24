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
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function Users() {
  const [page, setPage] = useState(1);

  /** Setar breakpoint mobile e desktop */
  const isScreenWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  /** Puxar os dados da api pelo hook */
  const { data, isLoading, isFetching, error } = useUsers(page);

  /** Fazer um pré carregamento dos dados do usuário ao passar o mouse */
  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 5, // 5 min de dados "frescos"
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxWidth='1480px' mx='auto' px={["0", "6"]}>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Lista de Usuários
              {!isLoading && isFetching && (
                <Spinner size='sm' color='gray.500' ml='4' />
              )}
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                cursor='pointer'
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao carregar os dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color='gray.300' width='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>Usuário</Th>
                    {isScreenWide && <Th>Data de cadastro</Th>}
                    <Th w='8'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color='purple.400'
                            onMouseEnter={() =>
                              handlePrefetchUser(Number(user.id))
                            }
                          >
                            <Text fontWeight='bold'>{user.name}</Text>
                          </Link>
                          <Text fontSize='sm' color='gray.300'>
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isScreenWide && <Td>{user.createdAt}</Td>}
                      <Td>
                        <Button
                          as='a'
                          fontSize='sm'
                          colorScheme='blackAlpha'
                          leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                          cursor='pointer'
                        >
                          {isScreenWide ? "Editar" : ""}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalRegisterCount={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
