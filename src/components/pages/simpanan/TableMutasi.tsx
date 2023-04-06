import { Badge, Td, Tr } from "@chakra-ui/react";
import moment from "moment";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

import { TSimpanan } from "@/types";

type Props = {
  item: TSimpanan;
};

export default function TableMutasi(props: Props) {
  const tglDibuat = useMemo(
    () => moment(props.item?.tglTransaksi).format("DD MMMM YYYY"),
    [props.item?.tglTransaksi]
  );

  return (
    <Tr>
      <Td>{tglDibuat}</Td>
      <Td>
        <Badge colorScheme={props.item.nominal < 0 ? "red" : "green"}>
          {props.item.nominal < 0 ? "Kredit" : "Debit"}
        </Badge>
      </Td>
      <Td color={props.item.nominal < 0 ? "red" : "green"}>
        {toIDR(props.item.nominal)}
      </Td>
      <Td>{props.item.catatan}</Td>
      <Td textTransform="uppercase">{props.item.jenisTabungan}</Td>
    </Tr>
  );
}
