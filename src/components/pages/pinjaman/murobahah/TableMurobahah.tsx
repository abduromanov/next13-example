import {
  Button,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  CheckIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";
import { useMemo } from "react";

import toIDR from "@/services/utils/toIDR";

import { TMurobahah, TMurobahahRelations } from "@/types";

type Props = {
  item: TMurobahah &
    TMurobahahRelations & {
      totalTerbayar?: number;
    };
  modalHandler?: () => void;
  showRoute: string;
  canDelete?: boolean;
};

export default function TableMurobahah(props: Props) {
  const totalPinjaman = useMemo(
    () => toIDR(props?.item?.total),
    [props?.item?.total]
  );
  const tglMulaiCicilan = useMemo(
    () => moment(props?.item?.tglMulai).format("DD MMMM YYYY"),
    [props?.item?.tglMulai]
  );
  const totalTerbayar = useMemo(
    () => toIDR(props?.item?.totalTerbayar),
    [props?.item?.totalTerbayar]
  );

  return (
    <Tr>
      <Td>{props?.item?.anggota?.nama}</Td>
      <Td>{props?.item?.anggota?.idAnggota}</Td>
      <Td>{props?.item?.pembiayaan}</Td>
      <Td>{totalPinjaman}</Td>
      <Td>{totalTerbayar}</Td>
      <Td>{tglMulaiCicilan}</Td>
      <Td>
        <Tag
          colorScheme={props.item?.lunas ? "green" : "yellow"}
          rounded="md"
          variant="solid"
        >
          <TagLeftIcon
            boxSize="12px"
            as={props.item?.lunas ? CheckIcon : XMarkIcon}
          />
          <TagLabel>{props.item?.lunas ? "Lunas" : "Belum Lunas"}</TagLabel>
        </Tag>
      </Td>
      <Td>
        <Link href={props.showRoute}>
          <Button variant="link">
            <Tooltip hasArrow label="Lihat Detail">
              <Icon as={EyeIcon} color="teal" fontSize="lg" />
            </Tooltip>
          </Button>
        </Link>
        {props.canDelete && (
          <Button variant="link" onClick={props.modalHandler}>
            <Tooltip hasArrow label="Hapus Data">
              <Icon as={TrashIcon} color="red.600" fontSize="lg" />
            </Tooltip>
          </Button>
        )}
      </Td>
    </Tr>
  );
}
