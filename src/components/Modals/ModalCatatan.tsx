import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {
  isOpen: any;
  onClose: any;
  item: any;
};
export default function ModalCatatan(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Catatan Pembayaran</ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tanggal Bayar</Th>
                  <Th>Cicilan</Th>
                  <Th>Margin</Th>
                  <Th>Total</Th>
                  <Th>Tenor Bayar</Th>
                  <Th>Bulan Tidak Sesuai</Th>
                  <Th>Catatan</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>{props.item}</Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
