import {
  Button,
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

import { useDeleteMutasiMurobahah } from "@/services/api/commands/murobahah.command";

type Props = {
  id: number;
  idMutasi: number;
  refetchFn?: () => void;

};
const ModalConfirmDelete = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const mutasiMurobahahQuery = useDeleteMutasiMurobahah(props.id, props.idMutasi).mutate("DELETE");
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
          formCallback.onSuccess("Berhasil menghapus anggota");
          disclosure.onClose();
          props.refetchFn?.();
        },
        onError: () => {
          formCallback.onError("Gagal menghapus anggota");
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
          <Button onClick={disclosure.onClose} variant="ghost">
            Batalkan
          </Button>
          <Button colorScheme="red" variant="ghost" onClick={submitHandler} isLoading={mutasiMurobahahQuery.isLoading}>
            Ya, Hapus data
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
})


export default ModalConfirmDelete;

ModalConfirmDelete.displayName = "ModalConfirmDelete";