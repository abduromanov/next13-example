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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

import { useFormCallback } from "@/hooks/useFormCallback";

import { useDeleteMutasiMurobahah } from "@/services/api/commands/murobahah.command";

type Props = {
  id: number;
  idMutasi: number;
  refetchFn?: () => void;
};

const ModalConfirmDeleteMutasi = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const mutasiMurobahahQuery = useDeleteMutasiMurobahah(
    props.id,
    props.idMutasi
  ).mutate("DELETE");

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const submitHandler = () => {
    mutasiMurobahahQuery.mutate(
      {},
      {
        onSuccess: () => {
          formCallback.onSuccess("Berhasil menghapus mutasi murobahah");
          disclosure.onClose();
          props.refetchFn?.();
        },
        onError: () => {
          formCallback.onError("Gagal menghapus mutasi murobahah");
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
        <ModalCloseButton />
        <ModalBody>
          <Text>Anda akan menghapus data ini secara permanen</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={disclosure.onClose} variant='outline' colorScheme="blackAlpha">
              Batal
            </Button>
            <Button
              colorScheme="red"
              onClick={submitHandler}
              isLoading={mutasiMurobahahQuery.isLoading}
            >
              Hapus
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalConfirmDeleteMutasi;

ModalConfirmDeleteMutasi.displayName = "ModalConfirmDeleteMutasi";
