import {
  Button,
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
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import { useFormCallback } from "@/hooks/useFormCallback";

import { InputPassword } from "@/components/Forms/InputPassword";

import {
  TUpdatePasswordRequest,
  useUpdatePassword,
} from "@/services/api/commands/auth.command";

const ModalChangePassword = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined
>((_, ref) => {
  const disclosure = useDisclosure();
  const form = useForm<TUpdatePasswordRequest>();
  const formCallback = useFormCallback();
  const router = useRouter();

  useImperativeHandle(
    ref,
    () => ({
      onOpen: disclosure.onOpen,
    }),
    [disclosure.onOpen]
  );

  const passwordMutation = useUpdatePassword().mutate("PUT");

  const handleSubmit = (value: TUpdatePasswordRequest) => {
    passwordMutation.mutate(value, {
      onSuccess() {
        formCallback.onSuccess(
          "Berhasil mengubah password, Silakan login ulang"
        );
        disclosure.onClose();
        Cookies.remove("anggota");
        router.push("auth/login");
      },
      onError() {
        formCallback.onError(
          "Gagal mengubah password, Cobalah beberapa saat lagi"
        );
      },
    });
  };

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      size={{ base: "full", lg: "md" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ganti Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputPassword
            label="Password"
            register={{
              ...form.register("password"),
            }}
            placeholder="Masukkan password baru"
          />
          <Text fontSize="xs" mt={2} color="gray.400" lineHeight={"1rem"}>
            *Setelah berhasil mengganti password, anda harus melakukan login
            ulang
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={disclosure.onClose}>
            Batal
          </Button>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            isLoading={passwordMutation.isLoading}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalChangePassword;

ModalChangePassword.displayName = "ModalChangePassword";
