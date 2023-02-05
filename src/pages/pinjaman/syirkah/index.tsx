import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TableSyirkah from "@/pages/pinjaman/syirkah/components/TableSyirkah";

type TPageProps = {
  pageTitle: string;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Syirkah",
    },
  };
};

const dataSyirkah = [
  {
    id: 1,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
  {
    id: 2,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
  {
    id: 3,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
  {
    id: 4,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
  {
    id: 5,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
  {
    id: 6,
    namaBC: "makan malam",
    namaAnggota: "admin",
    idAnggota: "123456789",
    modalAwal: "cicil rumah",
    modalHamasah: "Rp.10.900.000",
    tglMulai: "Rp.27.800.000",
    tglSelesai: "30 September 2022",
  },
];

export default function PageSyirkah() {
  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Syirkah",
    },
  ];
  return (
    <>
      <Box>
        <Box mt="-6">
          <BreadcrumbSection data={breadcrumbData} />
        </Box>
        <Card boxShadow="md" mx={5}>
          <CardHeader>
            <Flex mb={3}>
              <Box>
                <Heading size="md">Data Syirkah Anggota</Heading>
              </Box>
              <Spacer />
              <Box>
                <Button colorScheme="teal">
                  <Icon as={PlusIcon} />
                  &nbsp;Tambah Pinjaman
                </Button>
              </Box>
            </Flex>
            <Divider />
            <Box w="300px" mt={3}>
              <Text fontSize="sm">Pencarian</Text>
              <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MagnifyingGlassIcon} color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="cari berdasarkan nama"
                  focusBorderColor="teal.200"
                />
              </InputGroup>
            </Box>
          </CardHeader>
          <CardBody mt={-5}>
            <TableContainer>
              <Table mb={5}>
                <Thead>
                  <Tr>
                    <Th>Nama BC</Th>
                    <Th>Nama Anggota</Th>
                    <Th>ID Anggota</Th>
                    <Th>Modal Awal</Th>
                    <Th>Modal Hamasah</Th>
                    <Th>Tanggal Mulai</Th>
                    <Th>Tanggal Seleksi</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSyirkah.map((item, index) => (
                    <TableSyirkah key={index} item={item} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
