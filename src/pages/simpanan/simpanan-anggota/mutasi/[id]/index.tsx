import {
  Box,
  Button,
  ButtonGroup,
  Card, CardBody, CardHeader, Center, Divider, Flex, Heading, HStack, Icon, Input,
  InputGroup,
  Select,
  Skeleton,
  Spacer, Stat, StatGroup, StatLabel, StatNumber, Table,
  TableContainer,
  Tbody,
  Text, Th, Thead,
  Tr, VStack
} from "@chakra-ui/react";
import { ArrowLongRightIcon, ChevronUpDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import TableMutasi from "@/components/Tables/TableMutasi";

import { doAnggota } from "@/services/api/commands/anggota.command";

type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Mutasi Simpanan'
    }
  }
}


const dataSimpanan = [{
  tanggal: '15/10/2022',
  tipe: 'debit',
  nominal: '10.000',
  saldo: '30.000',
  keterangan: 'masuk pertama'
}, {
  tanggal: '15/10/2022',
  tipe: 'kredit',
  nominal: '210.000',
  saldo: '30.000',
  keterangan: 'masuk kedua'
}, {
  tanggal: '15/10/2022',
  tipe: 'debit',
  nominal: '20.000',
  saldo: '40.000',
  keterangan: 'masuk ketiga'
}, {
  tanggal: '15/10/2022',
  tipe: 'debit',
  nominal: '20.000',
  saldo: '40.000',
  keterangan: 'masuk ketiga'
}, {
  tanggal: '15/10/2022',
  tipe: 'debit',
  nominal: '20.000',
  saldo: '40.000',
  keterangan: 'masuk ketiga'
}]
const totSimpanan = {
  nama: 'Adinda',
  noAngota: '019231230',
  simpananPokok: 'Rp2.000.000',
  simpananWajib: 'Rp1.200.000',
  simpananKhusus: 'Rp5.200.000',
  simpananSukarela: 'Rp1.000.000',
}
export default function PageMutasi() {
  const anggotaQuery = doAnggota().get();
  const anggota = anggotaQuery.data;
  const breadcrumbData = [
    {
      name: 'Simpanan',
    },
    {
      name: 'Simpanan Anggota',
      url: '/simpanan/simpanan-anggota'
    },
    {
      name: 'Mutasi',
    },
  ];
  return (
    <>
      <Box>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex px='8'>
        <Box>
          {anggotaQuery.isLoading ? (<Skeleton width="100px" height="10px" />) :
            (<Text fontSize='xl'>{anggota?.nama} - {anggota?.idAnggota}</Text>)
          }
        </Box>
        <Spacer />
        <Box>
          <ButtonGroup gap='2'>
            <Button colorScheme='teal'><Icon as={PlusIcon} />&nbsp;Debit</Button>
            <Button colorScheme='yellow'><Icon as={PlusIcon} />&nbsp;Kredit</Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <VStack px={8} spacing={8} pb={10}>
        <Card p='5' bg='white' boxShadow='base' w='100%'>
          <CardHeader >
            <Center>
              <Heading w='60%' size='md' lineHeight='8' textAlign='center'>Simpanan Anggota Koperasi Syariah Jasa Hamasah</Heading>
            </Center>
          </CardHeader>
          <Divider />
          <CardBody>
            <StatGroup>
              <Stat>
                <StatLabel>Simpanan Pokok</StatLabel>
                <StatNumber>{totSimpanan.simpananPokok}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Wajib</StatLabel>
                <StatNumber>{totSimpanan.simpananWajib}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Simpanan</StatLabel>
                <StatNumber>{totSimpanan.simpananKhusus}</StatNumber>
              </Stat>
            </StatGroup>
            <StatGroup mt={3}>
              <Stat>
                <StatLabel>Simpanan Khusus</StatLabel>
                <StatNumber>{totSimpanan.simpananKhusus}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Sukarela</StatLabel>
                <StatNumber>{totSimpanan.simpananSukarela}</StatNumber>
              </Stat>
              <Stat></Stat>
            </StatGroup>
          </CardBody>
        </Card>
        <TableContainer boxShadow='lg' p='5' w='100%'>
          <Box mb={5}>
            <Flex gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Text fontWeight='bold' mb='10px'>Filter Tanggal</Text>
                <HStack flexWrap='wrap'>
                  <InputGroup border='1px' borderColor='gray.200' borderRadius='md'>
                    <Input placeholder='select date' type='date' w="45%" border={0} focusBorderColor='none' />
                    <ArrowLongRightIcon width='20px' />
                    <Input placeholder='select date' type='date' w="45%" border={0} focusBorderColor='none' />
                  </InputGroup>
                </HStack>
              </Box>
              <Box mr='20px'>
                <Text fontWeight='bold' mb='10px'>Filter jenis simpanan</Text>
                <Select placeholder="select option"><option>option 1</option><option>option 2</option></Select>
              </Box>
            </Flex>
          </Box>
          <Table size='md'>
            <Thead>
              <Tr>
                <Th>Tanggal&nbsp;<ChevronUpDownIcon width='15px' style={{ display: 'inline-flex' }} /></Th>
                <Th>Tipe</Th>
                <Th>Nominal</Th>
                <Th>Keterangan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataSimpanan.map((item, index) => (
                <TableMutasi key={index} item={item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack >
    </>
  );
};
