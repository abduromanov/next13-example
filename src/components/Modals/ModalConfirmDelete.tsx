import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: any;
  onClose: any;
};
export default function ModalConfirmDelete(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apakah Anda Yakin ?</ModalHeader>
        <ModalBody>
          <Text>Anda akan menghapus data secara permanen</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose} variant="ghost">
            Batalkan
          </Button>
          <Button colorScheme="red" variant="ghost">
            Ya, Hapus data
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
