import { Flex, FlexProps, Spinner, Text } from '@chakra-ui/react';

interface IProps extends FlexProps {
  title?: string;
  isLoading?: boolean;
}

const SubmitButton = (props: IProps) => {
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      gap={'5px'}
      px={'8px'}
      py={'2px'}
      minH={['28px']}
      minW={'100px'}
      maxW={'max-content'}
      color={'#fff'}
      bgColor={'#4185EC'}
      borderRadius={'16px'}
      fontSize={'14px'}
      fontWeight={600}
      textAlign={'center'}
      onClick={props.onClick}
      _hover={{
        opacity: 0.7,
        cursor: 'pointer',
      }}
    >
      {!!props.isLoading ? (
        <Spinner size="sm" />
      ) : (
        <Text fontSize={'14px'} fontWeight={800}>
          {props.title}
        </Text>
      )}
    </Flex>
  );
};

export default SubmitButton;
