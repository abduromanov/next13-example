import { Alert, AlertIcon, Box, Button, Center, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

import { InputText } from "@/components/Forms/InputText";

const ModalCreateKredit = forwardRef<
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
              <HStack gap={3} flexWrap="wrap" >
                <Box>
                  <InputText
                    label="Nominal"
                    register={'nominal'}
                  />
                </Box>
                <VStack alignItems="start" >
                  <Text>Jenis Simpanan</Text>
                  <Select placeholder="pilih jenis simpanan" >
                    <option value="khusus">Simpanan Khusus</option>
                    <option value="sukarela">Simpanan Sukarela</option>
                  </Select>
                </VStack>
              </HStack>
              <Text>Catatan</Text>
              <Textarea placeholder="masukkan Catatan" />
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

export default ModalCreateKredit;

ModalCreateKredit.displayName = "ModalCreateKredit";