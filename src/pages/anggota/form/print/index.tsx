import {
  Box,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { NextPageWithLayout } from "@/pages/_app";

import { TFormRequest } from "@/types";

interface TPageProps {
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Form Pengajuan",
    },
  };
};

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<TFormRequest>();
  const tglSekarang = useMemo(() => moment().format("DD MMMM YYYY"), []);

  useEffect(() => {
    const formRequest: TFormRequest = JSON.parse(
      sessionStorage.getItem("requestData") || ""
    );
    setData(formRequest);

    const handleAfterPrint = () => {
      router.back();
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return function cleanupListener() {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [router]);

  useEffect(() => {
    if (data) {
      window.print();
    }
  }, [data]);

  return (
    <Container maxW="container.lg" pt={8}>
      <Stack spacing={8}>
        <Stack spacing={2}>
          <Heading size="md">Koperasi Syariah Hamasah</Heading>
          <Text maxW="50%" fontSize="sm">
            Jl. H. Rijin Kav. Iqra’ No. 196-A RT.01/RW.09 Jati makmur, Pondok
            Gede, Bekasi, Jawa Barat
          </Text>
        </Stack>

        <Box w="full">
          <Heading textAlign="center" mx="auto" maxW="85%">
            Permohonan dan Pengajuan Pembiayaan Koperasi Syariah Hamasah
          </Heading>
        </Box>

        <SimpleGrid columns={5} gap={2}>
          <GridItem>
            <Text>Nama</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.nama}</GridItem>

          <GridItem>
            <Text>No. ID HNI</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.idHNI}</GridItem>

          <GridItem>
            <Text>Alamat</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.alamat}</GridItem>
        </SimpleGrid>

        <SimpleGrid columns={5} gap={2}>
          <GridItem>
            <Text>Alamat Email</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.email}</GridItem>

          <GridItem>
            <Text>No. Telp Rumah</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.telpRumah}</GridItem>

          <GridItem>
            <Text>No. HP/WA</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.telpWA}</GridItem>
        </SimpleGrid>

        <Text>Dengan ini mengajukan pembiyaan: </Text>

        <SimpleGrid columns={5} gap={2}>
          <GridItem>
            <Text>1. Keperluan</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.keperluan}</GridItem>

          <GridItem>
            <Text>2. Jumlah</Text>
          </GridItem>
          <GridItem colSpan={4}>: Rp. {data?.jumlah}</GridItem>

          <GridItem>
            <Text>3. Jangka Waktu</Text>
          </GridItem>
          <GridItem colSpan={4}>: {data?.jangkaWaktu || 0} Bulan</GridItem>
        </SimpleGrid>

        <Text>
          Dengan pengajuan ini saya bersedia mentaati segala ketentuan dan
          peraturan yang berlaku di KOPERASI SYARIAH HAMASAH.
        </Text>

        <SimpleGrid columns={2}>
          <GridItem>
            <Box justifyContent="center" textAlign="center">
              <Text>Mengetahui,</Text>
              <Text>Suami/Istri</Text>
              <Box h="70px"></Box>
              <Text>(...................................)</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box justifyContent="center" textAlign="center">
              <Text>.........., {tglSekarang}</Text>
              <Text>yang mengajukan,</Text>
              <Box h="70px"></Box>
              <Text>(...................................)</Text>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

Page.getLayout = function getLayout(page: NextPageWithLayout) {
  return page;
};
