import { Td, Tr } from "@chakra-ui/react";

import { convertToIDR } from "../[id]";

type Props = {
  item: any;
};
export default function TableRangkumanPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.ket}</Td>
      <Td>{convertToIDR(props.item.cicilan)}</Td>
      <Td>{convertToIDR(props.item.margin)}</Td>
      <Td>{convertToIDR(props.item.total)}</Td>
    </Tr>
  );
}
