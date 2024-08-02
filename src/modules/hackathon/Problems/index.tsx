import React, { PropsWithChildren, useState } from 'react';
import s from './Problems.module.scss';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';
import SubmitProblem from '../SubmitProblem';
import IcThreeDots from '@/public/hackathon/ic-three-dots.svg';
import ProblemTemplate from './Template';
import ConnectedWallets from '../ConnectedWallets';
import SvgInset from '@/components/SvgInset';

const Problems = ({
  isProblemPanelMaximized,
  setIsProblemPanelMaximized,
  setShowLeaderboard,
}: {
  isProblemPanelMaximized: boolean;
  setIsProblemPanelMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLeaderboard: (showLeaderboard: boolean) => void;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleExpandProblem = () => {
    if (isProblemPanelMaximized) {
      setIsProblemPanelMaximized(false);
      return;
    }

    setIsProblemPanelMaximized(true);
    setShowLeaderboard(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Image src={'/hackathon/ic-three-dots.svg'}></Image>

        <span
          className={s.boxControl}
          onClick={() => {
            setIsProblemPanelMaximized((prev) => !prev);
            handleExpandProblem();
          }}
        >
          {isProblemPanelMaximized ? (
            <SvgInset size={16} svgUrl="/images/poc/minimize-icon.svg" />
          ) : (
            <SvgInset size={16} svgUrl="/images/poc/maximize-icon.svg" />
          )}
        </span>
      </div>
      <div
        className={s.body}
        style={{
          maxWidth: isProblemPanelMaximized ? '100%' : '700px',
        }}
      >
        <Tabs variant="soft-rounded" onChange={(index) => setTabIndex(index)}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <TabList p="10px" mb="8px" gap="3px">
              <Tab>Problem 1</Tab>
              <Tab>Problem 2</Tab>
              <Tab>Problem 3</Tab>
            </TabList>
            <Flex alignItems={'center'} gap="20px">
              <ConnectedWallets />
              <Flex
                onClick={() => {
                  window.open(
                    'https://github.com/TrustlessComputer/poc-practice',
                  );
                }}
                alignItems={'center'}
                gap="4px"
                mr="10px"
                px="13px"
                py="7px"
                className={s.github}
              >
                <Image src="/hackathon/ic-github.svg" />
                <p>Github</p>
                <Image src="/hackathon/ic-link-gray.svg" />
              </Flex>
            </Flex>
          </Flex>
          <TabPanels p="10px 16px">
            <TabPanel>
              <ProblemTemplate topic="1" />
            </TabPanel>
            <TabPanel>
              <ProblemTemplate topic="2" />
            </TabPanel>
            <TabPanel>
              <ProblemTemplate topic="3" />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <ConnectedWallets /> */}
      </div>
      <div className={s.footer}>
        <SubmitProblem code={tabIndex + 1} />
      </div>
    </div>
  );
};

export default Problems;
