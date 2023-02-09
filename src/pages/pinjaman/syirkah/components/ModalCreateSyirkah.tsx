import { Alert, AlertIcon, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";
import SearchableSelect from "@/components/Forms/SearchableSelect";

import { useAnggota } from "@/services/api/commands/anggota.command";
import { TSyirkahRequest, useCreateSyirkah } from "@/services/api/commands/syirkah.command";

type Props = {
  refetchFn?: () => void;
}

const ModalCreateSyirkah = forwardRef<Partial<ReturnType<typeof useDisclosure>> | undefined, Props>((props, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<TSyirkahRequest>();
  const formCallback = useFormCallback();
  const [searchAnggota, setSearchAnggota] = useState('');

  useImperativeHandle(ref, () => ({
    onOpen: disclosure.onOpen
  }), [disclosure.onOpen])

  const listAnggotaQuery = useAnggota(['syirkah', searchAnggota]).query({
    params: {
      search: searchAnggota,
      limit: 5,
    }
  });

  const syirkahMutation = useCreateSyirkah().mutate('POST');

  const submitHandler = (values: TSyirkahRequest) => {
    syirkahMutation.mutate(values, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan Syirkah");
        form.reset();
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError() {
        formCallback.onError("Gagal menambahkan Syirkah");
      }
    });
  }

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={["full", "2xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Anggota</ModalHeader>
        <ModalCloseButton />

        <ModalBody mb="5">
          <Stack spacing={3}>
            <Alert status="warning">
              <AlertIcon />
              Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data tidak dapat dirubah ataupun dihapus!
            </Alert>
            <SearchableSelect
              label="Nama Anggota"
              control={form.control}
              name='anggota'
              loadOptions={(inputValue, callback) => {
                setSearchAnggota(inputValue);

                if (!listAnggotaQuery.isLoading) {
                  const data = listAnggotaQuery.data?.data?.data.map(item => ({
                    value: item.id,
                    label: `${item.nama} (${item.idAnggota})`
                  }));

                  callback(data || []);
                };
              }}
              placeholder="Ketik untuk mencari anggota"
            />
            <InputText
              register={{ ...form.register('namaBc') }}
              label='Nama BC'
            />
            <Stack direction={['column', 'row']} spacing='3'>
              <InputText
                register={{ ...form.register('modalAwal') }}
                label='Modal Awal'
                onChange={e => form.setValue('modalAwal', !isNaN(parseInt(e.currentTarget.value)) ? parseInt(e.currentTarget.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : "")}
              />
              <InputText
                register={{ ...form.register('modalHamasah') }}
                label='Modal Hamasah'
                onChange={e => form.setValue('modalHamasah', !isNaN(parseInt(e.currentTarget.value)) ? parseInt(e.currentTarget.value.replace(/\D/g, ''), 10).toLocaleString('id-ID') : "")}
              />
            </Stack>
            <Stack direction={['column', 'row']} spacing='3'>
              <InputText
                register={{ ...form.register('tglMulai') }}
                label='Tgl Mulai'
                type='date'
              />
              <InputText
                register={{ ...form.register('tglSelesai') }}
                label='Tgl Selesai'
                type='date'
              />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button
              isLoading={syirkahMutation.isLoading}
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

export default ModalCreateSyirkah;

ModalCreateSyirkah.displayName = "ModalCreateSyirkah";