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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TMutasiSyirkahRequest,
  useCreateMutasiSyirkah,
} from "@/services/api/commands/syirkah.command";
import validators from "@/services/utils/validators";

type Props = {
  refetchFn?: () => void;
};

const ModalCreateMutasiSyirkah = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<TMutasiSyirkahRequest>();
  const formCallback = useFormCallback();
  const router = useRouter();

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const mutasiSyirkahMutation = useCreateMutasiSyirkah(
    router.query.id as string
  ).mutate("POST");

  const submitHandler = (values: TMutasiSyirkahRequest) => {
    mutasiSyirkahMutation.mutate(values, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan data");
        form.reset();
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError() {
        formCallback.onError("Gagal menambahkan data");
      },
    });
  };

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "2xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Data Pembayaran Syirkah</ModalHeader>
        <ModalCloseButton />

        <ModalBody mb="5">
          <Stack spacing={3}>
            <InputText
              register={{
                ...form.register("modalAwal", { ...validators().required() }),
              }}
              label="Modal Awal"
              onChange={(e) =>
                form.setValue(
                  "modalAwal",
                  !isNaN(parseInt(e.currentTarget.value))
                    ? parseInt(
                        e.currentTarget.value.replace(/\D/g, ""),
                        10
                      ).toLocaleString("id-ID")
                    : ""
                )
              }
              errors={form.formState.errors.modalAwal}
            />
            <InputText
              register={{
                ...form.register("modalHamasah", {
                  ...validators().required(),
                }),
              }}
              label="Modal Hamasah"
              onChange={(e) =>
                form.setValue(
                  "modalHamasah",
                  !isNaN(parseInt(e.currentTarget.value))
                    ? parseInt(
                        e.currentTarget.value.replace(/\D/g, ""),
                        10
                      ).toLocaleString("id-ID")
                    : ""
                )
              }
              errors={form.formState.errors.modalHamasah}
            />
            <Stack direction={["column", "row"]} spacing="3">
              <InputText
                register={{
                  ...form.register("bonusBersih", {
                    ...validators().required(),
                  }),
                }}
                label="Bonus Bersih"
                onChange={(e) =>
                  form.setValue(
                    "bonusBersih",
                    !isNaN(parseInt(e.currentTarget.value))
                      ? parseInt(
                          e.currentTarget.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                      : ""
                  )
                }
                errors={form.formState.errors.bonusBersih}
              />
              <InputText
                register={{
                  ...form.register("presentaseBonus", {
                    ...validators().required(),
                  }),
                }}
                label="Presentase Bagi Hasil"
                errors={form.formState.errors.presentaseBonus}
                type="number"
              />
            </Stack>
            <Stack direction={["column", "row"]} spacing="3">
              <InputText
                register={{
                  ...form.register("bagiHasil", { ...validators().required() }),
                }}
                label="Bagi Hasil"
                onChange={(e) =>
                  form.setValue(
                    "bagiHasil",
                    !isNaN(parseInt(e.currentTarget.value))
                      ? parseInt(
                          e.currentTarget.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                      : ""
                  )
                }
                errors={form.formState.errors.bagiHasil}
              />
              <InputText
                register={{
                  ...form.register("tglBayar", { ...validators().required() }),
                }}
                label="Tgl. Bayar"
                errors={form.formState.errors.tglBayar}
                type="date"
              />
            </Stack>
            <InputTextarea
              register={{ ...form.register("catatan") }}
              label="Catatan"
              errors={form.formState.errors.catatan}
              rows={5}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button
              isLoading={mutasiSyirkahMutation.isLoading}
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

export default ModalCreateMutasiSyirkah;

ModalCreateMutasiSyirkah.displayName = "ModalCreateMutasiSyirkah";
