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
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputSelect } from "@/components/Forms/InputSelect";
import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TSimpananKreditRequest,
  useCreateSimpanan,
} from "@/services/api/commands/simpanan.command";
import validators from "@/services/utils/validators";

type Props = {
  refetchFn?: () => void;
};
const ModalCreateKredit = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<TSimpananKreditRequest>();
  const formCallback = useFormCallback();
  const router = useRouter();
  const { id } = router.query;

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const simpananMutation = useCreateSimpanan(Number(id)).mutate("POST");

  const submitHandler: SubmitHandler<TSimpananKreditRequest> = (value) => {
    value.idAnggota = String(id);
    // console.log(value)
    simpananMutation.mutate(value, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan data simpanan");
        form.reset();
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError() {
        formCallback.onError(
          "Gagal menambahkan data! Pastikan semua data terisi dengan benar"
        );
      },
    });
  };
  form.watch(["nominal"]);
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Data Kredit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data
              tidak dapat dirubah ataupun dihapus !
            </Alert>
            <InputSelect
              label="Jenis Tabungan"
              register={{
                ...form.register("jenisTabungan", {
                  ...validators().required(),
                }),
              }}
              errors={form.formState.errors.jenisTabungan}
            >
              <option value="" disabled hidden selected>
                Pilih Jenis Simpanan
              </option>
              <option value="khusus">Simpanan Khusus</option>
              <option value="sukarela">Simpanan Sukarela</option>
            </InputSelect>

            <InputText
              label="Nominal"
              value={form.getValues("nominal")}
              register={{
                ...form.register("nominal", { ...validators().required() }),
                onChange: (e) => {
                  form.setValue(
                    "nominal",
                    e.target.value &&
                    parseInt(
                      e.target.value.replace(/\D/g, ""),
                      10
                    ).toLocaleString("id-ID")
                  );

                  return e.target.value;
                },
              }}
              errors={form.formState.errors.nominal as FieldError}
            />

            <InputTextarea
              label="Catatan"
              placeholder="Masukkan Catatan"
              register={{ ...form.register("catatan") }}
            />
          </Stack>
        </ModalBody>
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

export default ModalCreateKredit;
ModalCreateKredit.displayName = "ModalCreateKredit";
