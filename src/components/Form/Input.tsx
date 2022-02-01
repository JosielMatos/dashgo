import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  placeholder: string;
}

export function Input({ name, label, placeholder, ...rest }: InputProps) {
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
        {...rest}
      />
    </FormControl>
  );
}
