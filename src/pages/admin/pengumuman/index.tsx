import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Progress,
  Skeleton,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useFormCallback } from "@/hooks/useFormCallback";

import TablePagination from "@/layouts/components/TablePagination";
import {
  useMutatePengumuman,
  usePengumuman,
} from "@/services/api/commands/pengumuman.command";

import ModalCreatePengumuman from "./components/ModalCreatePengumuman";

import { TAnggota, TPengumuman } from "@/types";

type TPageProps = {
  pageTitle: string;
  anggota: TAnggota;
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "");

  return {
    props: {
      pageTitle: "Pengumuman",
      anggota: anggota,
    },
  };
};

const TableRow = (props: { item: TPengumuman; refetchFn?: () => void }) => {
  const formCallback = useFormCallback();
  const tglDibuat = useMemo(
    () => moment(props.item.date_created).format("DD MMMM YYYY"),
    [props.item.date_created]
  );
  const pengumumanMutation = useMutatePengumuman(props.item.id).mutate("PUT");

  const switchHandler = (value: boolean) => {
    pengumumanMutation.mutate(
      {
        active: value,
      },
      {
        onSuccess() {
          props.refetchFn?.();
        },
        onError() {
          formCallback.onError(
            "Terjadi kesalahan pada server. Cobalah beberapa saat lagi"
          );
        },
      }
    );
  };

  return (
    <Tr>
      <Td w="200px">
        <Box position="relative" h="200px" w="200px" mx="auto">
          <Image
            src={`${process.env.API_URL}/assets/${props.item.image}?access_token=${process.env.API_TOKEN}&quality=20`}
            alt={props.item.id}
            fill
            sizes="200"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Td>
      <Td>{tglDibuat}</Td>
      <Td alignItems="center">
        <Switch
          isDisabled={pengumumanMutation.isLoading}
          isChecked={props.item.active}
          onChange={(e) => switchHandler(e.target.checked)}
        />
      </Td>
    </Tr>
  );
};

export default function Page() {
  const [total, setTotal] = useState<number>();
  const modalCreateRef = useRef<ReturnType<typeof useDisclosure>>();

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const pengumumanQuery = usePengumuman().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
    },
  });

  const pengumuman = pengumumanQuery.data?.data?.data;
  const metadata = pengumumanQuery.data?.data?.meta;

  const refetchFn = () => pengumumanQuery.refetch();

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  return (
    <Stack spacing="8" px="8" pb="10">
      <Flex alignItems="center" justify="space-between">
        <Heading size="lg">Pengumuman</Heading>
        <Button
          as="span"
          leftIcon={<Icon as={PlusIcon} />}
          onClick={modalCreateRef.current?.onOpen}
        >
          Tambah Pengumuman
        </Button>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Skeleton isLoaded={!pengumumanQuery.isLoading}>
              <Heading size="sm">Pengumuman</Heading>
            </Skeleton>
          </Flex>
        </CardHeader>
        <Divider />
        {pengumumanQuery.isLoading && <Progress size="xs" isIndeterminate />}
        <CardBody>
          <TableContainer p="0" pb="5">
            <Table>
              <Thead>
                <Tr>
                  <Th>Gambar</Th>
                  <Th>Tgl Upload</Th>
                  <Th>Aktif</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(pengumuman || []).map((item: TPengumuman) => (
                  <TableRow key={item.id} item={item} refetchFn={refetchFn} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Skeleton w="full" isLoaded={true}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>

      <ModalCreatePengumuman ref={modalCreateRef} refetchFn={refetchFn} />
    </Stack>
  );
}
