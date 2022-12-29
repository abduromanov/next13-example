import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TInputProps = {
  register: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
}

export function InputPassword(props: InputProps & TInputProps) {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, props.register.ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl isInvalid={!!props.errors}>
      <FormLabel htmlFor={props.id || props.register.name}>{props.label}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <Icon as={EyeSlashIcon} /> : <Icon as={EyeIcon} />}
            onClick={onClickReveal} />
        </InputRightElement>
        <Input
          id={props.id || props.register.name}
          type={isOpen ? 'text' : 'password'}
          {...props}
          {...props.register}
          ref={mergeRef} />
      </InputGroup>
      <FormErrorMessage>
        {props.errors?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
}

InputPassword.displayName = 'InputPassword'