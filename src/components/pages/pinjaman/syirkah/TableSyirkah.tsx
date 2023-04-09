import { Flex, Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

import { TSyirkah, TSyirkahRelations } from "@/types";

type Props = {
  item: TSyirkah & TSyirkahRelations;
  showRoute: string;
  canDelete?: boolean;
};

export default function TableSyirkah(props: Props) {
  const tglMulai = useMemo(
    () =>
      props.item.tglMulai
        ? moment(props.item.tglMulai).format("DD MMMM YYYY")
        : "",
    [props.item.tglMulai]
  );
  const tglSelesai = useMemo(
    () =>
      props.item.tglSelesai
        ? moment(props.item.tglSelesai).format("DD MMMM YYYY")
        : "",
    [props.item.tglSelesai]
  );

  return (
    <Tr>
      <Td>{props.item.namaBc}</Td>
      <Td>{props.item.anggota.nama}</Td>
      <Td>{props.item.anggota.idAnggota}</Td>
      <Td textAlign="right">{toIDR(props.item.modalAwal)}</Td>
      <Td textAlign="right">{toIDR(props.item.modalHamasah)}</Td>
      <Td>{tglMulai}</Td>
      <Td>{tglSelesai}</Td>
      <Td>
        <Flex gap={3}>
          <Link href={props.showRoute}>
            <Tooltip hasArrow label="Lihat Detail" fontSize="xs">
              <Icon as={EyeIcon} color="teal" />
            </Tooltip>
          </Link>
          {props.canDelete && (
            <Link href={`/admin/pinjaman/syirkah/${props.item.id}`}>
              <Tooltip hasArrow label="Hapus" fontSize="xs">
                <Icon as={TrashIcon} color="red" />
              </Tooltip>
            </Link>
          )}
        </Flex>
      </Td>
    </Tr>
  );
}
