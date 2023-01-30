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

import { useFormCallback } from "@/hooks/useFormCallback";

import { useDeleteAnggota } from "@/services/api/commands/anggota.command";

type Props = {
  id: number;
  refetchFn?: () => void;
};

const ModalDeleteAnggota = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const anggotaQuery = useDeleteAnggota(props.id).mutate('DELETE');

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const submitHandler = () => {
    anggotaQuery.mutate({}, {
      onSuccess: () => {
        formCallback.onSuccess('Berhasil menghapus anggota');
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError: () => {
        formCallback.onError('Gagal menghapus anggota');
        disclosure.onClose();
      }
    })
  }

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
            <Button colorScheme="red" onClick={submitHandler} isLoading={anggotaQuery.isLoading}>
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
