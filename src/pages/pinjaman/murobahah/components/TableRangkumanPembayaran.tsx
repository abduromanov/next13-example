import { Td, Text, Tr } from "@chakra-ui/react";

import toIDR from "@/services/utils/toIDR";

type Props = {
  item: any;
};
export default function TableRangkumanPembayaran(props: Props) {
  return (
    <>
      <Tr>
        <Td>Tenor Terbayar</Td>
        <Td>{toIDR(props?.item?.cicilan)}</Td>
        <Td>{toIDR(props?.item?.margin)}</Td>
        <Td>{toIDR(props?.item?.total)}</Td>
      </Tr>
      <Tr>
        <Td>Sisa Cicilan</Td>
        <Td><Text color="red">{toIDR(props?.item?.sisaCicilan?.cicilan)}</Text></Td>
        <Td><Text color="red">{toIDR(props?.item?.sisaCicilan?.margin)}</Text></Td>
        <Td><Text color="red">{toIDR(props?.item?.sisaCicilan?.total)}</Text></Td>
      </Tr>
      <Tr>
        <Td>Tenor</Td>
        <Td></Td>
        <Td></Td>
        <Td><Text color='red'>{props?.item?.totalTenor}</Text></Td>
      </Tr>
      <Tr>
        <Td>Bulan Tidak Sesuai</Td>
        <Td></Td>
        <Td></Td>
        <Td><Text color="red">{props?.item?.bulanTidakSesuai}</Text></Td>
      </Tr>
    </>

  );
}
