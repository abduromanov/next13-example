import { Alert, AlertIcon, Box, Button, Flex, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { forwardRef, useImperativeHandle } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import { TMurobahahRequest, useCreateMurobahah } from "@/services/api/commands/murobahah.command";
import validators from "@/services/utils/validators";



const ModalTambahPinjaman = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any>((_, ref) => {
    const disclosure = useDisclosure();
    const formCallback = useFormCallback();

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

                  <InputText label="Jumlah Pinjaman" value={form.getValues("totalPinjaman")}
                    register={{ ...form.register("totalPinjaman", { ...validators().required() }), onChange: (e) => { form.setValue('totalPinjaman', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : ''); return e.target.value } }}
                    errors={form.formState.errors.totalPinjaman}
                  />
                </Box>
                <Box w="254px">
                  <InputText type="number" label="Tenor" register={{ ...form.register("tenor", { ...validators().required() }) }} errors={form.formState.errors.tenor} />
                  <Text fontSize="xs">* Minimal Tenor adalah 12 Bulan</Text>
                </Box>
              </Flex>
              <Flex gap={5}>
                <InputText label="Total Margin" value={form.getValues("totalMargin")} errors={form.formState.errors.totalMargin}
                  register={{ ...form.register("totalMargin", { ...validators().required() }), onChange: (e) => { form.setValue('totalMargin', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : ''); return e.target.value } }}
                />
                <InputText label="Jumlah DP" value={form.getValues("dp")}
                  register={{ ...form.register("dp"), onChange: (e) => { form.setValue('dp', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : ''); return e.target.value } }}
                />
              </Flex>
              <Flex gap={5}>
                <InputText type='date' errors={form.formState.errors.tglMulai} register={{ ...form.register("tglMulai", { ...validators().required() }) }} label="Tanggal Mulai" />
                <InputText type='date' errors={form.formState.errors.tglSelesai} register={{ ...form.register("tglSelesai", { ...validators().required() }) }} label="Tanggal Selesai " />
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
