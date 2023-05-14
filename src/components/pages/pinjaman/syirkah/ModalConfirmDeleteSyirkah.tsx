import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

import { useFormCallback } from "@/hooks/useFormCallback";

import { useDeleteSyirkah } from "@/services/api/commands/syirkah.command";

type Props = {
  id: number;
  refetchFn?: () => void;
};
const ModalConfirmDeleteSyirkah = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const deleteSyirkahQuery = useDeleteSyirkah(props.id).mutate("DELETE");
  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const submitHandler = () => {
    deleteSyirkahQuery.mutate(
      {},
      {
        onSuccess: () => {
          formCallback.onSuccess("Berhasil menghapus Syirkah");
          disclosure.onClose();
          props.refetchFn?.();
        },
        onError: () => {
          formCallback.onError("Gagal menghapus Syirkah");
          disclosure.onClose();
        },
      }
    );
  };
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apakah Anda Yakin ?</ModalHeader>
        <ModalBody>
          <Text>Anda akan menghapus data secara permanen</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="3">
            <Button
              onClick={disclosure.onClose}
              variant="outline"
              colorScheme="blackAlpha"
            >
              Batal
            </Button>
            <Button
              colorScheme="red"
              onClick={submitHandler}
              isLoading={deleteSyirkahQuery.isLoading}
            >
              Hapus
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalConfirmDeleteSyirkah;

ModalConfirmDeleteSyirkah.displayName = "ModalConfirmDeleteSyirkah";
