import { usePagination } from "@ajna/pagination";
import {
  Box,
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
  Spacer,
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

import { TSimpanan } from "@/types";

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
    <>
      <Box>
        <Box mt="-6">
          <BreadcrumbSection data={breadcrumbData} />
        </Box>
        <Card m={5} boxShadow="md" size="md">
          <CardHeader>
            <Flex alignItems="start" flexWrap="wrap" gap={5}>
              <Heading size="md">Data simpanan Anggota</Heading>
              <Spacer />
              <Box w={64}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MagnifyingGlassIcon} color="gray" />
                  </InputLeftElement>
                  <Input
                    placeholder="cari berdasarkan nama"
                    focusBorderColor="teal.200"
                  />
                </InputGroup>
              </Box>
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
                    <Th>Alamat</Th>
                    <Th>Total Simpanan</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {(listSimpananAnggota || []).map((item: TSimpanan) => (
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
      </Box>
    </>
  );
}
