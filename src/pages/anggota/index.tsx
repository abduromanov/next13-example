import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next"
import Link from "next/link";

import TablePagination from "@/layouts/components/TablePagination";

import { TAnggota } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota: TAnggota
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({ req }) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || '');

  return {
    props: {
      pageTitle: 'Daftar Anggota',
      anggota: anggota,
    }
  }
}

const TableRow = (props: any) => {
  return <Tr>
    <Td>Nama Anggota</Td>
    <Td>ID Anggota</Td>
    <Td>Alamat</Td>
    <Td>Tgl Dibuat</Td>
    <Td>
      <Link href={`/simpanan/simpanan-anggota/mutasi/${props.item.id}`} >
        <Tooltip hasArrow label='Ubah Anggota'>
          <Icon as={PencilSquareIcon} color="teal" fontSize='lg' />
        </Tooltip>
      </Link>
    </Td>
  </Tr>
}

export default function Page() {
  // const listAnggotaQuery = doAnggota().paginate(1, {
  //   data: {
  //     filter: {
  //       page: 1,
  //       limit: 15,
  //     }
  //   }
  // });

  // console.log(listAnggotaQuery.data?.data);

  return (
    <Stack spacing='8' px='8'>
      <Flex alignItems='center' justify='space-between'>
        <Heading size='lg'>Daftar Anggota</Heading>
        <Link href=''>
          <Button as='span' leftIcon={<Icon as={PlusIcon} />}>Tambah Anggota</Button>
        </Link>
      </Flex>
      <Card m={5} variant='outline' shadow='sm'>
        <CardHeader>
          <Box w='25%'>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={MagnifyingGlassIcon} color='gray' />
              </InputLeftElement>
              <Input placeholder="Cari berdasarkan nama / No. ID" focusBorderColor="brand.400" />
            </InputGroup>
          </Box>
        </CardHeader>
        <Divider />
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
                {Array(6).fill(0).map((item, index) => (
                  <TableRow key={index} item={item} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <TablePagination />
        </CardBody>
      </Card>
    </Stack>
  );
}
