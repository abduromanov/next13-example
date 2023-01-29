import {
  Icon,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
  item: any,
}
export default function TableSimpananAnggota(props: Props) {
  return (
    <Tr>
      <Td>{props.item.nama}</Td>
      <Td>{props.item.id}</Td>
      <Td>{props.item.alamat}</Td>
      <Td>{props.item.mutasiTabungan.map((v: any) => v.saldo).reduce((partialSum: number, a: number) => partialSum + a, 0).toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}</Td>
      <Td>
        <Link href={`/simpanan/simpanan-anggota/mutasi/${props.item.id}`} >
          <Tooltip hasArrow label='lihat mutasi' fontSize='xs'>
            <Icon as={EyeIcon} color="teal" boxSize={5} />
          </Tooltip>
        </Link>
      </Td>
    </Tr>
  )
}

