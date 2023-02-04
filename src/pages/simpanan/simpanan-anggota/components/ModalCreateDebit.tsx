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
  TSimpananRequest,
  useCreateSimpanan,
  useSimpananSebelumnya,
} from "@/services/api/commands/simpanan.command";
import validators from "@/services/utils/validators";

export type FormType = {
  nominal: string;
  nominalWajib: string;
  nominalKhusus: string;
  nominalSukarela: string;
  catatan: string;
  idAnggota: any;
  saldo: any;
  jenisTabungan: any;
};

const ModalCreateDebit = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any
>((_, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const form = useForm<FormType>();
  const router = useRouter();
  const { id } = router.query;

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );
  const handleChangeNominal = (nominal: number) => {
    const tempNominal = nominal;
    form.setValue(
      "nominal",
      isNaN(nominal) ? "" : tempNominal.toLocaleString("id-ID")
    );
    const wajib = nominal >= 100000 ? 100000 : 0;
    const sisaValue = nominal - wajib;
    const khusus = (sisaValue * 70) / 100;
    const sukarela = (sisaValue * 30) / 100;
    form.setValue(
      "nominalWajib",
      isNaN(wajib)
        ? ""
        : parseInt(`${wajib}`.replace(/\D/g, ""), 10).toLocaleString("id-ID")
    );
    form.setValue(
      "nominalKhusus",
      isNaN(khusus)
        ? ""
        : parseInt(`${khusus}`.replace(/\D/g, ""), 10).toLocaleString("id-ID")
    );
    form.setValue(
      "nominalSukarela",
      isNaN(sukarela)
        ? ""
        : parseInt(`${sukarela}`.replace(/\D/g, ""), 10).toLocaleString("id-ID")
    );
  };
  const watchFields = form.watch([
    "nominalWajib",
    "nominalKhusus",
    "nominalSukarela",
  ]);

  const saldoSebelumnyaQuery = useSimpananSebelumnya(Number(id)).query();
  const saldoSebelumnya = saldoSebelumnyaQuery.data?.data;
  const saldoWajib = saldoSebelumnya?.saldoWajib[0];
  const saldoKhusus = saldoSebelumnya?.saldoKhusus[0];
  const saldoSukarela = saldoSebelumnya?.saldoSukarela[0];

  const simpananMutation = useCreateSimpanan().mutate("POST");

  const submitHandler: SubmitHandler<TSimpananRequest & FormType> = (value) => {
    const catatan: any = value.catatan;

    const nominalWajib: any = value.nominalWajib;
    const nominalKhusus: any = value.nominalKhusus;
    const nominalSukarela: any = value.nominalSukarela;

    if (saldoSebelumnya === null) return;

    const listReq = [];
    if (nominalKhusus > 0) {
      listReq.push({
        idAnggota: id,
        nominal: parseInt(nominalKhusus.replace(/\D/g, ""), 10),
        saldo: parseInt(nominalKhusus.replace(/\D/g, ""), 10) + saldoKhusus,
        catatan: catatan,
        jenisTabungan: "khusus",
      });
    }
    if (nominalSukarela > 0) {
      listReq.push({
        idAnggota: id,
        nominal: parseInt(nominalSukarela.replace(/\D/g, ""), 10),
        saldo: parseInt(nominalSukarela.replace(/\D/g, ""), 10) + saldoSukarela,
        catatan: catatan,
        jenisTabungan: "sukarela",
      });
    }
    if (nominalWajib > 0) {
      listReq.push({
        idAnggota: id,
        nominal: parseInt(nominalWajib.replace(/\D/g, ""), 10),
        saldo: parseInt(nominalWajib.replace(/\D/g, ""), 10) + saldoWajib,
        catatan: catatan,
        jenisTabungan: "wajib",
      });
    }

    // console.log(listReq)

    simpananMutation.mutate(listReq, {
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
        {watchFields && (
          <ModalBody>
            <Stack spacing={3}>
              <Alert status="warning">
                <AlertIcon />
                Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data
                tidak dapat dirubah ataupun dihapus !
              </Alert>
              <InputText
                label="Nominal Simpanan"
                value={form.getValues("nominal")}
                onChange={(e) => {
                  const nominal = parseInt(
                    e.currentTarget.value.replace(/\D/g, ""),
                    10
                  );
                  handleChangeNominal(nominal);
                }}
                register={"nominal"}
              />
              <InputText
                label="Simpanan Wajib"
                name="nominalWajib"
                onChange={(e) =>
                  form.setValue(
                    "nominalWajib",
                    isNaN(
                      parseInt(e.currentTarget.value.replace(/\D/g, ""), 10)
                    ) || !e.currentTarget.value
                      ? "0"
                      : parseInt(
                          e.currentTarget.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  )
                }
                // value={form.getValues("nominalWajib")}
                register={{ ...form.register("nominalWajib") }}
              />

              <InputText
                label="Simpanan Khusus"
                onChange={(e) =>
                  form.setValue(
                    "nominalKhusus",
                    isNaN(
                      parseInt(e.currentTarget.value.replace(/\D/g, ""), 10)
                    ) || !e.currentTarget.value
                      ? "0"
                      : parseInt(
                          e.currentTarget.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  )
                }
                // value={form.getValues("nominalKhusus")}
                register={{ ...form.register("nominalKhusus") }}
              />
              <InputText
                label="Simpanan Sukarela"
                onChange={(e) =>
                  form.setValue(
                    "nominalSukarela",
                    isNaN(
                      parseInt(e.currentTarget.value.replace(/\D/g, ""), 10)
                    ) || !e.currentTarget.value
                      ? "0"
                      : parseInt(
                          e.currentTarget.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  )
                }
                // value={form.getValues("nominalSukarela")}
                register={{ ...form.register("nominalSukarela") }}
              />
              <Box>
                <Text fontWeight="bold">Keterangan</Text>
                <Textarea
                  placeholder="masukkan keterangan simpanan"
                  h="150px"
                  onChange={(e) => form.setValue("catatan", e.target.value)}
                />
              </Box>
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

export default ModalCreateDebit;

ModalCreateDebit.displayName = "ModalCreateDebit";
