'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setMonitorViewPage } from '@/stores/states/l2services/reducer';
import { useEffect, useMemo, useState } from 'react';
import { enhance } from '../../Dashboard.enhance';
import BodyView from '../../components/Body/index_monitor';
import NetworkBar from '../../components/NetworkBar/index_monitor';
import { TAB_ENUM, TAB_ENUM_MAP } from './constant';
import s from './styles.module.scss';
import {
  OPOrdersSelector,
  ZKOrdersSelector,
  getL2ServicesStateSelector,
} from '@/stores/states/l2services/selector';

const Page = () => {
  const [activeTab, setChatTabIndex] = useState<TAB_ENUM>(TAB_ENUM.ZK);
  const dispatch = useAppDispatch();
  const { getAllOrderListV2 } = useL2Service();
  const zkList = useAppSelector(ZKOrdersSelector);
  const opList = useAppSelector(OPOrdersSelector);
  const { viewMode } = useAppSelector(getL2ServicesStateSelector);

  const mainData = useMemo(() => {
    if (activeTab === TAB_ENUM.OP) return opList;
    else return zkList;
  }, [activeTab, zkList, opList]);

  const onChangeTab = (index: number) => {
    if (index === TAB_ENUM.OP) {
      dispatch(setMonitorViewPage('OP'));
    } else {
      dispatch(setMonitorViewPage('ZK'));
    }
    setChatTabIndex(index);
  };

  useEffect(() => {
    getAllOrderListV2();
  }, []);

  const renderTabbar = () => {
    return (
      <Tabs
        className={s.tabContainer}
        onChange={onChangeTab}
        defaultIndex={activeTab}
      >
        <TabList className={s.tabList} fontSize={['16px', '18px', ' 20px']}>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.ZK]}</Tab>
          <Tab>{TAB_ENUM_MAP[TAB_ENUM.OP]}</Tab>
        </TabList>
        <NetworkBar mainData={mainData} />
        <TabPanels className={s.tabPanel}>
          <TabPanel>
            <BodyView
              dataList={
                viewMode === 'Mainnet' ? zkList.MainnetList : zkList.TestnetList
              }
            />
          </TabPanel>
          <TabPanel>
            <BodyView
              dataList={
                viewMode === 'Mainnet' ? opList.MainnetList : opList.TestnetList
              }
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Flex flexDir={'column'} align={'center'} className={s.container}>
      <Flex
        flexDir={'column'}
        align={'center'}
        w="100%"
        minH={'100dvh'}
        overflow={'visible'}
        pos={'relative'}
        maxW={'1480px'}
        py={['10px', '30px', '60px']}
        px={'10px'}
      >
        {renderTabbar()}
      </Flex>
    </Flex>
  );
};

export default enhance(Page);
