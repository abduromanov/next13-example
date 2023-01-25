import {
  Button,
  Icon,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/24/outline'



type Props = {
  item: any,
  onOpen?: any
}
export default function TableCatatanPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.tglBayar}</Td>
      <Td>{props.item.cicilan}</Td>
      <Td>{props.item.margin}</Td>
      <Td>{props.item.total}</Td>
      <Td>{props.item.tenorBayar}</Td>
      <Td>{props.item.bulanTidakSesuai}</Td>
      <Td>{props.item.catatan}</Td>
      <Td><Button onClick={props.onOpen} variant='ghost'>
        <Tooltip hasArrow label='hapus data' fontSize='xs'>
          <Icon as={TrashIcon} color="red" boxSize={5} />
        </Tooltip>
      </Button>
      </Td>
    </Tr>
  )
}

