import {
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";

import { Input } from "../components/Form/Input";

export default function SignIn() {
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
      >
        <Stack spacing='4'>
          <Input name="email" type="email" label="Email" />
          <Input name="password" type="password" label="Senha" />
        </Stack>

        <Button
          type='submit'
          mt='6' // margin top
          colorScheme='pink'
          size='lg'
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
