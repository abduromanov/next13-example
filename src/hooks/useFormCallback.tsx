import { useToast } from "@chakra-ui/react";

export const useFormCallback = () => {
  const toast = useToast();

  return {
    onSuccess: (message: string) => {
      toast({
        position: "top",
        status: "success",
        variant: "top-accent",
        title: message,
        duration: 3000,
      });
    },
    onError: (message: string) => {
      toast({
        position: "top",
        status: "error",
        variant: "top-accent",
        title: message,
        duration: 3000,
      });
    },
  };
};
