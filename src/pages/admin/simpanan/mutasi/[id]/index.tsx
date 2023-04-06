import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Progress,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
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
import ModalCreateDebit from "@/components/pages/simpanan/ModalCreateDebit";
import ModalCreateKredit from "@/components/pages/simpanan/ModalCreateKredit";
import TableMutasi from "@/components/pages/simpanan/TableMutasi";

import TablePagination from "@/layouts/components/TablePagination";
import { useAnggotaDetail } from "@/services/api/commands/anggota.command";
import {
  useSimpananDetail,
  useTotalSimpanan,
} from "@/services/api/commands/simpanan.command";
import toIDR from "@/services/utils/toIDR";

import { TAnggota, TSimpanan } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota?: TAnggota;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      pageTitle: "Mutasi Simpanan",
      anggota: anggota,
    },
  };
};

export default function Page() {
  const [total, setTotal] = useState<number>();
  const [jenisTabungan, setJenisTabungan] = useState<string>();
  const [tglDibuatAwal, settglDibuatAwal] = useState<string>();
  const [tglDibuatAkhir, settglDibuatAkhir] = useState<string>();
  const [isSortByDesc, setIsSortByDesc] = useState<boolean>(true);

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
      tglDibuatAkhir: tglDibuatAkhir,
      sort: [isSortByDesc ? "-tglTransaksi" : "tglTransaksi"]
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
  };

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
      url: "/admin/simpanan",
    },
    {
      name: "Mutasi",
    },
  ];

  return (
    <Stack spacing={8} px={8} pb={10}>
      <BreadcrumbSection data={breadcrumbData} />

      <Flex
        mx={5}
        mt={-2}
        gap="3"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Skeleton isLoaded={!anggotaQuery.isLoading} w={["full", "50%"]}>
          <Text fontSize="2xl" fontWeight="semibold">
            {anggota?.nama} - {anggota?.idAnggota}
          </Text>
        </Skeleton>
        <Flex gap="2" flexWrap="wrap">
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
        </Flex>
      </Flex>

      <Card m={5} variant="outline" shadow="sm">
        <CardBody>
          <SimpleGrid columns={[1, 3]} gap={8}>
            <GridItem colSpan={2}>
              <SimpleGrid columns={[1, 2]} gap={3}>
                <Stat>
                  <StatLabel>Simpanan Pokok</StatLabel>
                  <StatNumber>{toIDR(totalSimpanan?.pokok)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Simpanan Wajib</StatLabel>
                  <StatNumber>{toIDR(totalSimpanan?.wajib)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Simpanan Khusus</StatLabel>
                  <StatNumber>{toIDR(totalSimpanan?.khusus)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Simpanan Sukarela</StatLabel>
                  <StatNumber>{toIDR(totalSimpanan?.sukarela)}</StatNumber>
                </Stat>
              </SimpleGrid>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Total Simpanan</StatLabel>
                <StatNumber>{toIDR(totalSimpananAll)}</StatNumber>
              </Stat>
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>

      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Box mb={5}>
            <Flex gap="4" alignItems="center" display={["grid", "flex"]} flexWrap="wrap" >
              <Box>
                <Text fontWeight="bold" mb="10px">
                  Filter Tanggal
                </Text>
                <HStack>
                  <InputGroup
                    borderRadius="md"
                    bg="gray.100"
                    w={["full", "fit-content"]}
                    display={["block", "flex"]}
                  >
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
                      <Icon
                        as={ArrowDownIcon}
                        w="20px"
                        display={["block", "none"]}
                      />
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
              <Box w={["full", "200px"]}>
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
          <TableContainer p={0} mb="5">
            <Table mb={3}>
              <Thead>
                <Tr>
                  <Th>
                    Tanggal
                    <IconButton icon={<Icon as={ChevronUpDownIcon} fontSize="20px" />} aria-label="sort tanggal" variant="ghost" onClick={() => setIsSortByDesc(!isSortByDesc)} />
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
          </TableContainer>
          <Skeleton w="full" isLoaded={!simpananDetailQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>

      <ModalCreateDebit ref={modalCreateDebitRef} refetchFn={refetchQuery} />
      <ModalCreateKredit ref={modalCreateKreditRef} refetchFn={refetchQuery} />
    </Stack>
  );
}
