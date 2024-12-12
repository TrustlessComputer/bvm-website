import { Input, InputProps } from '@chakra-ui/react';

interface IProps extends InputProps {}

const AppInput = (props: IProps) => {
  return (
    <Input
      type="text"
      h="30px"
      minW={'200px'}
      display={'flex'}
      p="0px 12px"
      alignItems={'center'}
      gap={'8px'}
      borderRadius={'14px'}
      bgColor={'#fff'}
      color="#000"
      placeholder=""
      _placeholder={{
        color: 'grey',
      }}
      _hover={{
        cursor: 'text',
      }}
      _disabled={{
        cursor: 'not-allowed',
      }}
      {...(props as any)}
    >
      {props.children}
    </Input>
  );
};

export default AppInput;
