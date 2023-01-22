import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
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
        <Menu>
          <MenuButton as={IconButton} icon={<EllipsisVerticalIcon />} variant='outline' />
          <MenuList>
            <Link href={`/pinjaman/murobahah/${props.item.id}`}>
              <MenuItem><Icon as={DocumentTextIcon} />&nbsp;Detail Syirkah</MenuItem>
            </Link>
            <Link href={`/pinjaman/murobahah/${props.item.id}`}>
              <MenuItem><Icon as={TrashIcon} color='red' />&nbsp;Hapus</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}

