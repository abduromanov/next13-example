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

import ModalCatatan from "@/pages/pinjaman/murobahah/components/ModalCatatan";
import { TableCatatanPembayaran } from "@/pages/pinjaman/murobahah/components/TableCatatanPembayaran";
import TableRincianPembayaran from "@/pages/pinjaman/murobahah/components/TableRincianPembayaran";
import {
  useListTahunMutasiMurobahah,
  useMurobahahDetail,
  useMutasiMurobahah,
  useUpdateMurobahah,
} from "@/services/api/commands/murobahah.command";
import toIDR from "@/services/utils/toIDR";

import ModalConfirmDeleteMutasi from "../components/ModalConfirmDeleteMutasi";
import ModalTambahPembayaran from "../components/ModalTambahPembayaran";
import TableRangkumanPembayaran from "../components/TableRangkumanPembayaran";

type TPageProps = {
  pageTitle: string;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: "Detil Murobahah",
    },
  };
};

export default function PageDetailMurobahah() {
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
        () => detailMurobahah?.lunas ? 0 :
          (detailMurobahah?.totalPinjaman || 0) -
          rincianPembayaranTotal.cicilan,
        [detailMurobahah, rincianPembayaranTotal.cicilan]
      ),
      margin: useMemo(
        () => detailMurobahah?.lunas ? 0 :
          (detailMurobahah?.totalMargin || 0) - rincianPembayaranTotal.margin,
        [detailMurobahah, rincianPembayaranTotal.margin]
      ),
      total: useMemo(
        () => detailMurobahah?.lunas ? 0 : (detailMurobahah?.total || 0) - rincianPembayaranTotal.total,
        [detailMurobahah, rincianPembayaranTotal.total]
      ),
    },
    totalTenor: useMemo(
      () => detailMurobahah?.lunas ? 0 : (detailMurobahah?.tenor || 0) - rincianPembayaranTotal.tenorBayar,
      [detailMurobahah, rincianPembayaranTotal.tenorBayar]
    ),
    bulanTidakSesuai: useMemo(
      () => detailMurobahah?.lunas ? 0 : _.sumBy(mutasiMurobahah, "sum.bulanTidakSesuai"),
      [detailMurobahah, mutasiMurobahah]
    ),
  };

  const refetchQuery = () => {
    mutasiMurobahahQuery.refetch();
    catatanPembayaranQuery.refetch();
  };

  const murobahahMutation = useUpdateMurobahah(Number(id)).mutate("PUT");
  const handleLunasChange = (lunas: boolean) => {
    murobahahMutation.mutate(
      { lunas },
      {
        onSuccess() {
          if (lunas) {
            formCallback.onSuccess("Murobahah Telah Lunas");
          } else {
            formCallback.onSuccess("Murobahah Belum Lunas");
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
      url: "/pinjaman/murobahah",
    },
    {
      name: "Detail",
    },
  ];

  if (detailMurobahahQuery?.isError) {
    return <Text>Forbidden</Text>;
  }

  return (
    <Stack spacing="8" px="8" pb="10">
      <Box>
        <BreadcrumbSection data={breadcrumbData} />
      </Box>
      <Flex mx={5} p={3} mt={-2} gap="3" flexWrap="wrap">
        <Box>
          <Skeleton isLoaded={!detailMurobahahQuery.isLoading} w="300px">
            <Heading size="md">
              {detailMurobahah?.anggota?.nama} - {detailMurobahah?.pembiayaan}
            </Heading>
          </Skeleton>
        </Box>
        <Spacer />
        <Flex gap="2" flexWrap="wrap">
          <Center>
            <Skeleton isLoaded={!detailMurobahahQuery?.isLoading}>
              <HStack mr={3}>
                <Switch
                  size="md"
                  defaultChecked={detailMurobahah?.lunas}
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
            >
              <Icon as={PlusIcon} />
              &nbsp;Tambah Pembayaran
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Flex
        flexWrap="wrap"
        gap={5}
        mx={5}
        alignItems="center"
        justifyContent="center"
      >
        <Box rounded="md" boxShadow="md" p={5}>
          <Box mb={3}>
            <Heading size="md">Rincian Cicilan</Heading>
          </Box>
          <Divider />
          {detailMurobahahQuery.isLoading && (
            <Progress size="xs" isIndeterminate />
          )}
          <Box my={3} mr={40}>
            <VStack spacing={3} alignItems="start">
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr={40}>
                  Nama
                </Text>
                <Skeleton isLoaded={!detailMurobahahQuery.isLoading}>
                  <Text>{detailMurobahah?.anggota?.nama}</Text>
                </Skeleton>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr={28}>
                  Pembiayaan
                </Text>
                <Skeleton isLoaded={!detailMurobahahQuery.isLoading}>
                  <Text>{detailMurobahah?.pembiayaan}</Text>
                </Skeleton>
              </HStack>
            </VStack>
          </Box>
          <Divider />
          {detailMurobahahQuery.isLoading && (
            <Progress size="xs" isIndeterminate />
          )}
          <Box my={3} mr={40}>
            <VStack alignItems="start" spacing={3}>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="133px">
                  Pinjaman
                </Text>
                <Text>{toIDR(detailMurobahah?.totalPinjaman)}</Text>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="150px">
                  Margin
                </Text>
                <Text>{toIDR(detailMurobahah?.totalMargin)}</Text>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="184px">
                  DP
                </Text>
                <Text>{toIDR(detailMurobahah?.dp)}</Text>
              </HStack>
            </VStack>
          </Box>
          <Divider />
          {detailMurobahahQuery.isLoading && (
            <Progress size="xs" isIndeterminate />
          )}
          <Box mt={3} mr={40} color="teal.400">
            <VStack alignItems="start" spacing={3}>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="170px">
                  Total
                </Text>
                <Text>{toIDR(detailMurobahah?.total)}</Text>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="165px">
                  Tenor
                </Text>
                <Text>{detailMurobahah?.tenor}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
        <Box rounded="md" boxShadow="md" h={72} p={5}>
          <Box mb={3}>
            <Heading size="md">Cicilan Perbulan</Heading>
          </Box>
          <Divider />
          {detailMurobahahQuery.isLoading && (
            <Progress size="xs" isIndeterminate />
          )}
          <Box my={3}>
            <VStack alignItems="start" spacing={3}>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr={48}>
                  Pinjaman/bulan
                </Text>
                <Text>{toIDR(detailMurobahah?.pinjaman)}</Text>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="208px">
                  Margin/bulan
                </Text>
                <Text>{toIDR(detailMurobahah?.margin)}</Text>
              </HStack>
              <HStack spacing={4}>
                {detailMurobahah?.lunas ? (
                  <Tag colorScheme="green" rounded="md" variant="solid">
                    <TagLeftIcon boxSize="12px" as={CheckIcon} />
                    <TagLabel>Lunas</TagLabel>
                  </Tag>
                ) : (
                  <Tag colorScheme="yellow" rounded="md" variant="solid">
                    <TagLeftIcon boxSize="12px" as={XMarkIcon} />
                    <TagLabel>Belum Lunas</TagLabel>
                  </Tag>
                )}
              </HStack>
            </VStack>
          </Box>
          <Divider />
          {detailMurobahahQuery.isLoading && (
            <Progress size="xs" isIndeterminate />
          )}
          <Box mt={3} color="teal.400">
            <VStack spacing={3} alignItems="start">
              <HStack spacing={2} flexWrap="wrap">
                <Text fontWeight="bold" mr="275px">
                  Total
                </Text>
                <Text>{toIDR(detailMurobahah?.cicilan)}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Flex>

      <Card boxShadow="md" mx={5} my={7}>
        <CardHeader mb={-3}>
          <Heading size="md" mb={3}>
            Rincian Pembayaran
          </Heading>
          <Divider />
          <VStack alignItems="start" w={200} mt={5}>
            <Text>Tahun</Text>
            <Select
              onChange={(e) => setSelectedTahun(e.target.value)}
              placeholder="Semua"
            >
              {(listTahunMutasi || []).map((v: any) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </Select>
          </VStack>
        </CardHeader>
        <Divider />
        {mutasiMurobahahQuery.isLoading && (
          <Progress size="xs" isIndeterminate />
        )}
        <CardBody>
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
                <ModalCatatan
                  ref={modalCatatanRef}
                  item={catatanPembayaran
                    ?.filter(
                      (v: any) =>
                        moment(v.tglBayar).format("M-YYYY") == catatanDate
                    )
                    .map((item_2: any) => (
                      <>
                        <TableCatatanPembayaran
                          key={item_2.id}
                          item={item_2}
                          modalHandler={() => {
                            modalDeleteRef.current?.onOpen();
                            setIdMutasi(item_2.id);
                          }}
                        />
                      </>
                    ))}
                />
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
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th></Th>
                  <Th>{rincianPembayaranTotal.tenorBayar}</Th>
                  <Th>{rincianPembayaranTotal.bulanTidakSesuai}</Th>
                  <Th>{toIDR(rincianPembayaranTotal.cicilan)}</Th>
                  <Th>{toIDR(rincianPembayaranTotal.margin)}</Th>
                  <Th>{toIDR(rincianPembayaranTotal.total)}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Card boxShadow="md" mx={5} mb={5}>
        <CardHeader mb={-3}>
          <Heading size="md" mb={3}>
            Rangkuman Pembayaran
          </Heading>
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
                <TableRangkumanPembayaran item={rangkumanPembayaranTotal} item2={rincianPembayaranTotal} />
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Stack>
  );
}
