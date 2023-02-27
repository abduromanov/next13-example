import { usePagination } from "@ajna/pagination";
import {
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
import TableSyirkah from "@/pages/pinjaman/syirkah/components/TableSyirkah";
import { useSyirkah } from "@/services/api/commands/syirkah.command";

import ModalCreateSyirkah from "./components/ModalCreateSyirkah";

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

export default function Page() {
  const [total, setTotal] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const modalCreateRef = useRef<ReturnType<typeof useDisclosure>>();

  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Syirkah",
    },
  ];

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const listSyirkahQuery = useSyirkah().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: searchTerm,
    },
  });

  const listSyirkah = listSyirkahQuery.data?.data?.data;
  const metadata = listSyirkahQuery.data?.data?.meta;

  const refetchQuery = () => listSyirkahQuery.refetch();

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  return (
    <Stack spacing="8" px="8" pb="10">
      <BreadcrumbSection data={breadcrumbData} />

      <Flex alignItems="center" justify="space-between">
        <Heading size="lg">Data Syirkah Anggota</Heading>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          onClick={modalCreateRef.current?.onOpen}
        >
          Tambah Pinjaman
        </Button>
      </Flex>

      <Card m={5} variant="outline" shadow="sm">
        <CardHeader display="flex" justifyContent="flex-end">
          <InputGroup w="25%">
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlassIcon} color="gray" />
            </InputLeftElement>
            <Input
              placeholder="Cari berdasarkan nama / No. ID"
              focusBorderColor="brand.400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </CardHeader>

        <Divider />
        {listSyirkahQuery.isLoading && <Progress size="xs" isIndeterminate />}

        <CardBody>
          <TableContainer p="0" mb="5">
            <Table>
              <Thead>
                <Tr>
                  <Th>Nama BC</Th>
                  <Th>Nama Anggota</Th>
                  <Th>ID Anggota</Th>
                  <Th textAlign="right">Modal Awal</Th>
                  <Th textAlign="right">Modal Hamasah</Th>
                  <Th>Tanggal Mulai</Th>
                  <Th>Tanggal Selesai</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listSyirkah || []).map((item) => (
                  <TableSyirkah key={item.id} item={item} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Skeleton w="full" isLoaded={!listSyirkahQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>

      <ModalCreateSyirkah ref={modalCreateRef} refetchFn={refetchQuery} />
    </Stack>
  );
}
