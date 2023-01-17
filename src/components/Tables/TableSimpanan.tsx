import {
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
  nama: any,
  id: any,
  alamat: any,
  totSimpanan: any,
  key: any,
  href: any
}
export default function TableSimpananAnggota(props: Props) {
  return (
    <Tr>
      <Td>{props.nama}</Td>
      <Td>{props.id}</Td>
      <Td>{props.alamat}</Td>
      <Td>{props.totSimpanan}</Td>
      <Td>
        <Link href={props.href} >
          <Tooltip hasArrow label='lihat mutasi' fontSize='xs'>
            <EyeIcon width='20px' color="teal" />
          </Tooltip>
        </Link>
      </Td>
    </Tr>
  )
}

