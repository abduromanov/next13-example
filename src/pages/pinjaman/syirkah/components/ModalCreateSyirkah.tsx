import { Alert, AlertIcon, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import validators from "@/services/utils/validators";
import { useAnggota } from "@/services/api/commands/anggota.command";

const ModalCreateSyirkah = forwardRef<Partial<ReturnType<typeof useDisclosure>> | undefined, any>((props, ref) => {
  const disclosure = useDisclosure();
  const form = useForm();

  useImperativeHandle(ref, () => ({
    onOpen: disclosure.onOpen
  }), [disclosure.onOpen])

  const listAnggotaQuery = useAnggota(['syirkah']).query();

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Anggota</ModalHeader>
        <ModalCloseButton />

        <ModalBody mb="5">
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data tidak dapat dirubah ataupun dihapus!
            </Alert>
            {/* <InputText
              label="ID Anggota"
              errors={form.formState.errors.idAnggota}
              register={{
                ...form.register("idAnggota", { ...validators().required() }),
              }}
            /> */}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button
            // isLoading={anggotaMutation.isLoading}
            // onClick={form.handleSubmit(submitHandler)}
            >
              Simpan
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalCreateSyirkah;

ModalCreateSyirkah.displayName = "ModalCreateSyirkah";