import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface profileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: profileProps) {
  return (
    <Flex align='center'>
      {showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Josiel Matos</Text>
          <Text color='gray.300' fontSize='small'>
            email@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size='md'
        name='Josiel Matos'
        src='https://github.com/JosielMatos.png'
      />
    </Flex>
  );
}
