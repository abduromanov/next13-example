import { Container, useDisclosure, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

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
    <Container>{props.children}</Container>
  );
}
