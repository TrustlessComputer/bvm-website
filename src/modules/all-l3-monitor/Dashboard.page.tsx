'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
} from '@chakra-ui/react';

import useL2Service from '@/hooks/useL2Service';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setViewPage, setViewMode } from '@/stores/states/l2services/reducer';
import { useEffect, useMemo, useState } from 'react';
import {
  TAB_ENUM,
  TAB_ENUM_MAP,
  TAB_NETWORK_ENUM,
  TAB_NETWORK_MAP,
} from './Dashboard.constant';
import BodyView from './components/Body';
import s from './styles.module.scss';
import {
  OPOrdersSelector,
  ZKOrdersSelector,
  getL2ServicesStateSelector,
} from '@/stores/states/l2services/selector';

const Page = (props: any) => {
  const { viewMode } = useAppSelector(getL2ServicesStateSelector);

  const [activeTab, setChatTabIndex] = useState<TAB_ENUM>(
    TAB_ENUM.MANAGE_CHAINS,
  );

  const zkList = useAppSelector(ZKOrdersSelector);
  const opList = useAppSelector(OPOrdersSelector);

  const isMainnet = useMemo(() => {
    return viewMode === 'Mainnet';
  }, [viewMode]);

  const onChangeTab = (index: number) => {
    if (index === TAB_ENUM.MANAGE_CHAINS) {
      dispatch(setViewPage('ManageChains'));
    } else {
      dispatch(setViewPage('Biiling'));
    }
    setChatTabIndex(index);
  };

  const { getAllOrderListV2 } = useL2Service();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllOrderListV2();
  }, []);

  const renderOP = () => {
    return (
      <Flex flexDir={'column'}>
        <BodyView dataList={opList} />
      </Flex>
    );
  };

  const renderZK = () => {
    return (
      <Flex flexDir={'column'}>
        <BodyView dataList={zkList} />
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
        <Flex
          height={'100px'}
          flexDir={'row'}
          align={'center'}
          justify={'center'}
          gap={'30px'}
        >
          <Button
            color={`${isMainnet ? 'white' : 'black'}`}
            borderWidth={'1px'}
            borderColor={'orange'}
            bgColor={`${isMainnet ? 'orange' : ''}`}
            onClick={() => {
              dispatch(setViewMode('Mainnet'));
            }}
          >
            Mainnet
          </Button>
          <Button
            color={`${!isMainnet ? 'white' : 'black'}`}
            borderWidth={'1px'}
            borderColor={'orange'}
            bgColor={`${!isMainnet ? 'orange' : ''}`}
            onClick={() => {
              dispatch(setViewMode('Testnet'));
            }}
          >
            Testnet
          </Button>
        </Flex>
        <TabPanels className={s.tabPanel}>
          <TabPanel>{renderOP()}</TabPanel>
          <TabPanel>{renderZK()}</TabPanel>
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

export default Page;
