'use client';

import { Flex, Spinner, Box, Button, useDisclosure } from '@chakra-ui/react';

import HeaderView from './components/Header';
import BodyView from './components/Body';
import BoxContent from '@/layouts/BoxContent';
import {
  getL2ServicesStateSelector,
  isFetchingAllDataSelector,
} from '@/stores/states/l2services/selector';
import s from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { enhance } from './Dashboard.enhance';
import useL2Service from '@/hooks/useL2Service';
import { useEffect } from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { setViewMode, setViewPage } from '@/stores/states/l2services/reducer';
import BillingPage from './components/BillingPage';

const Page = (props: any) => {
  const { onOpenTopUpModal } = props;
  const {
    loopFetchAccountInfor,
    onVerifyLoginFirstTime,
    fetchAllData,
    isL2ServiceLogged,
  } = useL2Service();

  const dispatch = useAppDispatch();

  const { loggedIn, setShowLoginModalCustomize } = useWeb3Auth();

  const isFetchingAllData = useAppSelector(isFetchingAllDataSelector);
  const { viewPage } = useAppSelector(getL2ServicesStateSelector);

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

  const renderBillingPage = () => {
    return (
      <BillingPage
        viewPaymentOnClick={() => {
          onOpenTopUpModal && onOpenTopUpModal();
        }}
      />
    );
  };
  const renderManageChainsPage = () => {
    return (
      <>
        <HeaderView />
        <Flex height={'15px'}></Flex>
        <BodyView />
      </>
    );
  };

  const renderContent = () => {
    return (
      <Flex
        flexDir={'row'}
        alignItems={'flex-start'}
        gap={'30px'}
        pos={'relative'}
      >
        {/* LeftView */}
        <Flex
          flexDir={'column'}
          pos={'sticky'}
          top={0}
          left={0}
          p={'8px'}
          borderRadius={'8px'}
          gap={'10px'}
          maxW={'300px'}
          bgColor={'#fff'}
        >
          <Button
            className={s.font2}
            bgColor={viewPage === 'Biiling' ? '#FA4E0E' : '#fff'}
            color={viewPage === 'Biiling' ? '#fff' : '#000'}
            borderRadius={'8px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'28px'}
            py={'16px'}
            minW={['180px']}
            height={'48px'}
            margin={'0 auto'}
            fontWeight={500}
            fontSize={'16px'}
            _hover={{
              bgColor: '#e5601b',
            }}
            onClick={() => {
              if (loggedIn) {
                dispatch(setViewPage('Biiling'));
              } else {
                setShowLoginModalCustomize && setShowLoginModalCustomize(true);
              }
            }}
          >
            Billing
          </Button>
          <Button
            className={s.font2}
            bgColor={viewPage === 'ManageChains' ? '#FA4E0E' : '#fff'}
            color={viewPage === 'ManageChains' ? '#fff' : '#000'}
            borderRadius={'8px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'28px'}
            py={'16px'}
            minW={['180px']}
            height={'48px'}
            margin={'0 auto'}
            fontWeight={500}
            fontSize={'16px'}
            _hover={{
              bgColor: '#e5601b',
            }}
            onClick={() => {
              dispatch(setViewPage('ManageChains'));
            }}
          >
            Manage Chains
          </Button>
        </Flex>

        {/* RightView */}
        <Flex flexDir={'column'} w="100%">
          {viewPage === 'ManageChains'
            ? renderManageChainsPage()
            : renderBillingPage()}
        </Flex>
      </Flex>
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
      <BoxContent
        minH={'100dvh'}
        overflow={'visible'}
        py={'60px'}
        pos={'relative'}
      >
        {isFetchingAllData ? renderLoading() : renderContent()}
      </BoxContent>
    </Flex>
  );
};

export default enhance(Page);
