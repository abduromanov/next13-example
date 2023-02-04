import {
  Alert,
  AlertIcon,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import generator from "generate-password";
import { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TAnggotaRequest,
  useCreateAnggota,
} from "@/services/api/commands/anggota.command";
import validators from "@/services/utils/validators";

const ModalCreateAnggota = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any
>((_, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const form = useForm<TAnggotaRequest>({
    defaultValues: {
      nama: "",
      idAnggota: "",
      alamat: "",
      password: generator.generate({ length: 10 }),
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const anggotaMutation = useCreateAnggota().mutate("POST");

  const submitHandler: SubmitHandler<TAnggotaRequest> = (values) => {
    anggotaMutation.mutate(values, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan anggota");
        form.reset();
        disclosure.onClose();
      },
      onError() {
        formCallback.onError(
          "Gagal menambahkan anggota! Pastikan semua data terisi dengan benar"
        );
      },
    });
  };

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
              Pastikan data yang anda lengkap dan benar. ID Anggota tidak boleh
              sama dengan ID Anggota yang sudah ada.
            </Alert>
            <InputText
              label="ID Anggota"
              errors={form.formState.errors.idAnggota}
              register={{
                ...form.register("idAnggota", { ...validators().required() }),
              }}
            />
            <InputText
              label="Nama"
              errors={form.formState.errors.nama}
              register={{
                ...form.register("nama", { ...validators().required() }),
              }}
            />
            <InputTextarea
              label="Alamat"
              errors={form.formState.errors.alamat}
              register={{
                ...form.register("alamat", { ...validators().required() }),
              }}
            />
            <HStack alignItems="end">
              <InputText
                label="Password"
                errors={form.formState.errors.password}
                register={{
                  ...form.register("password", { ...validators().required() }),
                }}
                isDisabled
                cursor="not-allowed"
                _disabled={{
                  opacity: 1,
                }}
              />
              <Button
                colorScheme="blackAlpha"
                px="8"
                onClick={() =>
                  form.setValue("password", generator.generate({ length: 10 }))
                }
              >
                Ganti Password
              </Button>
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button
              isLoading={anggotaMutation.isLoading}
              onClick={form.handleSubmit(submitHandler)}
            >
              Simpan
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalCreateAnggota;

ModalCreateAnggota.displayName = "ModalCreateAnggota";
