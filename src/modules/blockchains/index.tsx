'use client';

import { Flex, Spinner, Box } from '@chakra-ui/react';

import HeaderView from './components/Header';
import BodyView from './components/Body';
import BoxContent from '@/layouts/BoxContent';
import { useFetchUserData } from './hooks/useFetchUserData';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isFetchingAllDataSelector } from '@/stores/states/l2services/selector';

export default () => {
  const fetcher = useFetchUserData();
  const isFetchingAllData = useSelector(isFetchingAllDataSelector);

  useEffect(() => {
    fetcher();
  }, []);

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
    <Flex bgColor={'#f3f1e8'} flexDir={'column'} align={'center'}>
      <BoxContent minH={'100dvh'} overflow={'hidden'} py={'60px'}>
        {isFetchingAllData ? renderLoading() : renderContent()}
      </BoxContent>
    </Flex>
  );
};
