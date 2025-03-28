import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AnggotaTabs() {
  const router = useRouter();

  return (
    <Box
      overflowX="auto"
      scrollPaddingBottom="5"
      whiteSpace="nowrap"
      shadow="md"
    >
      <SimpleGrid
        columns={4}
        columnGap="3"
        textAlign="center"
        w={["150%", "full"]}
      >
        <GridItem>
          <Link href="/anggota">
            <Box
              borderColor={
                router.pathname.endsWith("anggota") ? "brand.500" : "white"
              }
              borderBottomWidth="medium"
              py="3"
            >
              <Text fontWeight="bold">Pengumuman</Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link href="/anggota/simpanan">
            <Box
              borderColor={
                router.pathname.match(/simpanan\|*/) ? "brand.500" : "white"
              }
              borderBottomWidth="medium"
              py="3"
            >
              <Text fontWeight="bold">Simpanan</Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link href="/anggota/murobahah">
            <Box
              borderColor={
                router.pathname.match(/murobahah\|*/) ? "brand.500" : "white"
              }
              borderBottomWidth="medium"
              py="3"
            >
              <Text fontWeight="bold">Murobahah</Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link href="/anggota/syirkah">
            <Box
              borderColor={
                router.pathname.match(/syirkah|\*/) ? "brand.500" : "white"
              }
              borderBottomWidth="medium"
              py="3"
            >
              <Text fontWeight="bold">Syirkah</Text>
            </Box>
          </Link>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
