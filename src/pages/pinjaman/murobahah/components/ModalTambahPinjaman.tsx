import { Alert, AlertIcon, Box, Button, Flex, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import moment from "moment";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import { TMurobahahRequest, useCreateMurobahah } from "@/services/api/commands/murobahah.command";



const ModalTambahPinjaman = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any>((_, ref) => {
    const disclosure = useDisclosure();
    const formCallback = useFormCallback();
    const router = useRouter();
    const { id } = router.query;
    const form = useForm<TMurobahahRequest>({
      defaultValues: {
        totalPinjaman: "",
        tenor: "",
        totalMargin: "",
        dp: "",
        tglMulai: "",
        tglSelesai: "",
        pembiayaan: ""
      },
    })
    useImperativeHandle(
      ref,
      () => ({
        onOpen: disclosure.onOpen,
      }),
      [disclosure.onOpen]
    );


    const mutasiMurobahahMutation = useCreateMurobahah().mutate("POST");
    const submitHandler: SubmitHandler<TMurobahahRequest> = (values) => {
      values.tglMulai = moment(values.tglMulai).set({ h: moment().hour(), m: moment().minute(), s: moment().second() }).toISOString();
      values.tglSelesai = moment(values.tglSelesai).set({ h: moment().hour(), m: moment().minute(), s: moment().second() }).toISOString();
      values.totalPinjaman = (values.totalPinjaman as string)?.replace(/\D/g, '');
      values.totalMargin = (values.totalMargin as string)?.replace(/\D/g, '');
      values.dp = (values.dp as string)?.replace(/\D/g, '');

      const total = Number(values.totalPinjaman) + Number(values.totalMargin) - Number(values.dp);
      values.total = String(total);

      const pinjaman = ((Number(values.totalPinjaman) - Number(values.dp)) / Number(values.tenor))
      values.pinjaman = String(pinjaman);

      const cicilan = Number(values.pinjaman) + Number(values.totalMargin)
      values.cicilan = String(cicilan);


      values.lunas = false;
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

    form.watch(["totalPinjaman", "totalMargin", "dp"])
    return (
      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={["full", "xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Murobahah</ModalHeader>

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
                    <Input onChange={(e) => {
                      form.setValue("totalPinjaman", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                    }}
                      value={form.getValues("cicilan")} /> */}
                  <InputText label="Jumlah Pinjaman" register={'totalPinjaman'} onChange={(e) => {
                    form.setValue("totalPinjaman", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                  }} value={form.getValues("totalPinjaman")} />
                </Box>
                <Box w="254px">
                  <InputText type="number" label="Tenor" register={{ ...form.register("tenor") }} />
                  <Text fontSize="xs">* Minimal Tenor adalah 12 Bulan</Text>
                </Box>
              </Flex>
              <Flex gap={5}>
                <InputText register={"totalMargin"} label="Total Margin" onChange={(e) => {
                  form.setValue("totalMargin", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                }} value={form.getValues("totalMargin")} />
                <InputText register={"dp"} label="Jumlah DP" onChange={(e) => {
                  form.setValue("dp", !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : '');
                }} value={form.getValues("dp")} />
              </Flex>
              <Flex gap={5}>
                <InputText type='date' register={{ ...form.register("tglMulai") }} label="Tanggal Mulai" />
                <InputText type='date' register={{ ...form.register("tglSelesai") }} label="Tanggal Selesai " />
              </Flex>
              <Box>
                <InputTextarea register={{ ...form.register("pembiayaan") }} label="Keperluan" />
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
    )
  })

export default ModalTambahPinjaman;
ModalTambahPinjaman.displayName = "ModalTambahPinjaman";
