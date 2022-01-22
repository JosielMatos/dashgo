import {
  Flex,
  Input,
  Button,
  Stack,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export default function Home() {
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
          <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              name='email'
              type='email'
              focusBorderColor='pink.500'
              bgColor='gray.900'
              placeholder='Email'
              variant='filled' // input style
              _hover={{
                bgColor: "gray.900", // change bg color of hover effect
              }}
              size='lg'
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='password'>Senha</FormLabel>
            <Input
              id='password'
              name='password'
              type='password'
              focusBorderColor='pink.500'
              bgColor='gray.900'
              placeholder='Senha'
              variant='filled'
              _hover={{
                bgColor: "gray.900",
              }}
              size='lg' // 48px
            />
          </FormControl>
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
