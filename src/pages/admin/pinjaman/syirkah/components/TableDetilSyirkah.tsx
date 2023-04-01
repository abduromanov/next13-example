import { Button, Flex, Icon, Td, Tooltip, Tr } from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

import { TMutasiSyirkah } from "@/types";

type Props = {
  item: TMutasiSyirkah;
  editHandler?: () => void;
  deleteHandler?: () => void;
};

export default function TableDetilSyirkah(props: Props) {
  const tglBayar = useMemo(
    () => moment(props.item.tglBayar).format("DD MMMM YYYY"),
    [props.item.tglBayar]
  );

  return (
    <Tr>
      <Td>{tglBayar}</Td>
      <Td>{toIDR(props.item.modalAwal)}</Td>
      <Td>{toIDR(props.item.modalHamasah)}</Td>
      <Td>{toIDR(props.item.bonusBersih)}</Td>
      <Td>
        {props.item.presentaseBonus ? `${props.item.presentaseBonus}%` : "-"}
      </Td>
      <Td>{toIDR(props.item.bagiHasil)}</Td>
      <Td>{props.item.catatan}</Td>
      <Td>
        <Flex gap={3}>
          <Button variant="link" onClick={props.editHandler}>
            <Tooltip hasArrow label="Ubah Data" fontSize="xs">
              <Icon as={PencilSquareIcon} color="teal" fontSize="lg" />
            </Tooltip>
          </Button>
          <Button variant="link" onClick={props.deleteHandler}>
            <Tooltip hasArrow label="Hapus" fontSize="xs">
              <Icon as={TrashIcon} color="red" fontSize="lg" />
            </Tooltip>
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}
