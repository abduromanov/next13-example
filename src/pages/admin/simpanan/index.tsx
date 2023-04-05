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

import useCustomPagination from "@/hooks/useCustomPagination";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import TableSimpananAnggota from "@/components/pages/simpanan/TableSimpanan";

import TablePagination from "@/layouts/components/TablePagination";
import { useSimpanan } from "@/services/api/commands/simpanan.command";

import { TAnggota } from "@/types";

interface TPageProps {
  anggota: TAnggota;
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      anggota: anggota,
      pageTitle: "Simpanan Anggota",
    },
  };
};

export default function Page() {
  // TODO: Fix issues below
  //  - Searchbar unresponsive
  //  - Make searchbar full width in mobile screen
  //  - Pagination cropped in mobile screen
  //  - change tanggal dibuat to tanggal tranaksi
  //  - ubah filter tanggaldibuat ke tanggal transaksi
  //  - sorting tanngal
  //  - benerin create debit -> harusnya create 3 record  data (wajib, sukarela, khusus) tapi khusus nya belom

  const [total, setTotal] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pagination = useCustomPagination(total);

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
            <Heading size="lg">Simpanan Anggota</Heading>
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
          </TableContainer>

          <Skeleton w="full" isLoaded={!listSimpananAnggotaQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>
    </Stack>
  );
}
