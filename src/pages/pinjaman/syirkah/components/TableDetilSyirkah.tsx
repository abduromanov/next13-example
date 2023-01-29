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
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
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
        <Menu>
          <MenuButton as={IconButton} icon={<EllipsisVerticalIcon />} variant='outline' />
          <MenuList>
            <Link href={`/pinjaman/syirkah/${props.item.id}`}>
              <MenuItem><Icon as={PencilSquareIcon} />&nbsp;Edit Data</MenuItem>
            </Link>
            <Link href={`/pinjaman/syirkah/${props.item.id}`}>
              <MenuItem><Icon as={TrashIcon} color='red' />&nbsp;Hapus</MenuItem>
            </Link>
          </MenuList>
        </Menu >
      </Td >
    </Tr >
  )
}

