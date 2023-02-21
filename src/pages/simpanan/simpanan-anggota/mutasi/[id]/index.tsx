import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  Progress,
  Select,
  Skeleton,
  Stack,
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
} from "@chakra-ui/react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import TableMutasi from "@/pages/simpanan/simpanan-anggota/components/TableMutasi";
import { useAnggotaDetail } from "@/services/api/commands/anggota.command";
import { useSimpananDetail, useTotalSimpanan } from "@/services/api/commands/simpanan.command";
import toIDR from "@/services/utils/toIDR";

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
      pageTitle: "Mutasi Simpanan",
    },
  };
};

export default function PageMutasi() {
  const [total, setTotal] = useState<number>();
  const [jenisTabungan, setJenisTabungan] = useState<string>();
  const [tglDibuatAwal, settglDibuatAwal] = useState<string>();
  const [tglDibuatAkhir, settglDibuatAkhir] = useState<string>();

  const router = useRouter();
  const { id } = router.query;

  const modalCreateDebitRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalCreateKreditRef = useRef<ReturnType<typeof useDisclosure>>();

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const simpananDetailQuery = useSimpananDetail(Number(id)).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      jenisSimpanan: jenisTabungan,
      tglDibuatAwal: tglDibuatAwal,
      tglDibuatAkhir: tglDibuatAkhir
    },
  });

  const anggotaQuery = useAnggotaDetail(Number(id)).query();
  const totalSimpananQuery = useTotalSimpanan(Number(id)).query();

  const anggota = anggotaQuery.data?.data?.data;
  const simpananDetail = simpananDetailQuery.data?.data?.data;
  const metaData = simpananDetailQuery.data?.data?.meta;
  const totalSimpanan = totalSimpananQuery.data?.data?.data;

  const refetchQuery = () => {
    simpananDetailQuery.refetch();
    totalSimpananQuery.refetch();
  }

  useEffect(() => {
    setTotal(metaData?.filter_count);
  }, [metaData]);

  const totalSimpananAll = useMemo(
    () =>
      (totalSimpanan?.wajib || 0) +
      (totalSimpanan?.khusus || 0) +
      (totalSimpanan?.sukarela || 0) +
      (totalSimpanan?.pokok || 0),
    [totalSimpanan]
  );

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
  // console.log(moment(tglDibuatAwal).toISOString())
  return (
    <Stack spacing={8} px={8} pb={10}>
      <BreadcrumbSection data={breadcrumbData} />
      <Flex alignItems="center" justifyContent="space-between" mb={5}>
        <Skeleton isLoaded={!anggotaQuery.isLoading} w={"25%"}>
          <Text fontSize="2xl" fontWeight="semibold">
            {anggota?.nama} - {anggota?.idAnggota}
          </Text>
        </Skeleton>
        <Box>
          <ButtonGroup gap="2">
            <Button
              colorScheme="teal"
              onClick={() => modalCreateDebitRef.current?.onOpen()}
              leftIcon={<Icon as={PlusIcon} />}
            >
              Debit
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => modalCreateKreditRef.current?.onOpen()}
              leftIcon={<Icon as={PlusIcon} />}
            >
              Kredit
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      <Card m={5} variant="outline" shadow="sm">
        <CardBody>
          <StatGroup gap={3}>
            <Stat>
              <StatLabel>Simpanan Pokok</StatLabel>
              <StatNumber>{toIDR(totalSimpanan?.pokok)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Simpanan Wajib</StatLabel>
              <StatNumber>{toIDR(totalSimpanan?.wajib)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Simpanan</StatLabel>
              <StatNumber>{toIDR(totalSimpananAll)}</StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mt={5}>
            <Stat>
              <StatLabel>Simpanan Khusus</StatLabel>
              <StatNumber>{toIDR(totalSimpanan?.khusus)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Simpanan Sukarela</StatLabel>
              <StatNumber>{toIDR(totalSimpanan?.sukarela)}</StatNumber>
            </Stat>
            <Stat></Stat>
          </StatGroup>
        </CardBody>
      </Card>

      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Box mb={5}>
            <Flex gap="4" alignItems="center">
              <Box>
                <Text fontWeight="bold" mb="10px">
                  Filter Tanggal
                </Text>
                <HStack>
                  <InputGroup borderRadius="md" bg="gray.100" w={["full", "fit-content"]} display={["block", "flex"]}>
                    <Input
                      type="date"
                      w={["100%", "200px"]}
                      border={0}
                      focusBorderColor="none"
                      onChange={(e) => settglDibuatAwal(e.target.value)}
                    />
                    <Flex justifyContent="center" alignItems="center">
                      <Icon
                        as={ArrowRightIcon}
                        w="20px"
                        display={["none", "block"]}
                      />
                      <Icon as={ArrowDownIcon} w="20px" display={["block", "none"]} />
                    </Flex>
                    <Input
                      type="date"
                      w={["100%", "200px"]}
                      border={0}
                      focusBorderColor="none"
                      onChange={(e) => settglDibuatAkhir(e.target.value)}
                    />
                  </InputGroup>
                </HStack>
              </Box>
              <Box mr="20px">
                <Text fontWeight="bold" mb="10px">
                  Filter jenis simpanan
                </Text>
                <Select
                  onChange={(e) => setJenisTabungan(e.target.value)}
                  placeholder="Semua Simpanan"
                >
                  <option value="khusus">Khusus</option>
                  <option value="wajib">Wajib</option>
                  <option value="sukarela">Sukarela</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </CardHeader>
        {simpananDetailQuery.isLoading && (
          <Progress size="xs" isIndeterminate />
        )}
        <CardBody>
          <TableContainer p={0} pb={5}>
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
            <Skeleton w="full" isLoaded={!simpananDetailQuery.isLoading}>
              <TablePagination pagination={pagination} />
            </Skeleton>
          </TableContainer>
        </CardBody>
      </Card>

      <ModalCreateDebit ref={modalCreateDebitRef} refetchFn={refetchQuery} />
      <ModalCreateKredit ref={modalCreateKreditRef} refetchFn={refetchQuery} />
    </Stack>
  );
}
