import {
  Td,
  Tr,
} from '@chakra-ui/react'


type Props = {
  tanggal: any,
  tipe: any,
  nominal: any,
  keterangan: any
}
export default function TableComp(props: Props) {
  return (
    <Tr>
      <Td>{props.tanggal}</Td>
      <Td>{props.tipe}</Td>
      <Td isNumeric>{props.nominal}</Td>
      <Td>{props.keterangan}</Td>
    </Tr>

  )
}

