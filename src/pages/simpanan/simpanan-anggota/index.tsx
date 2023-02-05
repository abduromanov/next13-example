import { usePagination } from "@ajna/pagination";
import {
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
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import TableSimpananAnggota from "@/pages/simpanan/simpanan-anggota/components/TableSimpanan";
import { useSimpanan } from "@/services/api/commands/simpanan.command";

import { TAnggota } from "@/types";

interface TPageProps {
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Simpanan Anggota",
    },
  };
};

export default function PageSimpanan() {
  const [total, setTotal] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const listSimpananAnggotaQuery = useSimpanan().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: searchTerm,
    },
  });

  const listSimpananAnggota = listSimpananAnggotaQuery.data?.data?.data;
  const metadata = listSimpananAnggotaQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  const breadcrumbData = [
    {
      name: "Simpanan",
    },
    {
      name: "Simpanan Anggota",
    },
  ];

  return (
    <Stack spacing={8} px={8} pb={10}>
      <BreadcrumbSection data={breadcrumbData} />

      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading size="md">Data simpanan Anggota</Heading>
            <InputGroup w={"25%"}>
              <InputLeftElement pointerEvents="none">
                <Icon as={MagnifyingGlassIcon} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Cari berdasarkan nama / No. ID"
                focusBorderColor="teal.200"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Flex>
        </CardHeader>

        <Divider />
        {listSimpananAnggotaQuery.isLoading && (
          <Progress size="xs" isIndeterminate />
        )}

        <CardBody>
          <TableContainer p="3">
            <Table mb={3}>
              <Thead>
                <Tr>
                  <Th>Nama Anggota</Th>
                  <Th>ID Anggota</Th>
                  <Th textAlign="right">Total Simpanan</Th>
                  <Th textAlign="center">Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listSimpananAnggota || []).map((item: TAnggota) => (
                  <TableSimpananAnggota item={item} key={item.id} />
                ))}
              </Tbody>
            </Table>
            <Skeleton w="full" isLoaded={!listSimpananAnggotaQuery.isLoading}>
              <TablePagination pagination={pagination} />
            </Skeleton>
          </TableContainer>
        </CardBody>
      </Card>
    </Stack>
  );
}
