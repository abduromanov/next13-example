import { FormControl, FormErrorMessage, FormLabel, SelectFieldProps } from "@chakra-ui/react";
import { AsyncSelect, GroupBase, OptionsOrGroups } from "chakra-react-select";
import { Control, useController } from "react-hook-form";

export interface Options {
  value: number | string;
  label: string;
}

type TInputProps = {
  control: Control<any>;
  loadOptions: (inputValue: string, callback: (options: OptionsOrGroups<Options, GroupBase<Options>>) => void) => void;
  rules?: Record<any, any>;
  label?: string;
};

export default function SearchableSelect(props: TInputProps & SelectFieldProps) {
  const controller = useController({
    name: props.name || '',
    control: props.control,
    rules: props.rules
  });

  return <FormControl isInvalid={!controller.formState.errors}>
    <FormLabel>
      {props.label}
    </FormLabel>
    <AsyncSelect<Options>
      {...controller.field}
      className="chakra-react-select"
      classNamePrefix="chakra-react-select"
      isClearable
      selectedOptionStyle="check"
      chakraStyles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: "transparent",
          px: 2,
          cursor: "inherit"
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: "none"
        })
      }}
      variant='outline'
      loadOptions={props.loadOptions}
      placeholder={props.placeholder}
    />
    <FormErrorMessage>{controller.fieldState.error?.message || ''}</FormErrorMessage>
  </FormControl>;
};

SearchableSelect.displayName = 'SearchableSelect';
