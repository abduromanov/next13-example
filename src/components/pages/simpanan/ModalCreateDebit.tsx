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
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import {
  TSimpananDebitRequest,
  useCreateSimpanan,
} from "@/services/api/commands/simpanan.command";
import validators from "@/services/utils/validators";

type Props = {
  refetchFn?: () => void;
};

const ModalCreateDebit = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const formCallback = useFormCallback();
  const form = useForm<TSimpananDebitRequest>();
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
    const investasi = Math.floor((sisaValue * 70) / 100);
    const sukarela = Math.floor((sisaValue * 30) / 100);
    form.setValue(
      "nominalWajib",
      isNaN(wajib)
        ? ""
        : parseInt(`${wajib}`.replace(/\D/g, ""), 10).toLocaleString("id-ID")
    );
    form.setValue(
      "nominalInvestasi",
      isNaN(investasi)
        ? ""
        : parseInt(`${investasi}`.replace(/\D/g, ""), 10).toLocaleString(
            "id-ID"
          )
    );
    form.setValue(
      "nominalSukarela",
      isNaN(sukarela)
        ? ""
        : parseInt(`${sukarela}`.replace(/\D/g, ""), 10).toLocaleString("id-ID")
    );
  };
  form.watch([
    "nominal",
    "nominalWajib",
    "nominalInvestasi",
    "nominalSukarela",
  ]);

  const simpananMutation = useCreateSimpanan(Number(id)).mutate("POST");

  const submitHandler: SubmitHandler<TSimpananDebitRequest> = (value) => {
    const nominalWajib: any = parseInt(
      value.nominalWajib.replace(/\D/g, ""),
      10
    );
    const nominalInvestasi: any = parseInt(
      value.nominalInvestasi.replace(/\D/g, ""),
      10
    );
    const nominalSukarela: any = parseInt(
      value.nominalSukarela.replace(/\D/g, ""),
      10
    );

    const listReq = [];

    if (nominalSukarela > 0) {
      listReq.push({
        idAnggota: String(id),
        nominal: value.nominalSukarela,
        saldo: value.nominalSukarela,
        catatan: value.catatan,
        jenisTabungan: "sukarela",
        tglTransaksi: value.tglTransaksi,
      });
    }
    if (nominalWajib > 0) {
      listReq.push({
        idAnggota: String(id),
        nominal: value.nominalWajib,
        saldo: value.nominalWajib,
        catatan: value.catatan,
        jenisTabungan: "wajib",
        tglTransaksi: value.tglTransaksi,
      });
    }
    if (nominalInvestasi > 0) {
      listReq.push({
        idAnggota: String(id),
        nominal: value.nominalInvestasi,
        saldo: value.nominalInvestasi,
        catatan: value.catatan,
        jenisTabungan: "investasi",
        tglTransaksi: value.tglTransaksi,
      });
    }

    simpananMutation.mutate(listReq, {
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

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Data Debit</ModalHeader>
        <ModalCloseButton />

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
              register={{
                ...form.register("nominal", { ...validators().required() }),
                onChange: (e) => {
                  const nominal = parseInt(
                    e.target.value.replace(/\D/g, ""),
                    10
                  );
                  handleChangeNominal(nominal);
                  return e.target.value;
                },
              }}
              errors={form.formState.errors.nominal}
            />
            <InputText
              label="Simpanan Wajib"
              name="nominalWajib"
              register={{
                ...form.register("nominalWajib"),
                onChange: (e) => {
                  form.setValue(
                    "nominalWajib",
                    isNaN(parseInt(e.target.value.replace(/\D/g, ""), 10)) ||
                      !e.target.value
                      ? "0"
                      : parseInt(
                          e.target.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  );
                  return e.target.value;
                },
              }}
            />

            <InputText
              label="Simpanan Investasi"
              register={{
                ...form.register("nominalInvestasi"),
                onChange: (e) => {
                  form.setValue(
                    "nominalInvestasi",
                    isNaN(parseInt(e.target.value.replace(/\D/g, ""), 10)) ||
                      !e.target.value
                      ? "0"
                      : parseInt(
                          e.target.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  );
                  return e.target.value;
                },
              }}
            />
            <InputText
              label="Simpanan Sukarela"
              register={{
                ...form.register("nominalSukarela"),
                onChange: (e) => {
                  form.setValue(
                    "nominalSukarela",
                    isNaN(parseInt(e.target.value.replace(/\D/g, ""), 10)) ||
                      !e.target.value
                      ? "0"
                      : parseInt(
                          e.target.value.replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")
                  );
                  return e.target.value;
                },
              }}
            />
            <InputText
              type="date"
              register={{
                ...form.register("tglTransaksi"),
              }}
              label="Tanggal Transaksi"
            />
            <InputTextarea
              label="Keterangan"
              placeholder="masukkan keterangan simpanan"
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

export default ModalCreateDebit;

ModalCreateDebit.displayName = "ModalCreateDebit";
