import {
  Modal,
  ModalBody,
  ModalCloseButton,
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
import { forwardRef, ReactNode, useImperativeHandle } from "react";

type Props = {
  children: ReactNode;
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
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={["full", "6xl"]}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Catatan Pembayaran</ModalHeader>
        <ModalCloseButton />
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
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>{props.children}</Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default ModalCatatan;

ModalCatatan.displayName = "ModalCatatan";
