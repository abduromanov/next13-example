import {
  Avatar,
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useMemo } from "react";

import { TAnggota } from "@/types";

export default function AnggotaCardProfile({ anggota }: { anggota: TAnggota }) {
  const tglBergabung = useMemo(
    () => moment(anggota.tglDibuat).format("DD MMM YYYY"),
    [anggota.tglDibuat]
  );
  const status = useMemo(
    () => (anggota.status === "published" ? "Aktif" : "Tidak Aktif"),
    [anggota.status]
  );

  return (
    <Stack
      pos="relative"
      px="6"
      pb="6"
      bg="gray.100"
      mx="auto"
      maxW="xl"
      alignItems={["start", "center"]}
      borderRadius={["none", "lg"]}
    >
      <Avatar
        size="xl"
        display="inline-flex"
        justifyContent="center"
        mt="-10"
        borderWidth="6px"
        borderColor="gray.100"
      />
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
    </Stack>
  );
}
