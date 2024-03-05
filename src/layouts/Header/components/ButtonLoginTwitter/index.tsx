// import { CDN_URL } from '@constants/config';
import React from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

type Props = {
  color: 'black' | 'white';
};
const ButtonLoginTwitter = (props: Props) => {
  const { login } = useWeb3Authenticated();
  const handleConnect = async () => {
    try {
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
      className={s.btnLogin}
      color={props?.color === 'black' ? 'black' : 'white'}
      gap={'10px'}
      _hover={{
        cursor: 'pointer',
      }}
    >
      Sign in
    </Flex>
  );
};

export default ButtonLoginTwitter;
