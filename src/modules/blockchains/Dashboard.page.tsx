'use client';

import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import BodyView from './components/Body';
import s from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { enhance } from './Dashboard.enhance';
import useL2Service from '@/hooks/useL2Service';
import { useEffect, useState } from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { setViewMode, setViewPage } from '@/stores/states/l2services/reducer';
import BillingPage from './components/BillingPage';
import { TAB_ENUM, TAB_ENUM_MAP } from './Dashboard.constant';

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

  const { loopFetchAccountInfor, getMyOrderList } = useL2Service();
  const dispatch = useAppDispatch();
  const { loggedIn } = useWeb3Auth();

  useEffect(() => {
    if (loggedIn) {
      console.log('PHAT -- 1 ');
      loopFetchAccountInfor();
      console.log('PHAT --2 ');
      getMyOrderList();
    }
  }, [loggedIn]);

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
      <Flex flexDir={'column'}>
        {/* <HeaderView />
        <Flex height={'15px'}></Flex> */}
        <BodyView />
      </Flex>
    );
  };

  const renderTabbar = () => {
    return (
      <Tabs
        className={s.tabContainer}
        onChange={onChangeTab}
        defaultIndex={activeTab}
      >
        <TabList className={s.tabList}>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.MANAGE_CHAINS]}</Tab>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.BILLING]}</Tab>
        </TabList>
        <TabPanels className={s.tabPanel}>
          <TabPanel>{renderManageChainsPage()}</TabPanel>
          <TabPanel>{renderBillingPage()}</TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Flex
      bgColor={'#f3f1e8'}
      flexDir={'column'}
      align={'center'}
      className={s.container}
    >
      <Flex
        minH={'100dvh'}
        overflow={'visible'}
        pos={'relative'}
        className={s.containerContent}
      >
        {renderTabbar()}
      </Flex>
    </Flex>
  );
};

export default enhance(Page);
