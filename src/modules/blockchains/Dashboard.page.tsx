'use client';

import { Flex, Spinner, Box } from '@chakra-ui/react';

import HeaderView from './components/Header';
import BodyView from './components/Body';
import BoxContent from '@/layouts/BoxContent';
import { isFetchingAllDataSelector } from '@/stores/states/l2services/selector';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { enhance } from './Dashboard.enhance';
import useL2Service from '@/hooks/useL2Service';
import { useEffect } from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

const Page = () => {
  const {
    loopFetchAccountInfor,
    onVerifyLoginFirstTime,
    fetchAllData,
    isL2ServiceLogged,
  } = useL2Service();

  const { loggedIn } = useWeb3Auth();

  const isFetchingAllData = useAppSelector(isFetchingAllDataSelector);

  useEffect(() => {
    onVerifyLoginFirstTime();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
    loopFetchAccountInfor();
  }, [isL2ServiceLogged, loggedIn]);

  const renderContent = () => {
    return (
      <Box>
        <HeaderView />
        <Flex height={'30px'}></Flex>
        <BodyView />
      </Box>
    );
  };
  const renderLoading = () => {
    return (
      <Flex flex={1} justify={'center'} align={'center'}>
        <Spinner color="#000" size={'lg'} />;
      </Flex>
    );
  };

  return (
    <Flex
      bgColor={'#f3f1e8'}
      flexDir={'column'}
      align={'center'}
      className={s.container}
    >
      <BoxContent minH={'100dvh'} overflow={'hidden'} py={'60px'}>
        {isFetchingAllData ? renderLoading() : renderContent()}
      </BoxContent>
    </Flex>
  );
};

export default enhance(Page);
