import { Button, Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import moment from "moment";

import { convertToIDR } from "../[id]";

type Props = {
  item: any;
  modalHandler?: () => void;
};
export default function TableRincianPembayaran(props: Props) {
  return (
    <Tr>
      <Td>{props.item.tglBayar_year}</Td>
      <Td>{moment().month(props.item.tglBayar_month - 1).format('MMMM')}</Td>
      <Td>{props.item.sum.tenorTerbayar}</Td>
      <Td>{props.item.sum.bulanTidakSesuai}</Td>
      <Td>{convertToIDR(props.item.sum.cicilan)}</Td>
      <Td>{convertToIDR(props.item.sum.margin)}</Td>
      <Td>{convertToIDR(props.item.sum.total)}</Td>
      <Td>
        <Button onClick={props.modalHandler} variant="ghost">
          <Tooltip hasArrow label="detail" fontSize="xs">
            <Icon as={EyeIcon} color="teal" boxSize={5} />
          </Tooltip>
        </Button>
      </Td>
    </Tr>
  );
}
