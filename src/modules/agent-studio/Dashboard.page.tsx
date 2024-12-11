'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';
import { useAppDispatch } from '@/stores/hooks';
import { setViewPage } from '@/stores/states/l2services/reducer';
import { useEffect, useState } from 'react';
import { TAB_ENUM, TAB_ENUM_MAP } from './Dashboard.constant';
import { enhance } from './Dashboard.enhance';
import BillingPage from './components/BillingPage';
import BodyView from './components/Body';
import NetworkBar from './components/NetworkBar';
import s from './styles.module.scss';

const Page = (props: any) => {
  const { onOpenTopUpModal } = props;
  const [activeTab, setChatTabIndex] = useState<TAB_ENUM>(
    TAB_ENUM.MANAGE_CHAINS,
  );

  const onChangeTab = (index: number) => {
    if (index === TAB_ENUM.MANAGE_CHAINS) {
      dispatch(setViewPage('ManageChains'));
    } else {
      dispatch(setViewPage('Biiling'));
    }
    setChatTabIndex(index);
  };

  const { getAccountInfor, getMyOrderList, getDappsList } = useL2Service();
  const dispatch = useAppDispatch();
  const { loggedIn, login } = useWeb3Auth();

  useEffect(() => {
    getAccountInfor();
    if (loggedIn) {
      getMyOrderList();
      getDappsList();
    }
  }, [loggedIn]);

  const renderTabbar = () => {
    return (
      <Tabs
        className={s.tabContainer}
        onChange={onChangeTab}
        defaultIndex={activeTab}
      >
        <TabList className={s.tabList} fontSize={['16px', '18px', ' 20px']}>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.MANAGE_CHAINS]}</Tab>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.BILLING]}</Tab>
        </TabList>
        <NetworkBar />
        <TabPanels className={s.tabPanel}>
          <TabPanel>
            <BodyView />
          </TabPanel>
          <TabPanel>
            <BillingPage
              viewPaymentOnClick={() => {
                onOpenTopUpModal && onOpenTopUpModal();
              }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Flex
      flexDir={'column'}
      align={'center'}
      // bgColor={'blue'}
      className={s.container}
    >
      <Flex
        flexDir={'column'}
        align={'center'}
        w="100%"
        minH={'100dvh'}
        overflow={'visible'}
        pos={'relative'}
        maxW={'1480px'}
        // bg={'yellow'}
        py={['10px', '30px', '60px']}
        px={'10px'}
      >
        {loggedIn ? (
          renderTabbar()
        ) : (
          <Text
            fontSize={['15px', '16px', '18px']}
            fontWeight={500}
            color={'#000'}
          >
            To see your ZK rollups -{' '}
            <Text
              as="span"
              fontSize={['15px', '16px', '18px']}
              fontWeight={500}
              p="10px"
              px="20px"
              bgColor={'#000'}
              color={'#fff'}
              borderRadius={'100px'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() => {
                login();
              }}
            >
              Connect
            </Text>
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default enhance(Page);
