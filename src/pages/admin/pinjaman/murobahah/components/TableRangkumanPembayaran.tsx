import { Td, Text, Tr } from "@chakra-ui/react";

import toIDR from "@/services/utils/toIDR";

type Props = {
  itemSelisih: any;
  itemTerbayar: any
};
export default function TableRangkumanPembayaran(props: Props) {
  return (
    <>
      <Tr>
        <Td>Tenor Terbayar</Td>
        <Td>{toIDR(props?.itemTerbayar?.cicilan)}</Td>
        <Td>{toIDR(props?.itemTerbayar?.margin)}</Td>
        <Td>{toIDR(props?.itemTerbayar?.total)}</Td>
      </Tr>
      <Tr>
        <Td>Sisa Cicilan</Td>
        <Td>
          <Text color="red">{toIDR(props?.itemSelisih?.sisaCicilan?.cicilan)}</Text>
        </Td>
        <Td>
          <Text color="red">{toIDR(props?.itemSelisih?.sisaCicilan?.margin)}</Text>
        </Td>
        <Td>
          <Text color="red">{toIDR(props?.itemSelisih?.sisaCicilan?.total)}</Text>
        </Td>
      </Tr>
      <Tr>
        <Td>Tenor</Td>
        <Td></Td>
        <Td></Td>
        <Td>
          <Text color="red">{props?.itemSelisih?.totalTenor}</Text>
        </Td>
      </Tr>
      <Tr>
        <Td>Bulan Tidak Sesuai</Td>
        <Td></Td>
        <Td></Td>
        <Td>
          <Text color="red">{props?.itemSelisih?.bulanTidakSesuai}</Text>
        </Td>
      </Tr>
    </>
  );
}
