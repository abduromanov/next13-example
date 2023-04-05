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
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

type Props = {
  isOpen?: any;
  onClose?: any;
  item?: any;
};
const ModalCatatan = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size="6xl">
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
});

export default ModalCatatan;

ModalCatatan.displayName = "ModalCatatan";
