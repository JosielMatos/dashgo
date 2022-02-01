import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const isScreenWide = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      <Logo />

      {isScreenWide && <SearchBox />}

      <Flex align='center' ml='auto'>
        <NotificationsNav />

        <Profile showProfileData={isScreenWide} />
      </Flex>
    </Flex>
  );
}
