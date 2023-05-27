import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";

import {
  TMutasiMurobahahRequest,
  useCreateMutasiMurobahah,
} from "@/services/api/commands/murobahah.command";
import validators from "@/services/utils/validators";

type Props = {
  refetchFn?: () => void;
};

const ModalTambahPembayaran = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const router = useRouter();
  const { id } = router.query;
  const form = useForm<TMutasiMurobahahRequest>({
    defaultValues: {
      tglBayar: "",
      catatan: "",
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );
  const calculateTotal = () => {
    form.setValue(
      "total",
      (
        parseInt((form.getValues("cicilan") || "0").replace(/\D/g, ""), 10) +
        parseInt((form.getValues("margin") || "0").replace(/\D/g, ""), 10)
      ).toLocaleString("id-ID")
    );
  };

  const mutasiMurobahahMutation = useCreateMutasiMurobahah(Number(id)).mutate(
    "POST"
  );

  const submitHandler: SubmitHandler<TMutasiMurobahahRequest> = (values) => {
    values.murobahah = id as string;
    values.isBulat = false;

    mutasiMurobahahMutation.mutate(values, {
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
  form.watch(["cicilan", "margin", "total"]);
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Pembayaran Murobahah</ModalHeader>

        <ModalBody>
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data
              tidak dapat dirubah ataupun dihapus !
            </Alert>
            <InputText
              type="date"
              register={{
                ...form.register("tglBayar", { ...validators().required() }),
              }}
              label="Tanggal Bayar"
              errors={form.formState.errors.tglBayar}
            />
            <Flex gap={5}>
              <InputText
                label="Cicilan"
                value={form.getValues("cicilan")}
                errors={form.formState.errors.cicilan}
                register={{
                  ...form.register("cicilan", { ...validators().required() }),
                  onChange: (e) => {
                    form.setValue(
                      "cicilan",
                      !isNaN(parseInt(e.target.value))
                        ? parseInt(
                            e.target.value.replace(/\D/g, ""),
                            10
                          ).toLocaleString("id-ID")
                        : ""
                    );
                    calculateTotal();
                    return e.target.value;
                  },
                }}
              />
              <InputText
                label="Margin"
                value={form.getValues("margin")}
                errors={form.formState.errors.margin}
                register={{
                  ...form.register("margin", { ...validators().required() }),
                  onChange: (e) => {
                    form.setValue(
                      "margin",
                      !isNaN(parseInt(e.target.value))
                        ? parseInt(
                            e.target.value.replace(/\D/g, ""),
                            10
                          ).toLocaleString("id-ID")
                        : ""
                    );
                    calculateTotal();
                    return e.target.value;
                  },
                }}
              />
            </Flex>
            <InputText
              register={{ ...form.register("total") }}
              label="Total"
              isReadOnly
            />
            <Flex gap={5}>
              <InputText
                type="number"
                register={{ ...form.register("tenorTerbayar") }}
                label="Tenor Terbayar"
                placeholder="Masukkan Tenor Terbayar"
              />
              <InputText
                type="number"
                register={{ ...form.register("bulanTidakSesuai") }}
                label="bulan tidak sesuai"
                placeholder="Masukkan Bulan Tidak Sesuai"
              />
            </Flex>
            <Box>
              <Text>Catatan</Text>
              <Textarea
                placeholder="Masukkan Catatan"
                onChange={(e) => form.setValue("catatan", e.target.value)}
              />
            </Box>
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

export default ModalTambahPembayaran;
ModalTambahPembayaran.displayName = "ModalTambahPembayaran";
