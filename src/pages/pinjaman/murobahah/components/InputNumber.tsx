import {
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type TInputProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
};

export function InputNumber(props: InputProps) {
  return (
    <NumberInput defaultValue={props.defaultValue} min={props.min} max={props.max}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

InputNumber.displayName = "InputNumber";
