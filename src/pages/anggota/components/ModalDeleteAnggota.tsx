import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

type Props = {
  id?: number;
};

const ModalDeleteAnggota = forwardRef<
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
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hapus Anggota</ModalHeader>
        <ModalCloseButton />

        <ModalBody>Anda yakin ingin menghapus data?</ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button
              variant="outline"
              colorScheme="blackAlpha"
              onClick={disclosure.onClose}
            >
              Batal
            </Button>
            <Button colorScheme="red" onClick={undefined}>
              Hapus
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalDeleteAnggota;

ModalDeleteAnggota.displayName = "ModalDeleteAnggota";
