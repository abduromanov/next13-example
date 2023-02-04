import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputText } from "@/components/Forms/InputText";

import { useMutatePengumuman } from "@/services/api/commands/pengumuman.command";
import validators from "@/services/utils/validators";

type Props = {
  refetchFn?: () => void;
};

const ModalCreatePengumuman = forwardRef<
  Partial<ReturnType<typeof useDisclosure> | undefined>,
  Props
>((props, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<{ file: FileList }>();
  const formCallback = useFormCallback();

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const pengumumanQuery = useMutatePengumuman().mutate("POST");

  const submitHandler = async (values: { file: FileList }) => {
    const formData = new FormData();
    formData.append("image", values.file[0]);

    pengumumanQuery.mutate(formData, {
      onSuccess() {
        formCallback.onSuccess("Berhasil menambahkan pengumuman");
        disclosure.onClose();
        props.refetchFn?.();
      },
      onError(error) {
        formCallback.onError("Gagal menambahkan pengumuman");
        form.setError("file", { message: error.response?.data?.message });
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
        <ModalHeader>Tambah Pengumuman</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <InputText
            register={{
              ...form.register("file", { ...validators().required() }),
            }}
            type="file"
          />
          <Text mt="1" fontSize="xs" color="gray">
            Besar file maks. 1 MB.
            <br />
            Rasio gambar yang direkomendasikan adalah 16:9
          </Text>
          {form.formState.errors["file"] && (
            <Text mt="2" fontSize="xs" color="red">
              {form.formState.errors["file"].message}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={disclosure.onClose}>
              Batal
            </Button>
            <Button
              isLoading={pengumumanQuery.isLoading}
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

ModalCreatePengumuman.displayName = "ModalCreatePengumuman";

export default ModalCreatePengumuman;
