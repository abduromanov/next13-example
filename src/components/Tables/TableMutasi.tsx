import { Badge, Td, Tr } from "@chakra-ui/react";

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
  return (
    <Tr>
      <Td>{props.item.tanggal}</Td>
      <Td>{BadgeTipe(props.item.tipe)}</Td>
      <Td>{props.item.nominal}</Td>
      <Td>{props.item.keterangan}</Td>
    </Tr>
  );
}
