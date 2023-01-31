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
import Link from "next/link";
import { useEffect, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import TableMurobahah from "@/pages/pinjaman/murobahah/components/TableMurobahah";
import { useMurobahah } from "@/services/api/commands/murobahah.command";

import { TMurobahah } from "@/types";

type TPageProps = {
  pageTitle: string;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Murobahah",
    },
  };
};


export default function PageMurobahah() {
  const [total, setTotal] = useState<number>();
  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });
  const listMurobahahQuery = useMurobahah().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
  })
  const listMurobahah = listMurobahahQuery.data?.data?.data
  const metadata = listMurobahahQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);
  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Murobahah",
    },
  ];
  return (
    <Box>
      <Box mt="-6">
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex alignItems="center" justify="space-between" mx={5}>
        <Heading size="lg">Data Pinjaman Murobahah</Heading>
        <Link href="">
          <Button as="span" leftIcon={<Icon as={PlusIcon} />}>
            Tambah Pinjaman
          </Button>
        </Link>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Flex gap="4" alignItems="center" flexWrap="wrap" mt={5}>
            <Box>
              <Text fontSize="sm">Nama Anggota</Text>
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
            <Box>
              <Text fontSize="sm">ID Anggota</Text>
              <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MagnifyingGlassIcon} color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="cari berdasarkan ID"
                  focusBorderColor="teal.200"
                />
              </InputGroup>
            </Box>
            <Box>
              <Text fontSize="sm">Tanggal mulai Cicilan</Text>
              <Input type="date" focusBorderColor="teal.200" mt={2} />
            </Box>
          </Flex>
        </CardHeader>
        <Divider />
        {listMurobahahQuery.isLoading && <Progress size="xs" isIndeterminate />}
        <CardBody>
          <TableContainer p="0" pb="5">
            <Table mb={5}>
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
                  <TableMurobahah item={item} key={item.id} />
                ))}
              </Tbody>
            </Table>
            <TablePagination pagination={pagination} />
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
