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
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TSimpananKreditRequest,
  useCreateSimpanan,
} from "@/services/api/commands/simpanan.command";
import validators from "@/services/utils/validators";


type Props = {
  refetchFn?: () => void;
}
const ModalCreateKredit = forwardRef<Partial<ReturnType<typeof useDisclosure>> | undefined, Props>((props, ref) => {
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

  // const saldoSebelumnyaQuery = useSimpananSebelumnya(Number(id)).query();
  // const saldoSebelumnya = saldoSebelumnyaQuery.data?.data?.data;
  // const saldoWajib = saldoSebelumnya?.saldoWajib[0];
  // const saldoKhusus = saldoSebelumnya?.saldoKhusus[0];
  // const saldoSukarela = saldoSebelumnya?.saldoSukarela[0];

  const simpananMutation = useCreateSimpanan(Number(id)).mutate("POST");

  const submitHandler: SubmitHandler<TSimpananKreditRequest> = (value) => {


    // value.nominal = parseInt(value.nominal.replace(/\D/g, ""), 10) * -1;
    // value.idAnggota = String(id);

    // if (value.jenisTabungan === "wajib") {
    //   value.saldo = saldoWajib + value.nominal;
    // } else if (value.jenisTabungan === "khusus") {
    //   value.saldo = saldoKhusus + value.nominal;
    // } else if (value.jenisTabungan === "sukarela") {
    //   value.saldo = saldoSukarela + value.nominal;
    // }

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
        <ModalHeader>Tambah Transaksi Tabungan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data
              tidak dapat dirubah ataupun dihapus !
            </Alert>
            <Box>
              <Text>Jenis Simpanan</Text>
              <Select
                placeholder="pilih jenis simpanan"
                isRequired
                onChange={(e) =>
                  form.setValue("jenisTabungan", e.target.value)
                }
              >
                <option value="khusus">Simpanan Khusus</option>
                <option value="sukarela">Simpanan Sukarela</option>
              </Select>
            </Box>

            <InputText
              label="Nominal"
              value={form.getValues("nominal")}
              register={{
                ...form.register("nominal", { ...validators().required() }), onChange: (e) => {
                  form.setValue(
                    "nominal",
                    e.target.value &&
                    parseInt(
                      e.target.value.replace(/\D/g, ""),
                      10
                    ).toLocaleString("id-ID")
                  );

                  return e.target.value;
                }
              }}
              errors={form.formState.errors.nominal as FieldError}
            />


            <InputTextarea
              label="Catatan"
              placeholder="masukkan Catatan"
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
ModalCreateKredit.displayName = "ModalCreateKredit"


