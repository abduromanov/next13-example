import { Avatar, Box, Container, GridItem, Heading, SimpleGrid, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import moment from "moment";
import { ReactNode, useMemo } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import { TAnggota } from "@/types";

type Props = {
  anggota: TAnggota;
  children: ReactNode | JSX.Element;
};

export default function Layouts(props: Props) {
  const disclosure = useDisclosure();
  const anggota = props.anggota;
  const tglBergabung = useMemo(() => moment(anggota.tglDibuat).format('DD MMM YYYY'), [anggota.tglDibuat]);
  const status = useMemo(() => anggota.status === "published" ? "Aktif" : "Tidak Aktif", [anggota.status])

  return anggota.role === "admin" ? (
    <section className="flex w-full min-w-full">
      <Sidebar disclosure={disclosure} />
      <VStack
        alignItems={"stretch"}
        w={{ lg: "calc(100% - 16rem)", base: "full" }}
        className="m-0 lg:ml-64"
      >
        <Header disclosure={disclosure} />
        {props.children}
      </VStack>
    </section>
  ) : (
    <Box as="section" position="relative" pt="20">
      <Box h="32" bg="brand.500" w="full" pos="absolute" inset="0" />
      <Stack pos="relative" px="6" pb="6" bg="gray.100" mx="auto" maxW="xl" alignItems={["start", "center"]} borderRadius={["none", "lg"]}>
        <Avatar size="xl" display="inline-flex" justifyContent="center" mt="-10" borderWidth="6px" borderColor="gray.100" />
        <Box textAlign={['left', 'center']} w={['full', 'auto']}>
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
      </Stack>
      <Container>
        {props.children}
      </Container>
    </Box>
  );
}
