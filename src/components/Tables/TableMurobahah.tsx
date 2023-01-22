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
import { CheckIcon, DocumentTextIcon, EllipsisVerticalIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
  item: any,
}

const CekLunas = (lunas: boolean) => {
  if (lunas == true) {
    return <Icon as={CheckIcon} />
  }
  return <Icon as={XMarkIcon} />

}
export default function TableMurobahah(props: Props) {
  return (
    <Tr>
      <Td>{props.item.nama}</Td>
      <Td>{props.item.idanggota}</Td>
      <Td>{props.item.pembiayaan}</Td>
      <Td>{props.item.totPinjaman}</Td>
      <Td>{props.item.totTerbayar}</Td>
      <Td>{props.item.tglMulaiCicilan}</Td>
      <Td>{CekLunas(props.item.lunas)}</Td>
      <Td>
        <Menu>
          <MenuButton as={IconButton} icon={<EllipsisVerticalIcon />} variant='outline' />
          <MenuList>
            <Link href={`/pinjaman/murobahah/${props.item.id}`}>
              <MenuItem><Icon as={DocumentTextIcon} />&nbsp;Lihat Detail</MenuItem>
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

