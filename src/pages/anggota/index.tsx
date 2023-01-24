import { usePagination } from "@ajna/pagination";
import { Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Progress, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps } from "next"
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import TablePagination from "@/layouts/components/TablePagination";
import { fetchAnggota, useAnggota } from "@/services/api/commands/anggota.command";

import { TAnggota } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota: TAnggota;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({ req }) => {
  const query = new QueryClient();

  const anggota: TAnggota = JSON.parse(req.cookies.anggota || '');

  await query.prefetchQuery({
    queryKey: ['anggota', 1, 10],
    queryFn: () => fetchAnggota({
      params: {
        page: 1,
        limit: 10,
      }
    })
  });

  return {
    props: {
      pageTitle: 'Daftar Anggota',
      anggota: anggota,
      dehydratedState: dehydrate(query)
    }
  }
}

const TableRow = (props: { item?: TAnggota }) => {
  const tglDibuat = useMemo(() => moment(props.item?.tglDibuat).format('DD MMMM YYYY'), [props.item?.tglDibuat])

  return <Tr>
    <Td>{props.item?.idAnggota}</Td>
    <Td>{props.item?.nama}</Td>
    <Td>{props.item?.alamat}</Td>
    <Td>{tglDibuat}</Td>
    <Td>
      <Link href='#' >
        <Tooltip hasArrow label='Ubah Anggota'>
          <Icon as={PencilSquareIcon} color="teal" fontSize='lg' />
        </Tooltip>
      </Link>
    </Td>
  </Tr>
}

export default function Page() {
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
    }
  }).query();

  const listAnggota = listAnggotaQuery.data?.data?.data;
  const metadata = listAnggotaQuery.data?.data?.meta;

  useEffect(() => {
    setTotal(metadata?.filter_count)
  }, [metadata])

  return (
    <Stack spacing='8' px='8' pb='10'>
      <Flex alignItems='center' justify='space-between'>
        <Heading size='lg'>Daftar Anggota</Heading>
        <Link href=''>
          <Button as='span' leftIcon={<Icon as={PlusIcon} />}>Tambah Anggota</Button>
        </Link>
      </Flex>
      <Card m={5} variant='outline' shadow='sm'>
        <CardHeader>
          <Flex alignItems='center' justifyContent='space-between'>
            <Skeleton isLoaded={!listAnggotaQuery.isLoading}>
              <Heading size='sm'>Jumlah Anggota: {metadata?.filter_count}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!listAnggotaQuery.isLoading} w='25%'>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={MagnifyingGlassIcon} color='gray' />
                </InputLeftElement>
                <Input placeholder="Cari berdasarkan nama / No. ID" focusBorderColor="brand.400" />
              </InputGroup>
            </Skeleton>
          </Flex>
        </CardHeader>
        <Divider />
        {listAnggotaQuery.isLoading && <Progress size='xs' isIndeterminate />}
        <CardBody>
          <TableContainer p='0' pb='5'>
            <Table>
              <Thead>
                <Tr>
                  <Th>No. ID</Th>
                  <Th>Nama Anggota</Th>
                  <Th>Alamat</Th>
                  <Th>Tgl Dibuat</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listAnggota || []).map((item: TAnggota) => (
                  <TableRow key={item.id} item={item} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Skeleton w='full' isLoaded={!listAnggotaQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>
    </Stack>
  );
}
