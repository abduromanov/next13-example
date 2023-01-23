import { Box, Button, Card, CardBody, CardHeader, Center, Divider, Flex, Heading, HStack, Icon, Input, InputGroup, Spacer, Stat, StatGroup, StatLabel, StatNumber, Table, TableContainer, Tbody, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { ArrowLongRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import { GetServerSideProps } from "next"

import BreadcrumbSection from "@/components/BreadcrumbSection"
import TableDetilSyirkah from "@/components/Tables/TableDetilSyirkah"


type TPageProps = {
  pageTitle: string
}
export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Detail Syirkah'
    }
  }
}
const dataModal = {
  modAwal: 'Rp. 60.000.000',
  modHamasah: 'Rp. 600.000.000'
}

const dataTable = [{
  tgl: '09 Jan 2023',
  modAwal: 'Rp. 60.000.000',
  modHamasah: 'Rp. 600.000.000',
  bonBersih: 'Rp. 0',
  presentasiBagiHasil: '-',
  bagiHasilHamasah: 'Rp. 0',
  catatan: 'TEST'
}, {
  tgl: '09 Jan 2023',
  modAwal: 'Rp. 60.000.000',
  modHamasah: 'Rp. 600.000.000',
  bonBersih: 'Rp. 100.000',
  presentasiBagiHasil: '20 %',
  bagiHasilHamasah: 'Rp. 18.181',
  catatan: 'TEST2'
}, {
  tgl: '09 Jan 2023',
  modAwal: 'Rp. 60.000.000',
  modHamasah: 'Rp. 600.000.000',
  bonBersih: 'Rp. 0',
  presentasiBagiHasil: '-',
  bagiHasilHamasah: 'Rp. 0',
  catatan: 'catatan'
}]

export default function PageDetailSyirkah() {
  const breadcrumbData = [
    {
      name: 'Pinjaman',
    },
    {
      name: 'Syirkah',
      url: '/pinjaman/syirkah'
    },
    {
      name: 'Detil Syirkah',
    },
  ];
  return (
    <>
      <Box>
        <Box>
          <BreadcrumbSection data={breadcrumbData} />
        </Box>
        <Flex px={5}>
          <Spacer />
          <Button><Icon as={PlusIcon} />&nbsp;Tambah data</Button>
        </Flex>
        <VStack px={5}>
          <Card m={2} w='100%'>
            <CardHeader>
              <Center>
                <Heading fontSize='xl'>Detail Pinjaman Syirkah</Heading>
              </Center>
            </CardHeader>
            <Divider />
            <CardBody>
              <VStack alignItems='start' mb={8}>
                <HStack spacing={74}>
                  <Text fontWeight='bold'>Nama BC</Text>
                  <Text>makan malam</Text>
                </HStack>
                <HStack spacing={88}>
                  <Text fontWeight='bold'>Pemilik</Text>
                  <Text>Juragan</Text>
                </HStack>
                <HStack spacing={38}>
                  <Text fontWeight='bold'>Tanggal mulai</Text>
                  <Text>25 November 2022</Text>
                </HStack>
                <HStack spacing={29}>
                  <Text fontWeight='bold'>Tanggal Selesai</Text>
                  <Text>25 November 2023</Text>
                </HStack>
              </VStack>
              <StatGroup>
                <Stat mb={4}>
                  <StatLabel>Modal Awal</StatLabel>
                  <StatNumber>{dataModal.modAwal}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Modal Hamasah</StatLabel>
                  <StatNumber>{dataModal.modHamasah}</StatNumber>
                </Stat>
              </StatGroup>
            </CardBody>
          </Card>
          <Card w='100%'>
            <CardHeader>
              <VStack alignItems='Start' flexWrap='wrap' >
                <Text fontWeight='bold' mb='10px'>Filter Tanggal</Text>
                <InputGroup border='1px' borderColor='gray.200' borderRadius='md' w='40%'>
                  <Input placeholder='select date' type='date' w="50%" border={0} focusBorderColor='none' />
                  <ArrowLongRightIcon width='24px' />
                  <Input placeholder='select date' type='date' w="50%" border={0} focusBorderColor='none' />
                </InputGroup>
              </VStack>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Tanggal</Th>
                      <Th>Modal Awal</Th>
                      <Th>Modal Hamasah</Th>
                      <Th>Bonus Bersih</Th>
                      <Th>Presentasi Bagi Hasil</Th>
                      <Th>Bagi Hasil Hamasah</Th>
                      <Th>Catatan</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataTable.map((item, index) => (
                      <TableDetilSyirkah item={item} key={index} />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </VStack>

      </Box>
    </>
  )
}