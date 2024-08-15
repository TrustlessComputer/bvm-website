'use client';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import ChainCard from '@/modules/ExploreModule/components/ChainCard';
import DappCard from '@/modules/ExploreModule/components/DappCard';
// import WrapperCard from '@/modules/ExploreModule/components/WrapperCard';
import {
  CHAIN_DATA,
  DAPPS_DATA,
  GAMES_DATA,
} from '@/modules/ExploreModule/data';
import Loader from '@/modules/builder-landing/Loader';
import useWhiteBackground from '@hooks/useWhiteBackground';
import Chars from '@interactive/Chars';
import Disclaimer from '@/modules/ExploreModule/components/Disclaimer';

import s from './styles.module.scss';

export default function ExploreModule(): React.JSX.Element {
  useWhiteBackground();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Loader bgColor={'#FFF'} />
      <div className={`containerV3`}>
        <p className={s.heading}>
          <Chars delayEnter={0.5}>Welcome to the future of Bitcoin!</Chars>
        </p>
        <Text className={s.description} mt="12px">
          Let's explore the broader capabilities of Bitcoin that go beyond mere
          currency.
        </Text>
        {/* tab */}
        <Tabs index={tabIndex} onChange={handleTabsChange} mt="40px">
          <TabList className={s.tabList}>
            <Tab>Apps</Tab>
            <Tab>Games</Tab>
            <Tab>Rollups</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <Flex direction="column" gap="60px">
                <div className={s.wrapperCardDapps}>
                  {DAPPS_DATA.map((item, idx) => {
                    return <DappCard {...item} idx={idx} key={item.title} />;
                  })}
                </div>
                <Disclaimer />
              </Flex>
            </TabPanel>
            <TabPanel p="0">
              <Flex direction="column" gap="60px">
                <div className={s.wrapperCardDapps}>
                  {GAMES_DATA.map((item, idx) => {
                    return <DappCard {...item} idx={idx} key={item.title} />;
                  })}
                </div>
                <Disclaimer />
              </Flex>
            </TabPanel>

            <TabPanel p="0">
              <Flex direction="column" gap="60px">
                <div className={s.wrapperCardChains}>
                  {CHAIN_DATA.map((item, index) => {
                    return <ChainCard idx={index} {...item} key={item.image} />;
                  })}
                </div>
                <Disclaimer />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* end tab */}
      </div>
    </>
  );
}
