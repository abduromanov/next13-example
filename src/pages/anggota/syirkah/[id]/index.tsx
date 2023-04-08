import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  Progress,
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
  VStack,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import useCustomPagination from "@/hooks/useCustomPagination";

import TableDetilSyirkah from "@/components/pages/pinjaman/syirkah/TableDetilSyirkah";

import TablePagination from "@/layouts/components/TablePagination";
import { useDetailSyirkah, useMutasiSyirkah } from "@/services/api/commands/syirkah.command";
import toIDR from "@/services/utils/toIDR";

import { TAnggota } from "@/types";
type TPageProps = {
  pageTitle: string;
  anggota: TAnggota;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      pageTitle: "Detail Syirkah",
      anggota: anggota,
    },
  };
};

export default function Page() {
  const router = useRouter();
  const [total, setTotal] = useState(0);

  const pagination = useCustomPagination(total);

  const detailSyirkahQuery = useDetailSyirkah(
    router.query.id as string
  ).query();
  const detailSyirkah = detailSyirkahQuery.data?.data?.data;

  const listMutasiQuery = useMutasiSyirkah(router.query.id as string).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
    },
  });

  const listMutasi = listMutasiQuery.data?.data?.data;
  const metadata = listMutasiQuery.data?.data?.meta;

  const tglMulai = useMemo(
    () => moment(detailSyirkah?.tglMulai).format("DD MMMM YYYY"),
    [detailSyirkah?.tglMulai]
  );
  const tglSelesai = useMemo(
    () => moment(detailSyirkah?.tglSelesai).format("DD MMMM YYYY"),
    [detailSyirkah?.tglSelesai]
  );


  useEffect(() => {
    setTotal(metadata?.filter_count || 0);
  }, [metadata?.filter_count]);

  return (
    <Stack spacing="8" px={{ base: 8, lg: 0 }} mt="8" pb="10">
      <Flex
        alignItems="center"
        justify="space-between"
        display={["grid", "flex"]}
        gap={3}
      >
        <Box>
          <Skeleton isLoaded={!detailSyirkahQuery.isLoading} w="300px">
            <Heading size="md">
              {detailSyirkah?.namaBc}
            </Heading>
          </Skeleton>
        </Box>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardBody>
          <Flex mb={8} alignItems="start" display={["grid", "flex"]} gap={5}>
            <VStack flex={1} alignItems="start">
              <Stack
                direction={["column", "row"]}
                justifyContent="space-between"
                w="full"
              >
                <Text fontWeight="bold">Nama BC</Text>
                <Skeleton isLoaded={!detailSyirkahQuery.isLoading} minW="40%">
                  <Text textAlign="right">{detailSyirkah?.namaBc}</Text>
                </Skeleton>
              </Stack>
              <Stack
                direction={["column", "row"]}
                justifyContent="space-between"
                w="full"
              >
                <Text fontWeight="bold">Pemilik</Text>
                <Skeleton isLoaded={!detailSyirkahQuery.isLoading} minW="40%">
                  <Text textAlign="right">
                    {detailSyirkah?.anggota.nama} (
                    {detailSyirkah?.anggota.idAnggota})
                  </Text>
                </Skeleton>
              </Stack>
            </VStack>
            <VStack flex={1} alignItems="start">
              <Stack
                direction={["column", "row"]}
                justifyContent="space-between"
                w="full"
              >
                <Text fontWeight="bold">Tanggal Mulai</Text>
                <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                  <Text>{tglMulai}</Text>
                </Skeleton>
              </Stack>
              <Stack
                direction={["column", "row"]}
                justifyContent="space-between"
                w="full"
              >
                <Text fontWeight="bold">Tanggal Selesai</Text>
                <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                  <Text>{tglSelesai}</Text>
                </Skeleton>
              </Stack>
            </VStack>
          </Flex>
          <StatGroup gap={5}>
            <Stat mb={4}>
              <StatLabel>Modal Awal</StatLabel>
              <StatNumber>{toIDR(detailSyirkah?.modalAwal)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Modal Hamasah</StatLabel>
              <StatNumber>{toIDR(detailSyirkah?.modalHamasah)}</StatNumber>
            </Stat>
          </StatGroup>
        </CardBody>
      </Card>
      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
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
              />
            </InputGroup>
          </Box>
        </CardHeader>
        {listMutasiQuery.isLoading && <Progress size="xs" isIndeterminate />}
        <CardBody>
          <TableContainer p="0" mb="5">
            <Table mb={5}>
              <Thead>
                <Tr>
                  <Th>Tanggal</Th>
                  <Th>Modal Awal</Th>
                  <Th>Modal Hamasah</Th>
                  <Th>Bonus Bersih</Th>
                  <Th>Presentasi Bagi Hasil</Th>
                  <Th>Bagi Hasil Hamasah</Th>
                  <Th>Catatan</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listMutasi || []).map((item) => (
                  <TableDetilSyirkah
                    item={item}
                    key={item.id}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Skeleton w="full" isLoaded={!listMutasiQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>
    </Stack>
  )
}