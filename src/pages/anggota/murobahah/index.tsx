import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
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
} from "@chakra-ui/react";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import useCustomPagination from "@/hooks/useCustomPagination";

import TableMurobahah from "@/components/pages/pinjaman/murobahah/TableMurobahah";

import TablePagination from "@/layouts/components/TablePagination";
import { useMurobahah } from "@/services/api/commands/murobahah.command";

import { TAnggota } from "@/types";

interface TPageProps {
  anggota: TAnggota;
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      anggota: anggota,
      pageTitle: "Anggota",
    },
  };
};

export default function Page(props: TPageProps) {
  const [total, setTotal] = useState<number>();
  const [searchTglMulai, setSearchTglMulai] = useState<string>("");

  const pagination = useCustomPagination(total);

  const listMurobahahQuery = useMurobahah().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      tglMulai: searchTglMulai,
      anggota: props.anggota.id,
    },
  });

  const listMurobahah = listMurobahahQuery.data?.data?.data;
  const metadata = listMurobahahQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  return (
    <Stack pb={10}>
      <Flex
        gap="4"
        alignItems={["start", "end"]}
        justifyContent="space-between"
        flexDirection={["column-reverse", "row"]}
        flexWrap="wrap"
        my={5}
        px={4}
      >
        <Box w={["full", "200px"]}>
          <Text fontSize="sm">Filter tgl mulai</Text>
          <Input
            type="date"
            focusBorderColor="brand.500"
            mt={2}
            onChange={(e) => setSearchTglMulai(e.target.value)}
          />
        </Box>
        <Link href="/anggota/form?type=murobahah">
          <Button leftIcon={<Icon as={DocumentPlusIcon} />}>
            Buat Form Pengajuan
          </Button>
        </Link>
      </Flex>
      <Divider />
      {listMurobahahQuery.isLoading && <Progress size="xs" isIndeterminate />}
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
            {(listMurobahah || []).map((item) => (
              <TableMurobahah
                item={item}
                key={item.id}
                showRoute={`/anggota/murobahah/${item.id}`}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Skeleton w="full" isLoaded={!listMurobahahQuery.isLoading}>
        <TablePagination pagination={pagination} />
      </Skeleton>
    </Stack>
  );
}
