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
import ConnectedWallets from '../ConnectedWallets';
import SvgInset from '@/components/SvgInset';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';

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
      <div
        className={s.body}
        // style={{
        //   maxWidth: isProblemPanelMaximized ? '100%' : '700px',
        // }}
      >
        <Tabs
          orientation={'vertical'}
          variant="soft-rounded"
          display="grid"
          gridTemplateColumns={'168px 1fr'}
          onChange={(index) => {
            setTabIndex(index);
            tracking('POC_SELECT_TAB_PROBLEM');
          }}
        >
          <Flex
            justifyContent={'space-between'}
            flexDirection={'column'}
            gap="40px"
            style={{ borderRight: '1px solid #2A2A2A' }}
          >
            <TabList p="20px" gap="6px" maxHeight={'500px'} overflow="auto">
              {Array.from({ length: 3 }).map((_, index) => (
                <Tab
                  style={{ textAlign: 'left' }}
                  key={index}
                  justifyContent={'start'}
                >
                  Problem {index + 1}
                </Tab>
              ))}
            </TabList>
            <Flex
              alignItems={'start'}
              gap="4px"
              flexDirection={'column'}
              p="20px"
            >
              <ConnectedWallets />
              <Flex
                onClick={() => {
                  window.open(
                    'https://github.com/TrustlessComputer/poc-practice',
                  );
                  tracking('POC_SET_UP_ENV');
                }}
                alignItems={'center'}
                gap="4px"
                py="7px"
                className={s.github}
              >
                <Image src="/hackathon/ic-github.svg" />
                <p>Github</p>
                <Image src="/hackathon/ic-link-gray.svg" />
              </Flex>
            </Flex>
          </Flex>
          <TabPanels p="16px" overflow="hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <TabPanel key={index}>
                <ProblemTemplate topic={`${(index % 3) + 1}`} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        {/* <ConnectedWallets /> */}
      </div>
      {/* <div className={s.footer}>
        <SubmitProblem code={tabIndex + 1} />
      </div> */}
    </div>
  );
};

export default Problems;
