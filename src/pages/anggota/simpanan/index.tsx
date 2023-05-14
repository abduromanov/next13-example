import { usePagination } from "@ajna/pagination";
import {
  Box,
  Collapse,
  Divider,
  GridItem,
  HStack,
  Icon,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
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
      sort: '-tglDibuat'
    },
  });

  const metaData = simpananDetailQuery.data?.data?.meta;
  const simpananDetail = simpananDetailQuery.data?.data?.data;

  const totalSimpananQuery = useTotalSimpanan(Number(props.anggota.id)).query();
  const totalSimpanan = totalSimpananQuery.data?.data?.data;

  const totalSimpananAll = useMemo(
    () =>
      (totalSimpanan?.wajib || 0) +
      (totalSimpanan?.khusus || 0) +
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
                <StatLabel>Simpanan Khusus</StatLabel>
                <StatNumber>{toIDR(totalSimpanan?.khusus)}</StatNumber>
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
