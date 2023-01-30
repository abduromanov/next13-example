import {
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { DocumentTextIcon, EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
  item: any,
}


export default function TableSyirkah(props: Props) {
  return (
    <Tr>
      <Td>{props.item.namaBC}</Td>
      <Td>{props.item.namaAnggota}</Td>
      <Td>{props.item.idAnggota}</Td>
      <Td>{props.item.modalAwal}</Td>
      <Td>{props.item.modalHamasah}</Td>
      <Td>{props.item.tglMulai}</Td>
      <Td>{props.item.tglSelesai}</Td>
      <Td>
        <Flex gap={3}>
          <Link href={`/pinjaman/syirkah/${props.item.id}`}>
            <Tooltip hasArrow label='lihat detail' fontSize='xs'>
              <Icon as={DocumentTextIcon} color="teal" boxSize={5} />
            </Tooltip>
          </Link>
          <Link href={`/pinjaman/syirkah/${props.item.id}`}>
            <Tooltip hasArrow label='hapus' fontSize='xs'>
              <Icon as={TrashIcon} color="red" boxSize={5} />
            </Tooltip>
          </Link>
        </Flex>
      </Td>
    </Tr>
  )
}

