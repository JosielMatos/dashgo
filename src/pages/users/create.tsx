import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type UserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

/**Form validation schema */
const userFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Mínimo de 8 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas não conferem"),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<UserFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
  };

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxWidth='1480px' mx='auto' px={["0", "6"]}>
        <Sidebar />

        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p='8'
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'>
            Criar Usuário
          </Heading>

          <Divider my='6' borderColor='gray.700' />

          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <Input
                name='name'
                label='Nome Completo'
                placeholder='Michael Jackson'
                {...register("name")}
                error={errors.name}
              />
              <Input
                name='email'
                type='email'
                label='Email'
                placeholder='name@email.com'
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <Input
                name='password'
                type='password'
                label='Senha'
                placeholder='password'
                {...register("password")}
                error={errors.password}
              />
              <Input
                name='password_confirmation'
                type='password'
                label='Confirmar Senha'
                placeholder='confirm password'
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button as='a' colorScheme='whiteAlpha'>
                  Cancelar
                </Button>
              </Link>
              <Button
                colorScheme='pink'
                type='submit'
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
