import { Alert, AlertIcon, Box, Button, Flex, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import moment from "moment";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";

import { TMutasiMurobahahRequest, useCreateMutasiMurobahah } from "@/services/api/commands/murobahah.command";

// type Props = {
//    refetchFn?: () => void;
// }

const ModalTambahPembayaran = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any>((_, ref) => {
    const disclosure = useDisclosure();
    const formCallback = useFormCallback();
    const router = useRouter();
    const { id } = router.query;
    const form = useForm<TMutasiMurobahahRequest>({
      defaultValues: {
        tglBayar: "",
        catatan: ""
      },
    })
    useImperativeHandle(
      ref,
      () => ({
        onOpen: disclosure.onOpen,
      }),
      [disclosure.onOpen]
    );
    const calculateTotal = () => {
      form.setValue('total', (parseInt((form.getValues('cicilan') || "0").replace(/\D/g, ''), 10) + parseInt((form.getValues('margin') || "0").replace(/\D/g, ''), 10)).toLocaleString('id-ID'));
    }

    const mutasiMurobahahMutation = useCreateMutasiMurobahah(Number(id)).mutate("POST");
    const submitHandler: SubmitHandler<TMutasiMurobahahRequest> = (values) => {
      values.tglBayar = moment(values.tglBayar).set({ h: moment().hour(), m: moment().minute(), s: moment().second() }).toISOString();
      values.cicilan = parseInt((values.cicilan as string)?.replace(/\D/g, ''), 10);
      values.margin = parseInt((values.margin as string)?.replace(/\D/g, ''), 10);
      values.total = parseInt((values.total as string)?.replace(/\D/g, ''), 10);
      values.murobahah = Number(id);
      values.tenorTerbayar = parseInt(values.tenorTerbayar);
      values.bulanTidakSesuai = parseInt(values.bulanTidakSesuai);
      values.isBulat = false;
      // console.log(values)
      mutasiMurobahahMutation.mutate(values, {
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
    }
    const watchField = form.watch(["cicilan", "margin", "total"])
    return (
      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={["full", "xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Pembayaran Murobahah</ModalHeader>

          {watchField &&
            <ModalBody>
              <Stack spacing={3}>
                <Alert status="warning">
                  <AlertIcon />
                  Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data tidak dapat dirubah ataupun dihapus !
                </Alert>
                <InputText type='date' register={{ ...form.register("tglBayar") }} label="Tanggal Bayar" />
                <Flex gap={5}>
                  <Box>
                    <Text mb={2}>Cicilan</Text>
                    <Input type='number' placeholder="Masukkan Jumlah Cicilan" onChange={(e) => {
                      form.setValue("cicilan", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                      calculateTotal();
                    }}
                      value={form.getValues("cicilan")} />
                  </Box>
                  <Box>
                    <Text mb={2}>Margin</Text>
                    <Input type='number' placeholder="Masukkan Jumlah Margin" onChange={(e) => {
                      form.setValue("margin", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                      calculateTotal();
                    }}
                      value={form.getValues("margin")} />
                  </Box>
                </Flex>
                <InputText type='number' register={{ ...form.register("total") }} label="Total" />
                <Flex gap={5}>
                  <InputText type='number' register={{ ...form.register("tenorTerbayar") }} label="Tenor Terbayar" placeholder="Masukkan Tenor Terbayar" />
                  <InputText type='number' register={{ ...form.register("bulanTidakSesuai") }} label="bulan tidak sesuai" placeholder="Masukkan Bulan Tidak Sesuai" />
                </Flex>
                <Box>
                  <Text>Catatan</Text>
                  <Textarea placeholder="masukkan Catatan" onChange={(e) => form.setValue('catatan', e.target.value)} />
                </Box>
              </Stack>
            </ModalBody>
          }

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
    )
  })

export default ModalTambahPembayaran;
ModalTambahPembayaran.displayName = "ModalTambahPembayaran";
