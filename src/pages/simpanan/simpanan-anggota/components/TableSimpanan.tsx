import { Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import toIDR from "@/services/utils/toIDR";

import { TAnggota } from "@/types";

type Props = {
  item: TAnggota;
};
export default function TableSimpananAnggota(props: Props) {
  return (
    <Tr>
      <Td>{props.item.idAnggota}</Td>
      <Td>{props.item.nama}</Td>
      <Td textAlign="right">{toIDR(props.item.totalSimpanan)}</Td>
      <Td textAlign="center">
        <Link
          href={{
            pathname: `/simpanan/simpanan-anggota/mutasi/${props.item.id}`,
            query: { nama: props.item.nama, idAnggota: props.item.idAnggota },
          }}
        >
          <Tooltip hasArrow label="lihat mutasi" fontSize="xs">
            <Icon as={EyeIcon} color="teal" boxSize={5} />
          </Tooltip>
        </Link>
      </Td>
    </Tr>
  );
}
