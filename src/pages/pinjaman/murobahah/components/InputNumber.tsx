import {
  FormControl,
  FormLabel,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TInputProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
};

export function InputNumber(props: InputProps & TInputProps) {
  return (
    <FormControl isInvalid={!!props.errors}>
      <FormLabel htmlFor={props.id || props.register.name}>
        {props.label}
      </FormLabel>
      <NumberInput
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        id={props.id || props.register.name}
        variant="outline"
        {...props}
        {...props.register}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

InputNumber.displayName = "InputNumber";
