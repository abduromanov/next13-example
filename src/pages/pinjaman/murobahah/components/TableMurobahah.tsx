import {
  Button,
  Flex,
  Icon,
  IconButton,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  CheckIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

type Props = {
  item: any;
  modalHandler?: () => void
};

export default function TableMurobahah(props: Props) {
  const totalPinjaman = useMemo(() => toIDR(props.item.totalPinjaman), [props.item.totalPinjaman])
  const tglMulaiCicilan = useMemo(
    () => moment(props.item?.tglMulai).format("DD MMMM YYYY"),
    [props.item?.tglMulai]
  );
  const totalTerbayar = useMemo(() => props?.item?.totalTerbayar?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }), [props.item.totalTerbayar])

  return (
    <Tr>
      <Td>{props?.item?.anggota?.nama}</Td>
      <Td>{props?.item?.anggota?.idAnggota}</Td>
      <Td>{props?.item?.pembiayaan}</Td>
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
              <Icon as={EyeIcon} color="teal" boxSize={6} />
            </Tooltip>
          </Link>

          <Tooltip hasArrow label='hapus' fontSize='xs'>
            <IconButton variant="ghost" onClick={props.modalHandler} icon={<TrashIcon />} size="xs" color='red' aria-label="delete murobahah" />
          </Tooltip>
          {/* <Tooltip hasArrow label='hapus' fontSize='xs'>
              <Icon as={TrashIcon} color="red" boxSize={5} />
            </Tooltip>
          </IconButton> */}
        </Flex>
      </Td>
    </Tr>
  );
}
