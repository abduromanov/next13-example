import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { Disclosure } from "@/types";

type Props = {
  disclosure: Disclosure;
};

export default function Header(props: Props) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("anggota");
    router.push("auth/login");
  };

  return (
    <HStack
      justifyContent={"space-between"}
      p={4}
      mb={8}
      borderBottomWidth={1}
      shadow="sm"
    >
      <IconButton
        as={Bars3Icon}
        aria-label={"menu"}
        p={2}
        colorScheme={"brand"}
        className={"cursor-pointer"}
        onClick={props.disclosure.onToggle}
      />
      <Menu closeOnSelect strategy="absolute">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />}
          variant="outline"
          borderRadius={"full"}
        />
        <MenuList>
          <MenuItem
            icon={<Icon as={ArrowLeftOnRectangleIcon} fontSize={"xl"} />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
