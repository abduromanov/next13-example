import { Box, Card, CardBody, CardHeader, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";

import TableSimpananAnggota from "@/components/Tables/TableSimpanan";


type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Simpanan Anggota'
    }
  }
}

const anggota = [
  {
    nama: 'adinda',
    id: 112233,
    alamat: 'jakarta selatan',
    totSimpanan: '1.200.000'
  }, {
    nama: 'adinda',
    id: 112234,
    alamat: 'jakarta selatan',
    totSimpanan: '1.200.000'
  }, {
    nama: 'adinda',
    id: 112235,
    alamat: 'jakarta selatan',
    totSimpanan: '1.200.000'
  }, {
    nama: 'adinda',
    id: 112236,
    alamat: 'jakarta selatan',
    totSimpanan: '1.200.000'
  }, {
    nama: 'adinda',
    id: 112237,
    alamat: 'jakarta selatan',
    totSimpanan: '1.200.000'
  }
]
export default function PageSimpanan() {
  // const router = useRouter();
  // const selectSimpanan = (id_anggota: any) => {
  //   router.push({
  //     pathname: `/simpanan/simpanan-anggota/mutasi/[id]`,
  //     query: {
  //       id: id_anggota
  //     }
  //   });
  // }
  return (
    <>
      <Box >
        <Card m={5} boxShadow='md' size="md">
          <CardHeader>
            <Flex alignItems="start">
              <Heading size='md'>Data simpanan Anggota</Heading>
              <Spacer />
              <Box w="25%">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'>
                    <Icon as={MagnifyingGlassIcon} color='gray' />
                  </InputLeftElement>
                  <Input placeholder="cari berdasarkan nama" focusBorderColor="teal.100" />
                </InputGroup>
              </Box>
            </Flex>
          </CardHeader>
          <Divider />
          <CardBody>
            <TableContainer p='3'>
              <Table size='sm'>
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
                  {anggota.map((item, index) => (
                    <TableSimpananAnggota key={index} item={item} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}