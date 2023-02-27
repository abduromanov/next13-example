import { usePagination } from "@ajna/pagination";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useEffect, useMemo, useRef, useState } from "react";

import TablePagination from "@/layouts/components/TablePagination";
import { useAnggota } from "@/services/api/commands/anggota.command";

import ModalCreateAnggota from "./components/ModalCreateAnggota";
import ModalDeleteAnggota from "./components/ModalDeleteAnggota";
import ModalEditAnggota from "./components/ModalEditAnggota";

import { TAnggota } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota: TAnggota;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "");

  return {
    props: {
      pageTitle: "Daftar Anggota",
      anggota: anggota,
    },
  };
};

const TableRow = (props: {
  item?: TAnggota;
  editHandler?: () => void;
  deleteHandler?: () => void;
}) => {
  const tglDibuat = useMemo(
    () => moment(props.item?.tglDibuat).format("DD MMMM YYYY"),
    [props.item?.tglDibuat]
  );

  return (
    <Tr>
      <Td>{props.item?.idAnggota}</Td>
      <Td>{props.item?.nama}</Td>
      <Td>{props.item?.alamat}</Td>
      <Td>{tglDibuat}</Td>
      <Td>
        <Button variant="link" onClick={props.editHandler}>
          <Tooltip hasArrow label="Ubah Anggota">
            <Icon as={PencilSquareIcon} color="brand.400" fontSize="lg" />
          </Tooltip>
        </Button>
        <Button variant="link" onClick={props.deleteHandler}>
          <Tooltip hasArrow label="Hapus Anggota">
            <Icon as={TrashIcon} color="red.600" fontSize="lg" />
          </Tooltip>
        </Button>
      </Td>
    </Tr>
  );
};

export default function Page() {
  const [total, setTotal] = useState<number>();
  const [idAnggota, setIdAnggota] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const modalCreateRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalEditRef = useRef<ReturnType<typeof useDisclosure>>();
  const modalDeleteRef = useRef<ReturnType<typeof useDisclosure>>();

  const pagination = usePagination({
    total: total,
    initialState: {
      currentPage: 1,
      pageSize: 10,
    },
  });

  const listAnggotaQuery = useAnggota().paginate({
    params: {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: searchTerm,
    },
  });

  const listAnggota = listAnggotaQuery.data?.data?.data;
  const metadata = listAnggotaQuery.data?.data?.meta;

  const refetchQuery = () => listAnggotaQuery.refetch();

  useEffect(() => {
    setTotal(metadata?.filter_count);
  }, [metadata]);

  return (
    <Stack spacing="8" px="8" pb="10">
      <Flex alignItems="center" justify="space-between">
        <Heading size="lg">Daftar Anggota</Heading>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          onClick={() => {
            modalCreateRef.current?.onOpen();
          }}
        >
          Tambah Anggota
        </Button>
      </Flex>
      <Card m={5} variant="outline" shadow="sm">
        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Skeleton isLoaded={!listAnggotaQuery.isLoading}>
              <Heading size="sm">
                Jumlah Anggota: {metadata?.filter_count}
              </Heading>
            </Skeleton>

            <InputGroup w="25%">
              <InputLeftElement pointerEvents="none">
                <Icon as={MagnifyingGlassIcon} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Cari berdasarkan nama / No. ID"
                focusBorderColor="brand.400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Flex>
        </CardHeader>
        <Divider />
        {listAnggotaQuery.isLoading && <Progress size="xs" isIndeterminate />}
        <CardBody>
          <TableContainer p="0" mb="5">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID Anggota</Th>
                  <Th>Nama Anggota</Th>
                  <Th>Alamat</Th>
                  <Th>Tgl Dibuat</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(listAnggota || []).map((item: TAnggota) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    editHandler={() => {
                      modalEditRef.current?.onOpen();
                      setIdAnggota(item.id);
                    }}
                    deleteHandler={() => {
                      modalDeleteRef.current?.onOpen();
                      setIdAnggota(item.id);
                    }}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Skeleton w="full" isLoaded={!listAnggotaQuery.isLoading}>
            <TablePagination pagination={pagination} />
          </Skeleton>
        </CardBody>
      </Card>

      <ModalCreateAnggota ref={modalCreateRef} />
      <ModalEditAnggota
        ref={modalEditRef}
        id={idAnggota || 0}
        refetchFn={refetchQuery}
      />
      <ModalDeleteAnggota
        ref={modalDeleteRef}
        id={idAnggota || 0}
        refetchFn={refetchQuery}
      />
    </Stack>
  );
}
