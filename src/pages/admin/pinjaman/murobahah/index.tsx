import { usePagination } from "@ajna/pagination";
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
  Progress,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import { useMurobahah } from "@/services/api/commands/murobahah.command";

import ModalConfirmDeleteMurobahah from "./components/ModalConfirmDeleteMurobahah";
import ModalTambahPinjaman from "./components/ModalTambahPinjaman";
import TableMurobahah from "./components/TableMurobahah";

import { TAnggota, TMurobahah } from "@/types";

type TPageProps = {
  pageTitle: string;
  anggota: TAnggota;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      pageTitle: "Murobahah",
      anggota: anggota,
    },
  };
};

export default function PageMurobahah() {
  const [total, setTotal] = useState<number>();
  const [idMurobahah, setIdMurobahah] = useState<number>();
  const [searchNama, setSearchNama] = useState<string>("");
  const [searchIdAnggota, setIdAnggota] = useState<string>("");
  const [searchTglMulai, setSearchTglMulai] = useState<string>("");
  const modalTambahPinjamanRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalConfirmDeleteMurobahahRef =
    useRef<ReturnType<typeof useDisclosure>>();

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });
  const listMurobahahQuery = useMurobahah([
    searchNama,
    searchIdAnggota,
    searchTglMulai,
  ]).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      nama: searchNama,
      idAnggota: searchIdAnggota,
      tglMulai: searchTglMulai,
    },
  });

  const listMurobahah = listMurobahahQuery.data?.data?.data;
  const metadata = listMurobahahQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  const refetchQuery = () => listMurobahahQuery.refetch();

  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Murobahah",
    },
  ];
  return (
    <Stack spacing={8} px={8} pb={10}>
      <Box>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex alignItems="center" justify="space-between" mx={5}>
        <Heading size="lg">Pinjaman Murobahah</Heading>
        <Button
          as="span"
          leftIcon={<Icon as={PlusIcon} />}
          onClick={() => {
            modalTambahPinjamanRef.current?.onOpen();
          }}
        >
          Tambah Pinjaman
        </Button>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Flex gap="4" alignItems="center" flexWrap="wrap">
            <Box w={["full", "200px"]}>
              <Text fontSize="sm">Nama Anggota</Text>
              <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MagnifyingGlassIcon} color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="cari berdasarkan nama"
                  focusBorderColor="brand.500"
                  onChange={(e) => setSearchNama(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box w={["full", "200px"]}>
              <Text fontSize="sm">ID Anggota</Text>
              <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MagnifyingGlassIcon} color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="cari berdasarkan ID"
                  focusBorderColor="brand.500"
                  onChange={(e) => setIdAnggota(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box w={["full", "200px"]}>
              <Text fontSize="sm">Tanggal mulai Cicilan</Text>
              <Input
                type="date"
                focusBorderColor="brand.500"
                mt={2}
                onChange={(e) => setSearchTglMulai(e.target.value)}
              />
            </Box>
          </Flex>
        </CardHeader>
        <Divider />
        {listMurobahahQuery.isLoading && <Progress size="xs" isIndeterminate />}
        <CardBody>
          <TableContainer p="3" mb={3}>
            <Table mb={3}>
              <Thead>
                <Tr>
                  <Th>Nama Anggota</Th>
                  <Th>ID Anggota</Th>
                  <Th>Pembiayaan</Th>
                  <Th>Total Pinjaman</Th>
                  <Th>Total Terbayar</Th>
                  <Th>Tanggal Mulai Cicilan</Th>
                  <Th>Lunas</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listMurobahah || []).map((item: TMurobahah) => (
                  <TableMurobahah
                    item={item}
                    key={item.id}
                    modalHandler={() => {
                      modalConfirmDeleteMurobahahRef.current?.onOpen();
                      setIdMurobahah(Number(item.id));
                    }}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Skeleton w="full" isLoaded={!listMurobahahQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>
      <ModalTambahPinjaman
        ref={modalTambahPinjamanRef}
        refetchFn={refetchQuery}
      />
      <ModalConfirmDeleteMurobahah
        ref={modalConfirmDeleteMurobahahRef}
        refetchFn={refetchQuery}
        id={idMurobahah || 0}
      />
    </Stack>
  );
}
