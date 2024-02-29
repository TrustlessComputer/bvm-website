// import { CDN_URL } from '@constants/config';
import React from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
  color: 'black' | 'white';
};
const ButtonLoginTwitter = (props: Props) => {
  // const { onLoginMetamask } = useContext(LoginContext);
  const { login } = useWeb3Authenticated();
  const handleConnect = async () => {
    try {
      // await onLoginMetamask();
      await login();
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <Flex
      onClick={handleConnect}
      flexDir={'row'}
      borderRadius={'4px'}
      justify={'center'}
      align={'center'}
      px={'10px'}
      py={'5px'}
      color={props?.color === 'black' ? 'black' : 'white'}
      gap={'10px'}
      _hover={{
        cursor: 'pointer',
      }}
    >
      <Text textAlign={'center'} fontSize={['14px', '16px']} fontWeight={500}>
        Login
      </Text>
    </Flex>
  );
};

export default ButtonLoginTwitter;
