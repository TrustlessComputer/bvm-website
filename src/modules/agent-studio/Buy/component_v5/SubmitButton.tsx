import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface AppButtonProps extends ButtonProps {}

const SubmitButton = (props: AppButtonProps) => {
  return (
    <Button
      minH={'50px'}
      fontSize={'16px'}
      fontWeight={600}
      textAlign={'center'}
      bgColor={'#3772ff'}
      color={'#fff'}
      borderRadius={'12px'}
      _hover={{
        opacity: 0.7,
        cursor: 'pointer',
      }}
      _disabled={{
        opacity: 1,
        cursor: 'not-allowed',
      }}
      {...(props as any)}
    >
      {props.children}
    </Button>
  );
};

export default SubmitButton;
