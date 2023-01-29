import { usePagination } from "@ajna/pagination";
import { Box, Card, CardBody, CardHeader, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Progress, Skeleton, Spacer, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import TableSimpananAnggota from "@/components/Tables/TableSimpanan";

import TablePagination from "@/layouts/components/TablePagination";
import { fetchAnggota, useAnggota } from "@/services/api/commands/anggota.command";

import { TAnggota, TSimpanan } from "@/types";

interface TPageProps {
  pageTitle: string;
  simpanan?: TSimpanan;
  anggota?: TAnggota

}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['anggota', 1, 10],
    queryFn: () => fetchAnggota({
      params: {
        page: 1,
        limit: 10
      }
    })
  })
  return {
    props: {
      pageTitle: 'Simpanan Anggota',
      dehydratedState: dehydrate(query)
    }
  }
}


export default function PageSimpanan() {
  const [total, setTotal] = useState<number>();


  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10
    }
  });

  const listAnggotaQuery = useAnggota({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      fields: "mutasiTabungan.saldo"
    }
  }).query();


  const listAnggota = listAnggotaQuery.data?.data?.data;
  const metadata = listAnggotaQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count)
  }, [metadata])

  return (
    <>
      <Box >
        <Card m={5} boxShadow='md' size="md">
          <CardHeader>
            <Flex alignItems="start" flexWrap='wrap' gap={5}>
              <Heading size='md'>Data simpanan Anggota</Heading>
              <Spacer />
              <Box w={64}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'>
                    <Icon as={MagnifyingGlassIcon} color='gray' />
                  </InputLeftElement>
                  <Input placeholder="cari berdasarkan nama" focusBorderColor="teal.200" />
                </InputGroup>
              </Box>
            </Flex>
          </CardHeader>
          <Divider />
          {listAnggotaQuery.isLoading && <Progress size='xs' isIndeterminate />}
          <CardBody>
            <TableContainer p='3'>
              <Table size='sm' mb={3}>
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
                  {(listAnggota || []).map((item: TAnggota) => (
                    <TableSimpananAnggota item={item} key={item.id} />
                  ))}
                </Tbody>
              </Table>
              <Skeleton w='full' isLoaded={!listAnggotaQuery.isLoading}>
                <TablePagination pagination={pagination} />
              </Skeleton>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}