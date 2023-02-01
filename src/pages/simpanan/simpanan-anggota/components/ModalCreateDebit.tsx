import { Alert, AlertIcon, Box, Button, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

import { InputText } from "@/components/Forms/InputText";

const ModalCreateDebit = forwardRef<
  Partial<ReturnType<typeof useDisclosure>> | undefined,
  any>((_, ref) => {
    const disclosure = useDisclosure();

    useImperativeHandle(
      ref,
      () => ({
        onOpen: disclosure.onOpen,
      }),
      [disclosure.onOpen]
    );

    return (
      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={["full", "xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Transaksi Tabungan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Alert status="warning">
                <AlertIcon />
                Berhati-hatilah dalam mengisi data ini. Setelah disimpan, data tidak dapat dirubah ataupun dihapus !
              </Alert>
              <InputText
                label="Nominal Simpanan"
                register={'nominal'}
              />
              <Flex gap={3} flexWrap="wrap">
                <VStack w="245px" spacing={3} >
                  <InputText
                    label="Simpanan Wajib"
                    register={'nominal'}
                  />
                  <InputText
                    label="Simpanan Khusus"
                    register={'nominal'}
                  />
                  <InputText
                    label="Simpanan Sukarela"
                    register={'nominal'}
                  />
                </VStack>
                <VStack alignItems="start" w="270px">
                  <Text>Keterangan</Text>
                  <Textarea placeholder="masukkan keterangan simpanan" h="150px" />
                </VStack>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button colorScheme="red" onClick={disclosure.onClose}>
                Batal
              </Button>
              <Button >Simpan</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  })

export default ModalCreateDebit;

ModalCreateDebit.displayName = "ModalCreateDebit";