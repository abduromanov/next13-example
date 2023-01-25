import {
  Button,
  Icon,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { EyeIcon } from '@heroicons/react/24/outline'



type Props = {
  item: any,
  onOpen?: any
}
export default function TableRincianPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.tahun}</Td>
      <Td>{props.item.bulan}</Td>
      <Td>{props.item.tenorTerbayar}</Td>
      <Td>{props.item.bulanTidakSesuai}</Td>
      <Td>{props.item.cicilan}</Td>
      <Td>{props.item.margin}</Td>
      <Td>{props.item.total}</Td>
      <Td>
        <Button onClick={props.onOpen} variant='ghost'>
          <Tooltip hasArrow label='detail' fontSize='xs'>
            <Icon as={EyeIcon} color="teal" boxSize={5} />
          </Tooltip>
        </Button>
      </Td>
    </Tr>
  )
}

