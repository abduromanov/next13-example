import {
  Button,
  Divider,
  Flex,
  Icon,
  Link,
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
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import useCustomPagination from "@/hooks/useCustomPagination";

import TableSyirkah from "@/components/pages/pinjaman/syirkah/TableSyirkah";

import TablePagination from "@/layouts/components/TablePagination";
import { useSyirkah } from "@/services/api/commands/syirkah.command";

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
  const pagination = useCustomPagination(total);

  const listSyirkahQuery = useSyirkah().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      filter: {
        anggota: {
          id: {
            _eq: props.anggota.id
          }
        }
      }

    },
  });

  const listSyirkah = listSyirkahQuery.data?.data?.data;
  const metadata = listSyirkahQuery.data?.data?.meta;


  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);
  return (
    <Stack pb={10}>
      <Flex
        gap="4"
        justifyContent="right"
        flexDirection={["column-reverse", "row"]}
        flexWrap="wrap"
        my={5}
        px={4}
      >
        <Link href="/anggota/form?type=syirkah">
          <Button leftIcon={<Icon as={DocumentPlusIcon} />}>
            Buat Form Pengajuan
          </Button>
        </Link>
      </Flex>
      <Divider />
      {listSyirkahQuery.isLoading && <Progress size="xs" isIndeterminate />}
      <TableContainer p="3" mb={3}>
        <Table mb={3}>
          <Thead>
            <Tr>
              <Th>Nama BC</Th>
              <Th>Nama Anggota</Th>
              <Th>ID Anggota</Th>
              <Th>Modal Awal</Th>
              <Th>Modal Hamasah</Th>
              <Th>Tanggal Mulai</Th>
              <Th>Tanggal Selesai</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(listSyirkah || []).map((item) => (
              <TableSyirkah
                item={item}
                key={item.id}
                showRoute={`/anggota/syirkah/${item.id}`}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Skeleton w="full" isLoaded={!listSyirkahQuery.isLoading}>
        <TablePagination pagination={pagination} />
      </Skeleton>
    </Stack>
  );
}
