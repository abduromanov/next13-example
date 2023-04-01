import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TInputProps = {
  register: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
  children?: ReactNode;
};

export function InputSelect(props: SelectProps & TInputProps) {
  return (
    <FormControl isInvalid={!!props.errors}>
      <FormLabel htmlFor={props.id || props.register.name}>
        {props.label}
      </FormLabel>
      <Select placeholder={props.placeholder} {...props.register}>
        {props.children}
      </Select>
      <FormErrorMessage>{props.errors?.message as string}</FormErrorMessage>
    </FormControl>
  );
}

InputSelect.displayName = "InputSelect";
