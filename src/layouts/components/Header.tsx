import {
  Avatar,
  Hide,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { TAnggota } from "@/types";

type Props = {
  disclosure: ReturnType<typeof useDisclosure>;
  anggota?: TAnggota;
};

export default function Header(props: Props) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("anggota");
    router.push("auth/login");
  };

  return (
    <HStack
      flexDirection={{ base: "row", lg: "row-reverse" }}
      justifyContent={"space-between"}
      p={4}
      mb={8}
      borderBottomWidth={1}
      shadow="sm"
    >
      <Hide above="lg">
        <IconButton
          as={Bars3Icon}
          aria-label={"menu"}
          p={2}
          colorScheme={"brand"}
          className={"cursor-pointer"}
          onClick={props.disclosure.onToggle}
        />
      </Hide>
      <Menu closeOnSelect strategy="absolute">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar name={props.anggota?.nama} bg="brand.500" color="white" />}
          variant="ghost"
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
