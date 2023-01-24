import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, Heading, HStack, Icon, Select, SimpleGrid, Spacer, Stack, Switch, Table, TableContainer, Tbody, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { GetServerSideProps } from "next"
import { Grid } from "swiper"

import BreadcrumbSection from "@/components/BreadcrumbSection"
import ModalCatatanPemb from "@/components/Modals/ModalCatatanPemb"
import ModalConfirmDelete from "@/components/Modals/ModalConfirmDelete"
import TableCatatanPembayaran from "@/components/Tables/TableCatatanPembayaran"
import TableRincianPembayaran from "@/components/Tables/TableRincianPembayaran"

type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Detil Murobahah'
    }
  }
}

const dataRincianPembayaran = [{
  tahun: '2022',
  bulan: 'November',
  tenorTerbayar: 0,
  bulanTidakSesuai: 0,
  cicilan: 'Rp. 10.000.000',
  margin: 'Rp. 900.000',
  total: 'Rp. 10.900.000'
}, {
  tahun: '2022',
  bulan: 'Desember',
  tenorTerbayar: 15,
  bulanTidakSesuai: -9,
  cicilan: 'Rp. 8.000.000',
  margin: 'Rp. 7.800.000',
  total: 'Rp. 15.800.000'
}, {
  tahun: '2023',
  bulan: 'Januari',
  tenorTerbayar: -2,
  bulanTidakSesuai: 10,
  cicilan: 'Rp. 1.000.000',
  margin: 'Rp. 100.000',
  total: 'Rp. 1.100.000'
}]

const catatanPembayaran = [{
  tglBayar: '19 Nov 2022',
  cicilan: 'Rp. 10.000.000',
  margin: 'Rp. 900.000',
  total: 'Rp. 10.900.000',
  tenorBayar: 0,
  bulanTidakSesuai: 0,
  catatan: 'loss'
}]

const rincianCicilan = {
  nama: 'admin hamasah',
  pembiayaan: 'cicil rumah',
  pinjaman: 'Rp.10.000.000',
  margin: 'Rp.900.000',
  dp: 0,
  total: 'Rp.10.900.000',
  tenor: 'Rp.20.000.000',
  cicilanPerbulan: {
    pinjaman: 'Rp.833.300',
    margin: 'Rp.75.000',
    total: 'Rp.100.000'
  }
}
export default function PageDetailMurobahah() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const breadcrumbData = [
    {
      name: 'Pinjaman',
    },
    {
      name: 'Murobahah',
      url: '/pinjaman/murobahah'
    },
    {
      name: 'Detail',
    }

  ];

  return (
    <>
      <Box>
        <Box>
          <BreadcrumbSection data={breadcrumbData} />
        </Box>
        <Flex mx={5}>
          <Box>
            <Heading size='md'>Admin Hamasah - Cicilan Rumah</Heading>
          </Box>
          <Spacer />
          <Center>
            <HStack>
              <Switch size='md' />
              <Text>Pembayaran Lunas</Text>
            </HStack>
          </Center>
          <Box ml={3}>
            <Button variant='ghost' colorScheme='teal'><Icon as={PlusIcon} />&nbsp;Tambah Pembayaran</Button>
          </Box>
        </Flex>
        <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
          <Card >
            <CardHeader>
              <Box mb={3}>
                <Heading size='md'>Rincian Cicilan</Heading>
              </Box>
              <Divider />
              <Box alignItems='start' mt={3} >
                <HStack spacing={60}>
                  <Text fontWeight='bold'>Nama</Text>
                  <Text >{rincianCicilan.nama}</Text>
                </HStack >
                <HStack spacing={48}>
                  <Text fontWeight='bold' >Pembiayaan</Text>
                  <Text>{rincianCicilan.pembiayaan}</Text>
                </HStack>
              </Box>
            </CardHeader>
            <Divider />
            <CardBody>
              <VStack alignItems='start'>
                <HStack spacing={52}>
                  <Text fontWeight='bold' >Pinjaman</Text>
                  <Text>{rincianCicilan.pinjaman}</Text>
                </HStack>
                <HStack >
                  <Text fontWeight='bold' >Margin</Text>
                  <Text >{rincianCicilan.margin}</Text>
                </HStack>
                <HStack >
                  <Text fontWeight='bold' >DP</Text>
                  <Text>{rincianCicilan.dp}</Text>
                </HStack>
              </VStack>
            </CardBody>
            <Divider />
            <CardFooter>
              <VStack alignItems='start'>
                <HStack>
                  <Text fontWeight='bold'>Total</Text>
                  <Text>{rincianCicilan.total}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight='bold'>Tenor</Text>
                  <Text>{rincianCicilan.tenor}</Text>
                </HStack>
              </VStack>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Box>
                <Heading size='md'>Cicilan Perbulan</Heading>
              </Box>
            </CardHeader>
            <Divider />
            <CardBody>
              <VStack alignItems='start'>
                <HStack>
                  <Text fontWeight='bold'>Pinjaman/bulan</Text>
                  <Text>{rincianCicilan.cicilanPerbulan.pinjaman}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight='bold'>Margin/bulan</Text>
                  <Text>{rincianCicilan.cicilanPerbulan.margin}</Text>
                </HStack>
              </VStack>
            </CardBody>
            <Divider />
            <CardFooter>
              <HStack>
                <Text fontWeight='bold'>Total</Text>
                <Text>{rincianCicilan.cicilanPerbulan.total}</Text>
              </HStack>
            </CardFooter>
          </Card>
        </SimpleGrid>

        <Card boxShadow='md' mx={5}>
          <CardHeader>
            <Heading size='md' mb={3}>Rincian Pembayaran</Heading>
            <Divider />
            <VStack alignItems='start' w={200} mt={5}>
              <Text>Tahun</Text>
              <Select placeholder="semua">
                <option>2022</option>
                <option>2023</option>
              </Select>
            </VStack>
          </CardHeader>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tahun</Th>
                  <Th>Bulan</Th>
                  <Th>Tenor Terbayar</Th>
                  <Th>Bulan Tidak Sesuai</Th>
                  <Th>Cicilan</Th>
                  <Th>Margin</Th>
                  <Th>Total</Th>
                  <Th>Detail</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataRincianPembayaran.map((item, index) => (
                  <TableRincianPembayaran item={item} key={index} onOpen={onOpen} />
                ))}
                <ModalCatatanPemb isOpen={isOpen} onClose={onClose} item={catatanPembayaran.map((item, index) => (
                  <>
                    <TableCatatanPembayaran key={index} item={item} onOpen={onOpen2} />
                    <ModalConfirmDelete isOpen={isOpen2} onClose={onClose2} />
                  </>
                ))} />
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  )
}