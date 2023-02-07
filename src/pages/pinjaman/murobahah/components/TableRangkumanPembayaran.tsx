import { Td, Tr } from "@chakra-ui/react";

import toIDR from "@/services/utils/toIDR";


type Props = {
  item: any;
};
export default function TableRangkumanPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.ket}</Td>
      <Td>{toIDR(props.item.cicilan)}</Td>
      <Td>{toIDR(props.item.margin)}</Td>
      <Td>{toIDR(props.item.total)}</Td>
    </Tr>
  );
}
