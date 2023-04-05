import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Portal,
  Progress,
  Select,
  Skeleton,
  Spacer,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";

import { useFormCallback } from "@/hooks/useFormCallback";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import ModalCatatan from "@/components/pages/pinjaman/murobahah/detail/ModalCatatan";
import ModalConfirmDeleteMutasi from "@/components/pages/pinjaman/murobahah/detail/ModalConfirmDeleteMutasi";
import ModalTambahPembayaran from "@/components/pages/pinjaman/murobahah/detail/ModalTambahPembayaran";
import TableCatatanPembayaran from "@/components/pages/pinjaman/murobahah/detail/TableCatatanPembayaran";
import TableRangkumanPembayaran from "@/components/pages/pinjaman/murobahah/detail/TableRangkumanPembayaran";
import TableRincianPembayaran from "@/components/pages/pinjaman/murobahah/detail/TableRincianPembayaran";

import Custom404 from "@/pages/404";
import {
  useListTahunMutasiMurobahah,
  useMurobahahDetail,
  useMutasiMurobahah,
  useUpdateMurobahah,
} from "@/services/api/commands/murobahah.command";
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
      pageTitle: "Detail Murobahah",
      anggota: anggota,
    },
  };
};

export default function Page() {
  // TODO: Fix issues below
  //  - Make sure this page using this word: "Detail Murobahah"
  //  - Is total and tenor compatible with bold font?

  const [catatanDate, setCatatanDate] = useState<string>();
  const [idMutasi, setIdMutasi] = useState<number>();
  const [selectedTahun, setSelectedTahun] = useState<string>();

  const router = useRouter();
  const formCallback = useFormCallback();
  const { id } = router.query;

  const modalCatatanRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalDeleteRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalTambahPembayaranRef = useRef<ReturnType<typeof useDisclosure>>();

  const detailMurobahahQuery = useMurobahahDetail(Number(id)).query();
  const mutasiMurobahahQuery = useMutasiMurobahah(Number(id)).paginate({
    params: {
      sort: ["year(tglBayar)", "month(tglBayar)"],
      aggregate: {
        sum: [
          "total",
          "margin",
          "cicilan",
          "tenorTerbayar",
          "bulanTidakSesuai",
        ],
      },
      groupBy: ["month(tglBayar)", "year(tglBayar)"],
      tahun: selectedTahun,
      // filter: { "tglBayar": { "_between": ["2023-01-01", "2023-12-30"] } }
    },
  });

  const catatanPembayaranQuery = useMutasiMurobahah(Number(id)).paginate({
    params: {
      sort: "tglBayar",
    },
  });

  const listTahunMutasiQuery = useListTahunMutasiMurobahah(Number(id)).query();

  const detailMurobahah = detailMurobahahQuery.data?.data?.data;
  const mutasiMurobahah = mutasiMurobahahQuery.data?.data?.data;
  const catatanPembayaran = catatanPembayaranQuery.data?.data?.data;
  const listTahunMutasi = listTahunMutasiQuery.data?.data?.data;

  const rincianPembayaranTotal = {
    tenorBayar: useMemo(
      () => _.sumBy(mutasiMurobahah, "sum.tenorTerbayar"),
      [mutasiMurobahah]
    ),
    bulanTidakSesuai: useMemo(
      () => _.sumBy(mutasiMurobahah, "sum.bulanTidakSesuai"),
      [mutasiMurobahah]
    ),
    margin: useMemo(
      () => _.sumBy(mutasiMurobahah, "sum.margin"),
      [mutasiMurobahah]
    ),
    cicilan: useMemo(
      () => _.sumBy(mutasiMurobahah, "sum.cicilan"),
      [mutasiMurobahah]
    ),
    total: useMemo(
      () => _.sumBy(mutasiMurobahah, "sum.total"),
      [mutasiMurobahah]
    ),
  };

  const rangkumanPembayaranTotal = {
    sisaCicilan: {
      cicilan: useMemo(
        () =>
          detailMurobahah?.lunas
            ? 0
            : (detailMurobahah?.totalPinjaman || 0) -
              rincianPembayaranTotal.cicilan,
        [detailMurobahah, rincianPembayaranTotal.cicilan]
      ),
      margin: useMemo(
        () =>
          detailMurobahah?.lunas
            ? 0
            : (detailMurobahah?.totalMargin || 0) -
              rincianPembayaranTotal.margin,
        [detailMurobahah, rincianPembayaranTotal.margin]
      ),
      total: useMemo(
        () =>
          detailMurobahah?.lunas
            ? 0
            : (detailMurobahah?.total || 0) - rincianPembayaranTotal.total,
        [detailMurobahah, rincianPembayaranTotal.total]
      ),
    },
    totalTenor: useMemo(
      () =>
        detailMurobahah?.lunas
          ? 0
          : (detailMurobahah?.tenor || 0) - rincianPembayaranTotal.tenorBayar,
      [detailMurobahah, rincianPembayaranTotal.tenorBayar]
    ),
    bulanTidakSesuai: useMemo(
      () =>
        detailMurobahah?.lunas
          ? 0
          : _.sumBy(mutasiMurobahah, "sum.bulanTidakSesuai"),
      [detailMurobahah, mutasiMurobahah]
    ),
  };

  const refetchQuery = () => {
    mutasiMurobahahQuery.refetch();
    catatanPembayaranQuery.refetch();
  };

  const murobahahMutation = useUpdateMurobahah(Number(id)).mutate("PUT");
  const handleLunasChange = (lunas: boolean) => {
    // console.log({ lunas })
    murobahahMutation.mutate(
      { lunas },
      {
        onSuccess() {
          detailMurobahahQuery.refetch();
          if (lunas) {
            formCallback.onSuccess("Murobahah Telah Lunas");
          } else {
            formCallback.onError("Murobahah Belum Lunas");
          }
        },
        onError() {
          formCallback.onError("terjadi kesalahan");
        },
      }
    );
  };

  const breadcrumbData = [
    {
      name: "Pinjaman",
    },
    {
      name: "Murobahah",
      url: "/admin/pinjaman/murobahah",
    },
    {
      name: "Detail Murobahah",
    },
  ];

  if (detailMurobahahQuery?.isError) {
    return <Custom404 />;
  }

  return (
    <Stack spacing="8" px="8" pb="10">
      <BreadcrumbSection data={breadcrumbData} />
      <Flex
        alignItems="center"
        justify="space-between"
        display={["grid", "flex"]}
        gap={3}
      >
        <Box>
          <Skeleton isLoaded={!detailMurobahahQuery.isLoading} w="300px">
            <Heading size="md">
              {detailMurobahah?.anggota?.nama} - {detailMurobahah?.pembiayaan}
            </Heading>
          </Skeleton>
        </Box>
        <Spacer />
        <Flex gap="4" flexWrap="wrap">
          <Center>
            <Skeleton isLoaded={!detailMurobahahQuery?.isLoading}>
              <HStack mr={3}>
                <Switch
                  size="md"
                  isChecked={detailMurobahah?.lunas}
                  onChange={(e) => handleLunasChange(e.target.checked)}
                />
                <Text>Pembayaran Lunas</Text>
              </HStack>
            </Skeleton>
          </Center>
          <Box>
            <Button
              onClick={() => {
                modalTambahPembayaranRef.current?.onOpen();
              }}
              leftIcon={<Icon as={PlusIcon} />}
            >
              Tambah Pembayaran
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Stack direction={["column", "row"]} spacing={5}>
        <Card variant="outline" shadow="sm" w={["full", "50%"]} p={5}>
          <VStack spacing={3} divider={<Divider />}>
            <Heading mb={3} size="md">
              Rincian Cicilan
            </Heading>

            <VStack spacing={3} alignItems="start" w="full">
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Nama</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{detailMurobahah?.anggota?.nama}</Text>
                </Skeleton>
              </HStack>
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Pembiayaan</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{detailMurobahah?.pembiayaan}</Text>
                </Skeleton>
              </HStack>
            </VStack>

            <VStack spacing={3} alignItems="start" w="full">
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Pinjaman</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{toIDR(detailMurobahah?.totalPinjaman)}</Text>
                </Skeleton>
              </HStack>
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Margin</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{toIDR(detailMurobahah?.totalMargin)}</Text>
                </Skeleton>
              </HStack>
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">DP</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{toIDR(detailMurobahah?.dp)}</Text>
                </Skeleton>
              </HStack>
            </VStack>

            <VStack spacing={3} alignItems="start" w="full" color="brand.500">
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Total</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{toIDR(detailMurobahah?.total)}</Text>
                </Skeleton>
              </HStack>
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Tenor</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{detailMurobahah?.tenor}</Text>
                </Skeleton>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        <Card variant="outline" shadow="sm" w={["full", "50%"]} p={5}>
          <VStack
            justify="space-between"
            alignItems="stretch"
            w="full"
            h="full"
            spacing={3}
          >
            <VStack spacing={3} divider={<Divider />}>
              <Heading mb={3} size="md">
                Cicilan Perbulan
              </Heading>

              <VStack spacing={3} alignItems="start" w="full">
                <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                  <Text fontWeight="bold">Pinjaman/bulan</Text>
                  <Skeleton
                    isLoaded={!detailMurobahahQuery.isLoading}
                    minW="40%"
                    textAlign="right"
                  >
                    <Text>{toIDR(detailMurobahah?.pinjaman)}</Text>
                  </Skeleton>
                </HStack>
                <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                  <Text fontWeight="bold">Margin/bulan</Text>
                  <Skeleton
                    isLoaded={!detailMurobahahQuery.isLoading}
                    minW="40%"
                    textAlign="right"
                  >
                    <Text>{toIDR(detailMurobahah?.margin)}</Text>
                  </Skeleton>
                </HStack>
              </VStack>
            </VStack>

            <VStack spacing={3} alignItems="start" w="full">
              <Divider />
              <HStack flexWrap="wrap" w="full" justifyContent="space-between">
                <Text fontWeight="bold">Total</Text>
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Text>{toIDR(~~(detailMurobahah?.cicilan || 0))}</Text>
                </Skeleton>
              </HStack>
              <Flex justify="end" w="full">
                <Skeleton
                  isLoaded={!detailMurobahahQuery.isLoading}
                  minW="40%"
                  textAlign="right"
                >
                  <Tag
                    colorScheme={detailMurobahah?.lunas ? "green" : "yellow"}
                    rounded="md"
                    variant="solid"
                  >
                    <TagLeftIcon
                      boxSize="12px"
                      as={detailMurobahah?.lunas ? CheckIcon : XMarkIcon}
                    />
                    <TagLabel>
                      {detailMurobahah?.lunas ? "Lunas" : "Belum Lunas"}
                    </TagLabel>
                  </Tag>
                </Skeleton>
              </Flex>
            </VStack>
          </VStack>
        </Card>
      </Stack>

      <Card variant="outline" m={5}>
        <CardHeader>
          <Heading size="md">Rincian Pembayaran</Heading>
        </CardHeader>
        <Divider />
        {mutasiMurobahahQuery.isLoading && (
          <Progress size="xs" isIndeterminate />
        )}
        <CardBody>
          <VStack alignItems="start" w={200} mb={5}>
            <Text fontSize="sm">Tahun</Text>
            <Select
              onChange={(e) => setSelectedTahun(e.target.value)}
              placeholder="Semua"
            >
              {(listTahunMutasi || []).map((tahun: any) => (
                <option value={tahun} key={tahun}>
                  {tahun}
                </option>
              ))}
            </Select>
          </VStack>

          <TableContainer>
            <Table mb={3}>
              <Thead>
                <Tr>
                  <Th>Tahun</Th>
                  <Th>Bulan</Th>
                  <Th>Tenor Terbayar</Th>
                  <Th>Bulan Tidak Sesuai</Th>
                  <Th>Cicilan</Th>
                  <Th>Margin</Th>
                  <Th>Total</Th>
                  <Th>Detail</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(mutasiMurobahah || []).map((item: any) => (
                  <TableRincianPembayaran
                    item={item}
                    key={`${item?.tglBayar_month}-${item?.tglBayar_year}`}
                    modalHandler={() => {
                      setCatatanDate(
                        `${item.tglBayar_month}-${item.tglBayar_year}`
                      );
                      modalCatatanRef.current?.onOpen();
                    }}
                  />
                ))}
              </Tbody>
              <Tfoot>
                <Tr fontWeight="semibold">
                  <Td textTransform="uppercase">Total</Td>
                  <Td></Td>
                  <Td>{rincianPembayaranTotal.tenorBayar}</Td>
                  <Td>{rincianPembayaranTotal.bulanTidakSesuai}</Td>
                  <Td>{toIDR(rincianPembayaranTotal.cicilan)}</Td>
                  <Td>{toIDR(rincianPembayaranTotal.margin)}</Td>
                  <Td>{toIDR(rincianPembayaranTotal.total)}</Td>
                  <Td></Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Card boxShadow="md" mx={5} mb={5}>
        <CardHeader>
          <Heading size="md">Rangkuman Pembayaran</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Keterangan</Th>
                  <Th>Cicilan</Th>
                  <Th>Margin</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <TableRangkumanPembayaran
                  itemSelisih={rangkumanPembayaranTotal}
                  itemTerbayar={rincianPembayaranTotal}
                />
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Portal>
        <ModalCatatan ref={modalCatatanRef}>
          {catatanPembayaran
            ?.filter(
              (v: any) => moment(v.tglBayar).format("M-YYYY") == catatanDate
            )
            .map((item: any) => (
              <TableCatatanPembayaran
                key={item.id}
                item={item}
                modalHandler={() => {
                  modalDeleteRef.current?.onOpen();
                  setIdMutasi(item.id);
                }}
              />
            ))}
        </ModalCatatan>

        <ModalConfirmDeleteMutasi
          ref={modalDeleteRef}
          refetchFn={refetchQuery}
          id={Number(id) || 0}
          idMutasi={idMutasi || 0}
        />

        <ModalTambahPembayaran
          ref={modalTambahPembayaranRef}
          refetchFn={refetchQuery}
        />
      </Portal>
    </Stack>
  );
}
