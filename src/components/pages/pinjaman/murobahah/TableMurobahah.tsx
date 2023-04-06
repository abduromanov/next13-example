import { Button, Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
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
  modalHandler?: () => void;
};

export default function TableMurobahah(props: Props) {
  const totalPinjaman = useMemo(
    () => toIDR(props?.item?.total),
    [props?.item?.total]
  );
  const tglMulaiCicilan = useMemo(
    () => moment(props?.item?.tglMulai).format("DD MMMM YYYY"),
    [props?.item?.tglMulai]
  );
  const totalTerbayar = useMemo(
    () => toIDR(props?.item?.totalTerbayar),
    [props?.item?.totalTerbayar]
  );

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
        <Link href={`/admin/pinjaman/murobahah/${props.item.id}`}>
          <Button variant="link">
            <Tooltip hasArrow label="Lihat Detail">
              <Icon as={EyeIcon} color="teal" fontSize="lg" />
            </Tooltip>
          </Button>
        </Link>
        <Button variant="link" onClick={props.modalHandler}>
          <Tooltip hasArrow label="Hapus Data">
            <Icon as={TrashIcon} color="red.600" fontSize="lg" />
          </Tooltip>
        </Button>
      </Td>
    </Tr>
  );
}
