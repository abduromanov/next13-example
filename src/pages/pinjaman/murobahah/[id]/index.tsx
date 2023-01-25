import { Box, Button, Card, CardBody, CardHeader, Center, Divider, Flex, Heading, HStack, Icon, Select, Spacer, Switch, Table, TableContainer, Tag, TagLabel, TagLeftIcon, Tbody, Text, Tfoot, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react"
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { GetServerSideProps } from "next"

import BreadcrumbSection from "@/components/BreadcrumbSection"
import ModalCatatan from "@/components/Modals/ModalCatatan"
import ModalConfirmDelete from "@/components/Modals/ModalConfirmDelete"
import TableCatatanPembayaran from "@/components/Tables/TableCatatanPembayaran"
import TableRangkumanPembayaran from "@/components/Tables/TableRangkumanPembayaran"
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
    total: 'Rp.100.000',
    lunas: true
  }
}

const rangkumanPembayaran = [{
  ket: 'total bayar',
  cicilan: 'Rp. 19.000.000',
  margin: 'Rp. 8.800.000',
  total: 'Rp. 27.800.000'
}, {
  ket: 'sisa cicilan',
  cicilan: 'Rp. 0',
  margin: 'Rp. 0',
  total: 'Rp. 0'
}, {
  ket: 'sisa Tenor',
  cicilan: 0,
  margin: 0,
  total: 0
}, {
  ket: 'bulan tidak sesuai',
  cicilan: 0,
  margin: 0,
  total: 1
},]

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
    <Box>
      <Box mt='-5'>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex mx={5} p={3} mt={-2} gap='3' flexWrap='wrap'>
        <Box>
          <Heading size='md'>Admin Hamasah - Cicilan Rumah</Heading>
        </Box>
        <Spacer />
        <Flex gap='2' flexWrap='wrap'>
          <Center>
            <HStack mr={3}>
              <Switch size='md' />
              <Text>Pembayaran Lunas</Text>
            </HStack>
          </Center>
          <Box >
            <Button variant='ghost' colorScheme='teal'><Icon as={PlusIcon} />&nbsp;Tambah Pembayaran</Button>
          </Box>
        </Flex>
      </Flex>

      <Flex flexWrap='wrap' gap={5} mx={5} alignItems='center' justifyContent='center'>
        <Box rounded='md' boxShadow='md' mx={7} p={5} >
          <Box mb={3}>
            <Heading size='md'>Rincian Cicilan</Heading>
          </Box>
          <Divider />
          <Box my={3} mr={40}>
            <VStack spacing={3} alignItems='start' >
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr={40}>Nama</Text>
                <Text >{rincianCicilan.nama}</Text>
              </HStack >
              <HStack spacing={2} flexWrap='wrap' >
                <Text fontWeight='bold' mr={28} >Pembiayaan</Text>
                <Text>{rincianCicilan.pembiayaan}</Text>
              </HStack>
            </VStack>
          </Box>
          <Divider />
          <Box my={3} mr={40}>
            <VStack alignItems='start' spacing={3}>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr='133px'>Pinjaman</Text>
                <Text>{rincianCicilan.pinjaman}</Text>
              </HStack>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr='150px'>Margin</Text>
                <Text >{rincianCicilan.margin}</Text>
              </HStack>
              <HStack spacing={2} flexWrap='wrap' >
                <Text fontWeight='bold' mr='184px'>DP</Text>
                <Text>{rincianCicilan.dp}</Text>
              </HStack>
            </VStack>
          </Box>
          <Divider />
          <Box mt={3} mr={40} color='teal.400' >
            <VStack alignItems='start' spacing={3}>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr='170px'>Total</Text>
                <Text>{rincianCicilan.total}</Text>
              </HStack>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr='165px'>Tenor</Text>
                <Text>{rincianCicilan.tenor}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
        <Box rounded='md' boxShadow='md' h={64} p={5} ml={5} >
          <Box mb={3}>
            <Heading size='md'>Cicilan Perbulan</Heading>
          </Box>
          <Divider />
          <Box my={3}>
            <VStack alignItems='start' spacing={3}>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr={48}>Pinjaman/bulan</Text>
                <Text>{rincianCicilan.cicilanPerbulan.pinjaman}</Text>
              </HStack>
              <HStack spacing={2} flexWrap='wrap' >
                <Text fontWeight='bold' mr='208px'>Margin/bulan</Text>
                <Text>{rincianCicilan.cicilanPerbulan.margin}</Text>
              </HStack>
              <HStack spacing={4}>
                {rincianCicilan.cicilanPerbulan.lunas ?
                  <Tag colorScheme='green' rounded='md' variant='solid'>
                    <TagLeftIcon boxSize='12px' as={CheckIcon} />
                    <TagLabel >Lunas</TagLabel>
                  </Tag> :
                  <Tag colorScheme='red' rounded='md' variant='solid'>
                    <TagLeftIcon boxSize='12px' as={XMarkIcon} />
                    <TagLabel>Belum Lunas</TagLabel>
                  </Tag>}
              </HStack >
              {/* <Box flexWrap='wrap' >
                {rincianCicilan.cicilanPerbulan.lunas ? <Badge colorScheme='green' rounded='md' variant='solid'>Lunas</Badge> : <Badge variant='solid' colorScheme='red'>Belum Lunas</Badge>}

              </Box> */}
            </VStack>
          </Box>
          <Divider />
          <Box mt={3} color='teal.400'>
            <VStack spacing={3} alignItems='start'>
              <HStack spacing={2} flexWrap='wrap'>
                <Text fontWeight='bold' mr='275px'>Total</Text>
                <Text>{rincianCicilan.cicilanPerbulan.total}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Flex>

      <Card boxShadow='md' mx={5} my={7} >
        <CardHeader mb={-3}>
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
        <CardBody>
          <TableContainer>
            <Table mb={3}>
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
                <ModalCatatan isOpen={isOpen} onClose={onClose} item={catatanPembayaran.map((item, index) => (
                  <>
                    <TableCatatanPembayaran key={index} item={item} onOpen={onOpen2} />
                    <ModalConfirmDelete isOpen={isOpen2} onClose={onClose2} />
                  </>
                ))} />
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th></Th>
                  <Th>13</Th>
                  <Th>1</Th>
                  <Th>Rp. 19.000.000</Th>
                  <Th>Rp. 8.800.000</Th>
                  <Th>Rp. 27.800.000</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </CardBody>

      </Card>

      <Card boxShadow='md' mx={5} mb={5}>
        <CardHeader mb={-3}>
          <Heading size='md' mb={3}>Rangkuman Pembayaran</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <TableContainer >
            <Table>
              <Thead>
                <Tr>
                  <Th>Keterangan</Th>
                  <Th>Cicilan</Th>
                  <Th>Margin</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rangkumanPembayaran.map((item, index) => (
                  <TableRangkumanPembayaran item={item} key={index} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box >
  )
}