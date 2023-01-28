import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TInputProps = {
  register: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
}

export function InputTextarea(props: TextareaProps & TInputProps) {
  return (
    <FormControl isInvalid={!!props.errors}>
      <FormLabel htmlFor={props.id || props.register.name}>{props.label}</FormLabel>
      <Textarea
        id={props.id || props.register.name}
        {...props}
        {...props.register}
      />
      <FormErrorMessage>
        {props.errors?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
}

InputTextarea.displayName = 'InputTextarea';