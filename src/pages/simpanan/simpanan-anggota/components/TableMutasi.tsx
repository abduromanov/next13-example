import { Badge, Td, Tr } from "@chakra-ui/react";
import moment from "moment";
import { useMemo } from "react";

import { convertToIDR } from "../mutasi/[id]";

type Props = {
  item: any;
};
const BadgeTipe = (tipe: any) => {
  if (tipe == "debit") {
    return <Badge colorScheme="green">{tipe}</Badge>;
  } else {
    return <Badge colorScheme="purple">{tipe}</Badge>;
  }
};
export default function TableMutasi(props: Props) {
  const tglDibuat = useMemo(
    () => moment(props.item?.tglDibuat).format("DD MMMM YYYY"),
    [props.item?.tglDibuat]
  );

  return (
    <Tr>
      <Td>{tglDibuat}</Td>
      <Td>{BadgeTipe(props.item.tipe)}</Td>
      <Td>{convertToIDR(props.item.nominal)}</Td>
      <Td>{convertToIDR(props.item.saldo)}</Td>
      <Td>{props.item.catatan}</Td>
      <Td>{props.item.jenisTabungan}</Td>
    </Tr>
  );
}
