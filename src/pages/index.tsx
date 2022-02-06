import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

/**Form validation schema */
const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  /**Sign in handler */
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
  };

  const { errors } = formState;

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex
        as='form' // change the div to a form with flex
        w='100%' // width
        maxWidth='360px'
        bg='gray.800' // background
        p='8' // 8x4 = 32px or 2rem
        borderRadius={8} // 8px
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            name='email'
            type='email'
            label='Email'
            placeholder='name@email.com'
            {...register("email")}
            error={errors.email}
          />
          <Input
            name='password'
            type='password'
            label='Senha'
            placeholder='password'
            {...register("password")}
            error={errors.password}
          />
        </Stack>

        <Button
          type='submit'
          mt='6' // margin top
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting} // show loading state while submitting
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
