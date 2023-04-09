import {
  Avatar,
  Badge,
  Box,
  Button,
  GridItem,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowLeftOnRectangleIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router";
import { useMemo, useRef } from "react";

import ModalChangePassword from "./ModalChangePassword";

import { TAnggota } from "@/types";

export default function AnggotaCardProfile({ anggota }: { anggota: TAnggota }) {
  const router = useRouter();
  const modalRef = useRef<ReturnType<typeof useDisclosure>>();

  const tglBergabung = useMemo(
    () => moment(anggota.tglDibuat).format("DD MMM YYYY"),
    [anggota.tglDibuat]
  );
  const status = useMemo(
    () => (anggota.status === "published" ? "Aktif" : "Tidak Aktif"),
    [anggota.status]
  );

  const handleLogout = () => {
    Cookies.remove("anggota");
    router.push("auth/login");
  };

  return (
    <Stack
      pos="relative"
      px="6"
      pb="6"
      bg="gray.100"
      mx="auto"
      maxW="5xl"
      alignItems={["start", "center"]}
      borderTopRadius={["none", "lg"]}
    >
      <Avatar
        size="xl"
        display="inline-flex"
        justifyContent="center"
        mt="-10"
        borderWidth="6px"
        borderColor="gray.100"
      />
      <Box position="absolute" top={4} right={6}>
        <Menu>
          <MenuButton as={Button} leftIcon={<Icon as={UserIcon} />}>
            Akun
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<Icon as={KeyIcon} />}
              onClick={() => modalRef.current?.onOpen()}
            >
              Ganti Password
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red"
              icon={<Icon as={ArrowLeftOnRectangleIcon} />}
              onClick={handleLogout}
            >
              Keluar
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box textAlign={["left", "center"]} w={["full", "auto"]}>
        <Heading>{anggota.nama}</Heading>
        <Text size="sm">Anggota Koperasi Hamasah</Text>
        <SimpleGrid columns={[1, 3]} mt="4" gap={[3, 8]}>
          <GridItem>
            <Text>Sejak</Text>
            <Text fontWeight="bold">{tglBergabung}</Text>
          </GridItem>
          <GridItem>
            <Text>ID Anggota</Text>
            <Text fontWeight="bold">{anggota.idAnggota}</Text>
          </GridItem>
          <GridItem>
            <Text>Status</Text>
            <Text fontWeight="bold">{status}</Text>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Portal>
        <ModalChangePassword ref={modalRef} />
      </Portal>
    </Stack>
  );
}
