import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Josiel Matos</Text>
        <Text color='gray.300' fontSize='small'>
          email@gmail.com
        </Text>
      </Box>
      <Avatar
        size='md'
        name='Josiel Matos'
        src='https://github.com/JosielMatos.png'
      />
    </Flex>
  );
}
