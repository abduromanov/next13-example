import {
  Badge,
  Td,
  Tr,
} from '@chakra-ui/react'
import moment from 'moment'
import { useMemo } from 'react'


type Props = {
  item: any
}
const BadgeTipe = (tipe: any) => {
  if (tipe == 'debit') {
    return <Badge colorScheme='green'>{tipe}</Badge>
  } else {
    return <Badge colorScheme='purple'>{tipe}</Badge>
  }
}
export default function TableMutasi(props: Props) {
  const tglDibuat = useMemo(() => moment(props.item?.tglDibuat).format('DD MMMM YYYY'), [props.item?.tglDibuat])

  return (
    <Tr>
      <Td>{tglDibuat}</Td>
      <Td>{BadgeTipe(props.item.tipe)}</Td>
      <Td>{props.item.nominal}</Td>
      <Td>{props.item.catatan}</Td>
    </Tr>

  )
}

