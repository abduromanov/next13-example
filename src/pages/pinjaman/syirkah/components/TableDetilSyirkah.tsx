import {
  Flex,
  Icon,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
  item: any,
}


export default function TableDetilSyirkah(props: Props) {
  return (
    <Tr>
      <Td>{props.item.tgl}</Td>
      <Td>{props.item.modAwal}</Td>
      <Td>{props.item.modHamasah}</Td>
      <Td>{props.item.bonBersih}</Td>
      <Td>{props.item.presentasiBagiHasil}</Td>
      <Td>{props.item.bagiHasilHamasah}</Td>
      <Td>{props.item.catatan}</Td>
      <Td>
        <Flex gap={3}>
          <Link href="#">
            <Tooltip hasArrow label='edit data' fontSize='xs'>
              <Icon as={PencilSquareIcon} color="teal" boxSize={5} />
            </Tooltip>
          </Link>
          <Link href="#">
            <Tooltip hasArrow label='hapus' fontSize='xs'>
              <Icon as={TrashIcon} color="red" boxSize={5} />
            </Tooltip>
          </Link>
        </Flex>
      </Td >
    </Tr >
  )
}

