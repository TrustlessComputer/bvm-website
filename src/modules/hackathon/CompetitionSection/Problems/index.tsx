import React, { useState } from 'react';
import s from './Problems.module.scss';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Flex,
} from '@chakra-ui/react';
import ProblemTemplate from './Template';
import SvgInset from '@/components/SvgInset';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import { PROBLEM_DATASOURCE } from './ProblemData';
import ConnectedWallets from '../../ConnectedWallets';

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

  const { tracking } = useL2ServiceTracking();

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
      <div className={s.body}>
        <Tabs
          variant="soft-rounded"
          onChange={(index) => {
            setTabIndex(index);
            tracking('POC_SELECT_TAB_PROBLEM');
          }}
        >
          <TabList p="20px" gap="6px">
            {PROBLEM_DATASOURCE.map((item, index) => (
              <Tab
                style={{ textAlign: 'left' }}
                key={item.id}
                justifyContent={'start'}
              >
                Problem {index + 1}
              </Tab>
            ))}
          </TabList>
          <TabPanels p="16px" overflow="hidden">
            {PROBLEM_DATASOURCE.map((item) => (
              <TabPanel key={item.id}>
                <ProblemTemplate topic={item.id} />
              </TabPanel>
            ))}
          </TabPanels>
          <Flex alignItems={'center'} gap="20px" p="16px">
            <ConnectedWallets showIcon />
            <Flex
              onClick={() => {
                window.open(
                  'https://github.com/TrustlessComputer/poc-practice',
                );
                tracking('POC_SET_UP_ENV');
              }}
              alignItems={'center'}
              gap="4px"
              className={s.github}
            >
              <Image src="/hackathon/ic-github.svg" />
              <p>Github</p>
              <Image src="/hackathon/ic-link-gray.svg" />
            </Flex>
          </Flex>
        </Tabs>
      </div>
    </div>
  );
};

export default Problems;
