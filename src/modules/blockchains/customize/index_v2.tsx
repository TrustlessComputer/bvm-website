'use client';

import useL2Service from '@/hooks/useL2Service';
import BoxContent from '@/layouts/BoxContent';
import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
// import { BuyPage } from '../Buy';
import { BuyProvider } from '../providers/Buy.context';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

import { BuyPage } from '../Buy/index_v2';
import s from './styles.module.scss';

export default () => {
  const { loopFetchAccountInfor, fetchAllData, isL2ServiceLogged } =
    useL2Service();
  const { loggedIn } = useWeb3Auth();

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
    loopFetchAccountInfor();
  }, [isL2ServiceLogged, loggedIn]);

  return (
    <div className={s.container}>
      <BuyProvider>
        <Flex maxWidth={'1480px'} w={'100%'} px={'20px'}>
          <BuyPage />
        </Flex>
      </BuyProvider>
    </div>
  );
};
