import { usePagination } from "@ajna/pagination";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TableMutasi from "@/pages/simpanan/simpanan-anggota/components/TableMutasi";
import { useAnggotaDetail } from "@/services/api/commands/anggota.command";

import { TAnggota, TSimpanan } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota?: TAnggota;
  simpanan?: TSimpanan;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({ req }) => {
  return {
    props: {
      pageTitle: 'Mutasi Simpanan',
    }
  }
}


export const convertToIDR = (jenisSimpanan: number) => {
  return jenisSimpanan?.toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })
}

export default function PageMutasi() {
  const [total, setTotal] = useState<number>();
  const router = useRouter()
  const { id } = router.query


  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10
    }
  });

  const anggotaDetailQuery = useAnggotaDetail(id).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      fields: "mutasiTabungan.*"
    }
  });
  const anggotaDetailSimpanan = anggotaDetailQuery.data?.data?.data;
  const metaData = anggotaDetailSimpanan?.mutasiTabungan?.length;

  useEffect(() => {
    setTotal(metaData)
  }, [metaData])

  const dataSimpanan = anggotaDetailSimpanan?.mutasiTabungan
  const totSimpanan = {
    simpananWajib: dataSimpanan?.filter((v: any) => v.jenisTabungan == 'wajib').map((v: any) => v.saldo).reduce((a: number, b: number) => a + b, 0),
    simpananKhusus: dataSimpanan?.filter((v: any) => v.jenisTabungan == 'khusus').map((v: any) => v.saldo).reduce((a: number, b: number) => a + b, 0),
    simpananSukarela: dataSimpanan?.filter((v: any) => v.jenisTabungan == 'sukarela').map((v: any) => v.saldo).reduce((a: number, b: number) => a + b, 0),
    simpananPokok: dataSimpanan?.filter((v: any) => v.jenisTabungan == 'pokok').map((v: any) => v.saldo).reduce((a: number, b: number) => a + b, 0),
  }

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
      <Box mt='-6'>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex px='8'>
        <Box>
          {anggotaDetailQuery.isLoading ? (<Skeleton width="100px" height="10px" />) :
            (<Text fontSize='xl'>{anggotaDetailSimpanan?.nama} - {anggotaDetailSimpanan?.idAnggota}</Text>)
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
            <StatGroup >
              <Stat>
                <StatLabel>Simpanan Pokok</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan.simpananPokok)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Wajib</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan.simpananWajib)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Simpanan</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan.simpananKhusus)}</StatNumber>
              </Stat>
            </StatGroup>
            <StatGroup mt={7}>
              <Stat>
                <StatLabel>Simpanan Khusus</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan.simpananKhusus)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Sukarela</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan.simpananSukarela)}</StatNumber>
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
                    <Input placeholder='select date' type='date' w="200px" border={0} focusBorderColor='none' />
                    <ArrowLongRightIcon width='20px' />
                    <Input placeholder='select date' type='date' w="200px" border={0} focusBorderColor='none' />
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
              {(dataSimpanan || []).map((item: TSimpanan) => (
                <TableMutasi item={item} key={item.id} />
              ))}
            </Tbody>
          </Table>
          {/* <Skeleton w='full' isLoaded={!anggotaDetailQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton> */}
        </TableContainer>
      </VStack >
    </>
  );
};
