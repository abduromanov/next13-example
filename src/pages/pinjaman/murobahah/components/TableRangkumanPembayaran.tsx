import {
  Td,
  Tr
} from '@chakra-ui/react'




type Props = {
  item: any,
}
export default function TableRangkumanPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.ket}</Td>
      <Td>{props.item.cicilan}</Td>
      <Td>{props.item.margin}</Td>
      <Td>{props.item.total}</Td>
    </Tr>
  )
}

