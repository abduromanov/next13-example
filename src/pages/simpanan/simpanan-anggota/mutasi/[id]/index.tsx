import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Progress,
  Select,
  Skeleton,
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowLongRightIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import TableMutasi from "@/pages/simpanan/simpanan-anggota/components/TableMutasi";
import { useSimpananDetail, } from "@/services/api/commands/simpanan.command";

import ModalCreateDebit from "../../components/ModalCreateDebit";
import ModalCreateKredit from "../../components/ModalCreateKredit";

import { TAnggota, TSimpanan } from "@/types";


interface TPageProps {
  pageTitle: string;
  anggota?: TAnggota;
  simpanan?: TSimpanan;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
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
  const [jenisTabungan, setJenisTabungan] = useState<string>()
  const router = useRouter()
  const { id, nama, idAnggota } = router.query

  const modalCreateDebitRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalCreateKreditRef = useRef<ReturnType<typeof useDisclosure>>();


  // console.log(id)
  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10
    }
  });

  const simpananDetailQuery = useSimpananDetail(Number(id), jenisTabungan as string).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      jenisSimpanan: jenisTabungan == "false" ? false : jenisTabungan
      // "filter[jenisTabungan][_eq]": jenisTabungan == "false" ? false : jenisTabungan
    }
  });

  const simpananDetail = simpananDetailQuery.data?.data?.data;
  const metaData = simpananDetailQuery.data?.data?.meta;
  const totSimpanan = simpananDetailQuery.data?.data?.totSimpanan;


  useEffect(() => {
    setTotal(metaData?.filter_count)
  }, [metaData])


  const totSimpananAll = totSimpanan?.wajib + totSimpanan?.khusus + totSimpanan?.sukarela + totSimpanan?.pokok

  const breadcrumbData = [
    {
      name: "Simpanan",
    },
    {
      name: "Simpanan Anggota",
      url: "/simpanan/simpanan-anggota",
    },
    {
      name: "Mutasi",
    },
  ];
  return (
    <>
      <Box mt='-6'>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex px="8">
        <Box>
          {/* {simpananDetailQuery.isLoading ? (<Skeleton width="100px" height="10px" />) : */}
          <Text fontSize='xl'>{nama} - {idAnggota}</Text>
          {/* } */}
        </Box>
        <Spacer />
        <Box>
          <ButtonGroup gap="2">
            <Button colorScheme="teal" onClick={() => modalCreateDebitRef.current?.onOpen()} >
              <Icon as={PlusIcon} />
              &nbsp;Debit
            </Button>
            <Button colorScheme="yellow" onClick={() => modalCreateKreditRef.current?.onOpen()}>
              <Icon as={PlusIcon} />
              &nbsp;Kredit
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <VStack px={8} spacing={8} pb={10}>
        <Card p="5" bg="white" boxShadow="base" w="100%">
          <CardHeader>
            <Center>
              <Heading w="60%" size="md" lineHeight="8" textAlign="center">
                Simpanan Anggota Koperasi Syariah Jasa Hamasah
              </Heading>
            </Center>
          </CardHeader>
          <Divider />
          <CardBody>
            <StatGroup gap={3}>
              <Stat>
                <StatLabel>Simpanan Pokok</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan?.pokok)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Wajib</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan?.wajib)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Simpanan</StatLabel>
                <StatNumber>{convertToIDR(totSimpananAll)}</StatNumber>
              </Stat>
            </StatGroup>
            <StatGroup mt={5}>
              <Stat>
                <StatLabel>Simpanan Khusus</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan?.khusus)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Simpanan Sukarela</StatLabel>
                <StatNumber>{convertToIDR(totSimpanan?.sukarela)}</StatNumber>
              </Stat>
              <Stat></Stat>
            </StatGroup>
          </CardBody>
        </Card>
        <TableContainer boxShadow="md" w="100%" p={5}>
          <Box mb={5}>
            <Flex gap="4" alignItems="center" flexWrap="wrap">
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
              <Box mr="20px">
                <Text fontWeight="bold" mb="10px">
                  Filter jenis simpanan
                </Text>
                <Select onChange={(e) => setJenisTabungan(e.target.value)}>
                  <option selected value="false">semua simpanan</option>
                  <option value="khusus">khusus</option>
                  <option value="wajib">wajib</option>
                  <option value="sukarela">sukarela</option>
                  <option value="pokok">pokok</option>
                </Select>
              </Box>
            </Flex>
          </Box>
          <Divider />
          {simpananDetailQuery.isLoading && <Progress size="xs" isIndeterminate />}
          <Table mb={3}>
            <Thead>
              <Tr>
                <Th>
                  Tanggal&nbsp;
                  <ChevronUpDownIcon
                    width="15px"
                    style={{ display: "inline-flex" }}
                  />
                </Th>
                <Th>Tipe</Th>
                <Th>Nominal</Th>
                <Th>Saldo</Th>
                <Th>Keterangan</Th>
                <Th>jenis simpanan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(simpananDetail || []).map((item: TSimpanan) => (
                <TableMutasi item={item} key={item.id} />
              ))}
            </Tbody>
          </Table>
          <Skeleton w='full' isLoaded={!simpananDetailQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </TableContainer>
        <ModalCreateDebit ref={modalCreateDebitRef} />
        <ModalCreateKredit ref={modalCreateKreditRef} />
      </VStack>
    </>
  );
}
