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

import { useDeleteMutasi } from "@/services/api/commands/simpanan.command";

type Props = {
  id: number;
  refetchFn?: () => void;
};

const ModalDeleteMutasiSimpanan = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const mutasiQuery = useDeleteMutasi(props.id).mutate("DELETE");

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const submitHandler = () => {
    mutasiQuery.mutate(
      {},
      {
        onSuccess: () => {
          formCallback.onSuccess("Berhasil menghapus mutasi");
          disclosure.onClose();
          props.refetchFn?.();
        },
        onError: () => {
          formCallback.onError("Gagal menghapus mutasi");
          disclosure.onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hapus Mutasi</ModalHeader>
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
            <Button
              colorScheme="red"
              onClick={submitHandler}
              isLoading={mutasiQuery.isLoading}
            >
              Hapus
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

ModalDeleteMutasiSimpanan.displayName = "ModalDeleteMutasiSimpanan";

export default ModalDeleteMutasiSimpanan;
