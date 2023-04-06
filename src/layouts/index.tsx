/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { Box, Container, useDisclosure, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

import AnggotaCardProfile from "./components/AnggotaCardProfile";
import AnggotaTabs from "./components/AnggotaTabs";
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

  return anggota?.role === "admin" ? (
    <section className="flex w-full min-w-full">
      <Sidebar disclosure={disclosure} />
      <VStack
        alignItems={"stretch"}
        w={{ lg: "calc(100% - 16rem)", base: "full" }}
        ml={{ base: 0, lg: "64" }}
      >
        <Header disclosure={disclosure} anggota={anggota} />
        {props.children}
      </VStack>
    </section>
  ) : (
    <Box as="section" position="relative" pt="16">
      <Box h="32" bg="brand.500" w="full" pos="absolute" inset="0" />
      <AnggotaCardProfile anggota={anggota} />
      <Container maxW="container.lg" px={0}>
        <AnggotaTabs />
        {props.children}
      </Container>
    </Box>
  );
}
