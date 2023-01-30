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
  Progress,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import generator from "generate-password";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TAnggotaRequest,
  useAnggotaDetail,
  useUpdateAnggota,
} from "@/services/api/commands/anggota.command";
import validators from "@/services/utils/validators";

type Props = {
  id: number;
  refetchFn?: () => void;
};

const ModalEditAnggota = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const anggotaDetailQuery = useAnggotaDetail(props.id).query();
  const anggota = anggotaDetailQuery.data?.data?.data;

  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const form = useForm<TAnggotaRequest>({
    defaultValues: {
      nama: "",
      idAnggota: "",
      alamat: "",
      password: "",
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  useEffect(() => {
    form.setValue("nama", anggota?.nama || "");
    form.setValue("idAnggota", anggota?.idAnggota || "");
    form.setValue("alamat", anggota?.alamat || "");
  }, [anggota, form]);

  const anggotaMutation = useUpdateAnggota(props.id).mutate("PATCH");

  const submitHandler: SubmitHandler<TAnggotaRequest> = (values) => {
    anggotaMutation.mutate(values, {
      onSuccess() {
        formCallback.onSuccess("Berhasil mengubah anggota");
        form.reset();
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError() {
        formCallback.onError(
          "Gagal mengubah anggota! Pastikan semua data terisi dengan benar"
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

        {anggotaDetailQuery.isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <ModalBody mb="5">
            <Stack spacing={3}>
              <Alert status="warning">
                <AlertIcon />
                Pastikan data yang anda lengkap dan benar. ID Anggota tidak
                boleh sama dengan ID Anggota yang sudah ada.
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
                  placeholder={"Klik Ganti Password untuk mengganti password"}
                  register={{ ...form.register("password") }}
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
                    form.setValue(
                      "password",
                      generator.generate({ length: 10 })
                    )
                  }
                >
                  Ganti Password
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
        )}

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button onClick={form.handleSubmit(submitHandler)}>Simpan</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalEditAnggota;

ModalEditAnggota.displayName = "ModalEditAnggota";
