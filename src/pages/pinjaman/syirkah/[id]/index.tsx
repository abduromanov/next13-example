import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
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
import { ArrowLongRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import BreadcrumbSection from "@/components/BreadcrumbSection";

import TablePagination from "@/layouts/components/TablePagination";
import { useDetailSyirkah, useMutasiSyirkah } from "@/services/api/commands/syirkah.command";
import toIDR from "@/services/utils/toIDR";

import TableDetilSyirkah from "../components/TableDetilSyirkah";

type TPageProps = {
  pageTitle: string;
};
export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Detail Syirkah",
    },
  };
};

export default function PageDetailSyirkah() {
  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Syirkah",
      url: "/pinjaman/syirkah",
    },
    {
      name: "Detil Syirkah",
    },
  ];

  const router = useRouter();
  const [total, setTotal] = useState(0);

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const detailSyirkahQuery = useDetailSyirkah(router.query.id as string).query();
  const detailSyirkah = detailSyirkahQuery.data?.data?.data;

  const listMutasiQuery = useMutasiSyirkah(router.query.id as string).paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
    }
  });

  const listMutasi = listMutasiQuery.data?.data?.data;
  const metadata = listMutasiQuery.data?.data?.meta;

  const tglMulai = useMemo(() => moment(detailSyirkah?.tglMulai).format('DD MMMM YYYY'), [detailSyirkah?.tglMulai]);
  const tglSelesai = useMemo(() => moment(detailSyirkah?.tglSelesai).format('DD MMMM YYYY'), [detailSyirkah?.tglSelesai]);

  useEffect(() => {
    setTotal(metadata?.filter_count || 0);
  }, [metadata?.filter_count])

  return (
    <Stack spacing="8" px="8" pb="10">
      <BreadcrumbSection data={breadcrumbData} />
      <Flex alignItems="center" justify="space-between">
        <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
          <Heading size="lg">{detailSyirkah?.namaBc}</Heading>
        </Skeleton>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
        // onClick={modalCreateRef.current?.onOpen}
        >
          Tambah Pinjaman
        </Button>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardBody>
          <HStack mb={8} alignItems='start'>
            <VStack flex={1} alignItems='start'>
              <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                <Flex gap={2} flexWrap="wrap">
                  <Text fontWeight="bold" mr={74}>
                    Nama BC
                  </Text>
                  <Text>{detailSyirkah?.namaBc}</Text>
                </Flex>
              </Skeleton>
              <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                <Flex gap={2} flexWrap="wrap">
                  <Text fontWeight="bold" mr={88}>
                    Pemilik
                  </Text>
                  <Text>{detailSyirkah?.anggota.nama} ({detailSyirkah?.anggota.idAnggota})</Text>
                </Flex>
              </Skeleton>
            </VStack>
            <VStack flex={1} alignItems='start'>
              <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                <Flex gap={2} flexWrap="wrap">
                  <Text fontWeight="bold" mr={38}>
                    Tanggal Mulai
                  </Text>
                  <Text>{tglMulai}</Text>
                </Flex>
              </Skeleton>
              <Skeleton isLoaded={!detailSyirkahQuery.isLoading}>
                <Flex gap={2} flexWrap="wrap">
                  <Text fontWeight="bold" mr={29}>
                    Tanggal Selesai
                  </Text>
                  <Text>{tglSelesai}</Text>
                </Flex>
              </Skeleton>
            </VStack>
          </HStack>
          <StatGroup>
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
            <Flex gap="4" alignItems="center">
              <Box>
                <Text fontSize='sm' mb={3}>
                  Filter Tanggal
                </Text>
                <HStack>
                  <InputGroup borderRadius="md" bg="gray.100">
                    <Input
                      type="date"
                      w="200px"
                      border={0}
                      focusBorderColor="none"
                    />
                    <Flex mx={2} justifyContent="center">
                      <ArrowLongRightIcon width="20px" />
                    </Flex>
                    <Input
                      type="date"
                      w="200px"
                      border={0}
                      focusBorderColor="none"
                    />
                  </InputGroup>
                </HStack>
              </Box>
            </Flex>
          </Box>
        </CardHeader>
        {listMutasiQuery.isLoading && (
          <Progress size="xs" isIndeterminate />
        )}
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
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listMutasi || []).map(item => (
                  <TableDetilSyirkah item={item} key={item.id} />
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
  );
}
