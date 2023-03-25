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
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";

import { useFormCallback } from "@/hooks/useFormCallback";

import { useDeleteMutasiSyirkah } from "@/services/api/commands/syirkah.command";

type Props = {
  idMutasi: number;
  refetchFn?: () => void;
};

const ModalDeleteMutasiSyirkah = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const router = useRouter();
  const mutasiSyirkahMutation = useDeleteMutasiSyirkah(
    router.query.id as string,
    props.idMutasi
  ).mutate("DELETE");

  const submitHandler = () => {
    mutasiSyirkahMutation.mutate(
      {},
      {
        onSuccess() {
          formCallback.onSuccess("Berhasil mengubah data");
          disclosure.onClose();
          props.refetchFn?.();
        },
        onError() {
          formCallback.onError("Gagal mengubah data");
        },
      }
    );
  };

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
            <Button
              colorScheme="red"
              onClick={submitHandler}
              isLoading={mutasiSyirkahMutation.isLoading}
            >
              Hapus
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalDeleteMutasiSyirkah;

ModalDeleteMutasiSyirkah.displayName = "ModalDeleteMutasiSyirkah";
