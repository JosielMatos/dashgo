import {
  FormControl,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

import { ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  placeholder: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, placeholder, ...rest },
  ref
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={label}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor='pink.500'
        placeholder={placeholder}
        bgColor='gray.900'
        variant='filled' // input style
        _hover={{
          bgColor: "gray.900", // change bg color of hover effect
        }}
        size='lg' // 48px
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
