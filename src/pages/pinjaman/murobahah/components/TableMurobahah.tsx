import {
  Flex,
  Icon,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  CheckIcon,
  DocumentTextIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  item: any;
};

export default function TableMurobahah(props: Props) {
  const totalPinjaman = useMemo(() => props.item.totalPinjaman.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }), [props.item.totalPinjaman])
  const tglMulaiCicilan = useMemo(
    () => moment(props.item?.tglMulai).format("DD MMMM YYYY"),
    [props.item?.tglMulai]
  );
  const totalTerbayar = useMemo(() => props.item.totalTerbayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }), [props.item.totalTerbayar])

  return (
    <Tr>
      <Td>{props.item.anggota.nama}</Td>
      <Td>{props.item.anggota.idAnggota}</Td>
      <Td>{props.item.pembiayaan}</Td>
      <Td>{totalPinjaman}</Td>
      <Td>{totalTerbayar}</Td>
      <Td>{tglMulaiCicilan}</Td>
      <Td>
        {props.item.lunas ? <Icon as={CheckIcon} /> : <Icon as={XMarkIcon} />}
      </Td>
      <Td>
        <Flex gap={5}>
          <Link href={`/pinjaman/murobahah/${props.item.id}`}>
            <Tooltip hasArrow label='lihat detail' fontSize='xs'>
              <Icon as={DocumentTextIcon} color="teal" boxSize={5} />
            </Tooltip>
          </Link>
          <Link href={`/pinjaman/murobahah/${props.item.id}`}>
            <Tooltip hasArrow label='hapus' fontSize='xs'>
              <Icon as={TrashIcon} color="red" boxSize={5} />
            </Tooltip>
          </Link>
        </Flex>
      </Td>
    </Tr>
  );
}
