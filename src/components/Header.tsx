import { Flex, Input, Text, Icon, HStack, Box, Avatar } from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from "react-icons/ri";

export function Header() {
  return (
    <Flex
      as='header'
      w='100%'
      maxWidth='1480px'
      h='20' // 20x4 = 80
      mx='auto' // horizontal margin
      mt='4'
      align='center'
      px='6' // horizontal padding
    >
      <Text fontSize='3xl' fontWeight='bold' letterSpacing='tight' w='64'>
        dashgo
        <Text as='span' textColor='pink.500' ml='1'>
          .
        </Text>
      </Text>

      <Flex
        as='label'
        flex='1'
        py='4' // vertical padding
        px='8' // horizontal padding
        ml='6' //margin left
        maxWidth={400}
        alignSelf='center'
        color='gray.200'
        position='relative'
        bg='gray.800'
        borderRadius='full'
      >
        <Input
          textColor='gray.50'
          variant='unstyled'
          placeholder='Buscar na plataforma'
          _placeholder={{ color: "gray.400" }}
          px='4'
          mr='4'
        />
        <Icon as={RiSearchLine} fontSize={20} />
      </Flex>

      <Flex align='center' ml='auto'>
        <HStack
          spacing='8'
          mx='8'
          pr='8'
          py='1'
          color='gray.300'
          borderRightWidth='1px'
          borderColor='gray.700'
        >
          <Icon as={RiNotificationLine} fontSize={20} />
          <Icon as={RiUserAddLine} fontSize={20} />
        </HStack>

        <Flex align='center'>
          <Box mr='4' textAlign='right'>
            <Text>Josiel Matos</Text>
            <Text color='gray.300' fontSize='small'>
              email@gmail.com
            </Text>
          </Box>
          <Avatar size='md' name="Josiel Matos" src="https://github.com/JosielMatos.png" />
        </Flex>
      </Flex>
    </Flex>
  );
}
