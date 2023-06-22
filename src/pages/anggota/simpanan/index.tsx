import { usePagination } from "@ajna/pagination";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatHelpText,
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
import { ArrowDownIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";

import TableMutasi from "@/components/pages/simpanan/TableMutasi";

import TablePagination from "@/layouts/components/TablePagination";
import {
  useSimpananDetail,
  useTotalSimpanan,
} from "@/services/api/commands/simpanan.command";
import toIDR from "@/services/utils/toIDR";

import { TAnggota, TSimpanan } from "@/types";

interface TPageProps {
  anggota: TAnggota;
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      anggota: anggota,
      pageTitle: "Anggota",
    },
  };
};

export default function Page(props: TPageProps) {
  const [total, setTotal] = useState<number>();
  const disclosure = useDisclosure();
  const [jenisTabungan, setJenisTabungan] = useState<string>();
  const [tglDibuatAwal, settglDibuatAwal] = useState<string>();
  const [tglDibuatAkhir, settglDibuatAkhir] = useState<string>();

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const simpananDetailQuery = useSimpananDetail(
    Number(props.anggota.id)
  ).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      jenisSimpanan: jenisTabungan,
      tglDibuatAwal: tglDibuatAwal,
      tglDibuatAkhir: tglDibuatAkhir,
      sort: "-tglDibuat",
    },
  });

  const metaData = simpananDetailQuery.data?.data?.meta;
  const simpananDetail = simpananDetailQuery.data?.data?.data;

  const totalSimpananQuery = useTotalSimpanan(Number(props.anggota.id)).query();
  const totalSimpanan = totalSimpananQuery.data?.data?.data;

  const totalSimpananAll = useMemo(
    () =>
      (totalSimpanan?.wajib || 0) +
      (totalSimpanan?.investasi || 0) +
      (totalSimpanan?.sukarela || 0) +
      (totalSimpanan?.pokok || 0),
    [totalSimpanan]
  );

  useEffect(() => {
    setTotal(metaData?.filter_count);
  }, [metaData]);

  return (
    <Stack mt="4">
      <Box>
        <HStack
          onClick={disclosure.onToggle}
          cursor="pointer"
          justifyContent="space-between"
          px="4"
        >
          <Stat>
            <StatLabel>Total Simpanan</StatLabel>
            <StatNumber>{toIDR(totalSimpananAll)}</StatNumber>
            <StatHelpText>Klik untuk melihat detail</StatHelpText>
          </Stat>
          {disclosure.isOpen ? (
            <Icon
              as={ChevronUpIcon}
              fontSize="24"
              fontWeight="bold"
              strokeWidth="2"
            />
          ) : (
            <Icon
              as={ChevronDownIcon}
              fontSize="24"
              fontWeight="bold"
              strokeWidth="2"
            />
          )}
        </HStack>
        <Divider />
        <Collapse in={disclosure.isOpen}>
          <SimpleGrid columns={[1, 2, 4]} gap="3" px="4" py="4">
            <GridItem>
              <Stat>
                <StatLabel>Simpanan Pokok</StatLabel>
                <StatNumber>{toIDR(totalSimpanan?.pokok)}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Simpanan Wajib</StatLabel>
                <StatNumber>{toIDR(totalSimpanan?.wajib)}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Simpanan Investasi</StatLabel>
                <StatNumber>{toIDR(totalSimpanan?.investasi)}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Simpanan Sukarela</StatLabel>
                <StatNumber>{toIDR(totalSimpanan?.sukarela)}</StatNumber>
              </Stat>
            </GridItem>
          </SimpleGrid>
          <Divider />
        </Collapse>
      </Box>
      <Flex
        gap="4"
        px="4"
        alignItems="center"
        display={["grid", "flex"]}
        flexWrap="wrap"
      >
        <Box mb={5}>
          <Text fontSize="sm" mb={3}>
            Filter Tanggal
          </Text>
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
        </Box>
        <Box w={["full", "200px"]} mb={5}>
          <Text fontSize="sm" mb={3}>
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

      <TableContainer p={0}>
        <Table mb={3}>
          <Thead>
            <Tr>
              <Th>Tanggal</Th>
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
      <Skeleton w="full" isLoaded={!simpananDetailQuery.isLoading} px="4">
        <TablePagination pagination={pagination} />
      </Skeleton>
    </Stack>
  );
}
