import { Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  item: any;
};
export default function TableSimpananAnggota(props: Props) {
  return (
    <Tr>
      <Td>{props.item.nama}</Td>
      <Td>{props.item.idAnggota}</Td>
      <Td>{props.item.alamat}</Td>
      <Td>
        {props.item.totalSimpanan.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </Td>
      <Td>
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
