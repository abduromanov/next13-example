import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TInputProps = {
  register: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
  helper?: string;
};

export function InputText(props: InputProps & TInputProps) {
  return (
    <FormControl isInvalid={!!props.errors}>
      <FormLabel htmlFor={props.id || props.register.name}>
        {props.label}
      </FormLabel>
      <Input
        id={props.id || props.register.name}
        variant="outline"
        {...props.register}
        {...props}
      />
      <FormErrorMessage>{props.errors?.message as string}</FormErrorMessage>
      <FormHelperText fontSize="xs">{props.helper}</FormHelperText>
    </FormControl>
  );
}

InputText.displayName = "InputText";
