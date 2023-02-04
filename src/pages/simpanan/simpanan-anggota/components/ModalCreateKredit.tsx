import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";

import {
  useCreateSimpanan,
  useSimpananSebelumnya,
} from "@/services/api/commands/simpanan.command";

interface KreditPayload {
  nominal: any;
  nominalWajib: number;
  nominalKhusus: number;
  nominalSukarela: number;
  idAnggota: string;
  saldo: number;
  jenisTabungan: string;
  catatan: string;
}
const ModalCreateKredit = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any
>((_, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<KreditPayload>();
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

  const saldoSebelumnyaQuery = useSimpananSebelumnya(Number(id)).query();
  const simpananMutation = useCreateSimpanan().mutate("POST");

  const submitHandler: SubmitHandler<KreditPayload> = (value) => {
    const saldoSebelumnya = saldoSebelumnyaQuery.data?.data;
    const saldoWajib = saldoSebelumnya?.saldoWajib[0];
    const saldoKhusus = saldoSebelumnya?.saldoKhusus[0];
    const saldoSukarela = saldoSebelumnya?.saldoSukarela[0];

    value.nominal = parseInt(value.nominal.replace(/\D/g, ""), 10) * -1;
    value.idAnggota = String(id);

    if (value.jenisTabungan === "wajib") {
      value.saldo = saldoWajib + value.nominal;
    } else if (value.jenisTabungan === "khusus") {
      value.saldo = saldoKhusus + value.nominal;
    } else if (value.jenisTabungan === "sukarela") {
      value.saldo = saldoSukarela + value.nominal;
    }

    // console.log(value)
    simpananMutation.mutate(value, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan data simpanan");
        form.reset();
        disclosure.onClose();
      },
      onError() {
        formCallback.onError(
          "Gagal menambahkan data! Pastikan semua data terisi dengan benar"
        );
      },
    });
  };
  const watchField = form.watch(["nominal"]);
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Transaksi Tabungan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data
              tidak dapat dirubah ataupun dihapus !
            </Alert>
            <HStack gap={3} flexWrap="wrap">
              <Box>
                {watchField && (
                  <InputText
                    label="Nominal"
                    onChange={(e) => {
                      form.setValue(
                        "nominal",
                        e.currentTarget.value &&
                          parseInt(
                            e.currentTarget.value.replace(/\D/g, ""),
                            10
                          ).toLocaleString("id-ID")
                      );
                    }}
                    value={form.getValues("nominal")}
                    register={"nominal"}
                  />
                )}
              </Box>
              <VStack alignItems="start">
                <Text>Jenis Simpanan</Text>
                <Select
                  placeholder="pilih jenis simpanan"
                  onChange={(e) =>
                    form.setValue("jenisTabungan", e.target.value)
                  }
                >
                  <option value="khusus">Simpanan Khusus</option>
                  <option value="sukarela">Simpanan Sukarela</option>
                </Select>
              </VStack>
            </HStack>
            <Text>Catatan</Text>
            <Textarea
              placeholder="masukkan Catatan"
              onChange={(e) => form.setValue("catatan", e.target.value)}
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
