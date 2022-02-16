import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import Link from "next/link";
import { useQuery } from "react-query";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function Users() {
  const isScreenWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();

    const users = data.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    return users;
  }, {
    staleTime: 1000 * 10,
  });

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxWidth='1480px' mx='auto' px={["0", "6"]}>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Lista de Usuários
            </Heading>

            <Link href='/users/create' passHref>
              <Button
                as='a'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                cursor='pointer'
              >
                Criar novo
              </Button>
            </Link>
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
                  {data.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{user.name}</Text>
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

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
