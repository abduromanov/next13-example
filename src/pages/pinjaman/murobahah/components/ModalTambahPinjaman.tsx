import { Alert, AlertIcon, Box, Button, Flex, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import moment from "moment";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";

import { TMurobahahRequest, TMutasiMurobahahRequest, useCreateMurobahah, useCreateMutasiMurobahah } from "@/services/api/commands/murobahah.command";



const ModalTambahPinjaman = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any>((_, ref) => {
    const disclosure = useDisclosure();
    const formCallback = useFormCallback();
    const router = useRouter();
    const { id } = router.query;
    const form = useForm<TMurobahahRequest>({
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

    const mutasiMurobahahMutation = useCreateMurobahah().mutate("POST");
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
          <ModalHeader>Tambah Murobahah</ModalHeader>

          {watchField &&
            <ModalBody>
              <Stack spacing={3}>
                <Alert status="warning">
                  <AlertIcon />
                  Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data tidak dapat dirubah ataupun dihapus !
                </Alert>
                <Box>
                  <Text>Pilih Anggota</Text>
                  <Select placeholder="pilih anggota">
                    <option>anggota 1</option>
                  </Select>
                </Box>

                <Flex gap={5}>
                  <Box w="254px">
                    {/* <Text mb={2}>Jumlah Pinjaman</Text>
                    <Input type='number' placeholder="Masukkan Jumlah Cicilan" onChange={(e) => {
                      form.setValue("cicilan", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                      calculateTotal();
                    }}
                      value={form.getValues("cicilan")} /> */}
                    <InputText label="Jumlah Pinjaman" register={"jumlahPinjaman"} />
                  </Box>
                  <Box w="254px">
                    {/* <Text mb={2}>Margin</Text>
                    <Input type='number' placeholder="Masukkan Jumlah Margin" onChange={(e) => {
                      form.setValue("margin", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                      calculateTotal();
                    }}
                    value={form.getValues("margin")} /> */}
                    <InputText label="Tenor" register={"tenor"} />
                    <Text fontSize="xs">* Minimal Tenor adalah 12 Bulan</Text>
                  </Box>
                </Flex>
                <Flex gap={5}>
                  <InputText type='number' register={"totalMargin"} label="Total Margin" />
                  <InputText type='number' register={"jumlahDP"} label="Jumlah DP" />
                </Flex>
                <Flex gap={5}>
                  <InputText type='date' register={"tglMulai"} label="Tanggal Mulai" />
                  <InputText type='date' register={"tglSelesai"} label="Tanggal Selesai " />
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

export default ModalTambahPinjaman;
ModalTambahPinjaman.displayName = "ModalTambahPinjaman";
