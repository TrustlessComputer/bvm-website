import { Input, InputProps } from '@chakra-ui/react';

const InputWrapper = (props: any) => {
  return (
    <Input
      fontSize={'18px'}
      borderWidth={'1.5px'}
      borderRadius={'12px'}
      minH={'60px'}
      borderColor={'#d9d9d9'}
      color={'#000'}
      aria-activedescendant=""
      _disabled={{
        color: '#000',
        cursor: 'no-drop',
      }}
      _placeholder={{
        caretColor: '#2b35e4',
        color: '#5a5a5a7b',
      }}
      _hover={{
        borderColor: '#2b35e4',
        borderWidth: '1.5px',
      }}
      _active={{
        caretColor: '#2b35e4',
        color: '#000',
        borderWidth: '1.5px',
      }}
      _invalid={{
        borderColor: '#ee2525',
        borderWidth: '1.5px',
      }}
      autoComplete="off"
      spellCheck={false}
      autoFocus={false}
      type="text"
      step={'any'}
      onWheel={(e: any) => e?.target?.blur()}
      {...props}
    />
  );
};

export default InputWrapper;
