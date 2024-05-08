'use client';

import { Flex, Spinner, Box } from '@chakra-ui/react';

import HeaderView from './components/Header';
import BodyView from './components/Body';
import BoxContent from '@/layouts/BoxContent';
import { useFetchUserData } from './hooks/useFetchUserData';
import { useEffect } from 'react';
import { isFetchingAllDataSelector } from '@/stores/states/l2services/selector';
import useL2ServiceAuth from '@/hooks/useL2ServiceAuth';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';

export default () => {
  const fetcher = useFetchUserData();
  const isFetchingAllData = useAppSelector(isFetchingAllDataSelector);
  const { isL2ServiceLogged, isNeededRequestSignMessageFromNakaWallet } =
    useL2ServiceAuth();

  useEffect(() => {
    fetcher();
  }, [isL2ServiceLogged]);

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
