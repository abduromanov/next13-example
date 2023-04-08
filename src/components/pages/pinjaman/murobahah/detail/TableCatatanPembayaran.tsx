import { Button, Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

import { TMutasiMurobahah } from "@/types";

export default function TableCatatanPembayaran(props: {
  modalHandler?: () => void;
  item: TMutasiMurobahah;
  canDelete?: boolean
}) {
  const tglBayar = useMemo(
    () => moment(props.item?.tglBayar).format("DD MMMM YYYY"),
    [props.item?.tglBayar]
  );
  return (
    <Tr>
      <Td>{tglBayar}</Td>
      <Td>{toIDR(props.item.cicilan)}</Td>
      <Td>{toIDR(props.item.margin)}</Td>
      <Td>{toIDR(props.item.total)}</Td>
      <Td>{props.item.tenorTerbayar}</Td>
      <Td>{props.item.bulanTidakSesuai}</Td>
      <Td>{props.item.catatan}</Td>
      {props.canDelete && (
        <Td>
          <Button onClick={props.modalHandler} variant="link">
            <Tooltip hasArrow label="hapus data" fontSize="xs">
              <Icon as={TrashIcon} color="red" />
            </Tooltip>
          </Button>
        </Td>
      )}
    </Tr>
  );
}
