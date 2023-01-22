import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import { GetServerSideProps } from "next"

import BreadcrumbSection from "@/components/BreadcrumbSection"
import TableMurobahah from "@/components/Tables/TableMurobahah"

import TablePagination from "@/layouts/components/TablePagination"


type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Murobahah'
    }
  }
}

const dataMurobahah = [{
  nama: 'admin',
  idanggota: '123456789',
  pembiayaan: 'cicil rumah',
  totPinjaman: 'Rp.10.900.000',
  totTerbayar: 'Rp.27.800.000',
  tglMulaiCicilan: '30 September 2022',
  lunas: true
}, {
  nama: 'admin',
  idanggota: '123456789',
  pembiayaan: 'jajan seblak',
  totPinjaman: 'Rp. 13.080.000',
  totTerbayar: 'Rp. 11.990.000',
  tglMulaiCicilan: '31 September 2022',
  lunas: true
}, {
  nama: 'juragan',
  idanggota: '0999',
  pembiayaan: 'jajan cilung',
  totPinjaman: 'Rp.12.900.000',
  totTerbayar: 'Rp.30.800.000',
  tglMulaiCicilan: '30 Oktober 2022',
  lunas: true
}, {
  nama: 'dodi',
  idanggota: '112233',
  pembiayaan: 'jajan cilok',
  totPinjaman: 'Rp.10.000.000',
  totTerbayar: 'Rp.21.800.000',
  tglMulaiCicilan: '30 Januari 2022',
  lunas: true
}, {
  nama: 'didan',
  idanggota: '9090',
  pembiayaan: 'bayar pajak',
  totPinjaman: 'Rp.9.900.000',
  totTerbayar: 'Rp.8.800.000',
  tglMulaiCicilan: '20 September 2022',
  lunas: true
}, {
  nama: 'lilik',
  idanggota: '898767',
  pembiayaan: 'jajan cimol',
  totPinjaman: 'Rp.14.300.000',
  totTerbayar: 'Rp.20.230.000',
  tglMulaiCicilan: '11 November 2022',
  lunas: false
}]
export default function PageMurobahah() {
  const breadcrumbData = [
    {
      name: 'Pinjaman',
    },
    {
      name: 'Murobahah',
    },
  ];
  return (
    <>
      <Box>
        <Box>
          <BreadcrumbSection data={breadcrumbData} />
        </Box>
        <Card boxShadow='md'>
          <CardHeader>
            <Flex mb={3}>
              <Box>
                <Heading size='md'>Data Pinjaman Murobahah</Heading>
              </Box>
              <Spacer />
              <Box>
                <Button colorScheme='teal'><Icon as={PlusIcon} />&nbsp;Tambah Pinjaman</Button>
              </Box>
            </Flex>
            <Divider />
            <Flex gap='4' alignItems='center' flexWrap='wrap' mt={5}>
              <Box>
                <Text fontSize='sm'>Nama Anggota</Text>
                <InputGroup mt={2}>
                  <InputLeftElement
                    pointerEvents='none'>
                    <Icon as={MagnifyingGlassIcon} color='gray' />
                  </InputLeftElement>
                  <Input placeholder="cari berdasarkan nama" focusBorderColor="teal.200" />
                </InputGroup>
              </Box>
              <Box>
                <Text fontSize='sm'>ID Anggota</Text>
                <InputGroup mt={2}>
                  <InputLeftElement
                    pointerEvents='none'>
                    <Icon as={MagnifyingGlassIcon} color='gray' />
                  </InputLeftElement>
                  <Input placeholder="cari berdasarkan ID" focusBorderColor="teal.200" />
                </InputGroup>
              </Box>
              <Box>
                <Text fontSize='sm'>Tanggal mulai Cicilan</Text>
                <Input type='date' focusBorderColor="teal.200" mt={2} />
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer p={3} boxShadow='md'>
              <Table size='sm' mb={5}>
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
                  {dataMurobahah.map((item, index) => (
                    <TableMurobahah item={item} key={index} />
                  ))}
                </Tbody>
              </Table>
              <TablePagination />
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}