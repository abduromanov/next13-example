import {
  Td,
  Tr,
} from '@chakra-ui/react'


type Props = {
  tanggal: any,
  tipe: any,
  nominal: any,
  keterangan: any,
  key: any
}
export default function TableMutasi(props: Props) {
  return (
    <Tr>
      <Td>{props.tanggal}</Td>
      <Td>{props.tipe}</Td>
      <Td>{props.nominal}</Td>
      <Td>{props.keterangan}</Td>
    </Tr>

  )
}

