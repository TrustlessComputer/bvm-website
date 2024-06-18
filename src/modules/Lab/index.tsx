'use client';

import { ReactElement, useMemo } from 'react';
import HeadingText from './HeadingText';
import LabContent from './LabContent';
import { Modules, Portfolio, Research } from './data';
import s from './style.module.scss';

const Lab = ({ tab, isDark }: { tab: number; isDark: boolean }) => {
  const TabContent = (): ReactElement => {
    switch (tab) {
      case 1:
        return (
          <div>
            <LabContent
              imageRect
              landingData={Research}
              heading={<>Research</>}
              isLowercaseTitle
            >
              We believe our research will eventually lead to making Bitcoin
              vastly more useful than just a currency. We hope to see DeFi,
              Gaming, NFTs, Payments, and DAOs, among other user on Bitcoin
              soon.
            </LabContent>
          </div>
        );

      case 2:
        return (
          <div>
            <LabContent
              imageRect
              isTagFilled
              landingData={Modules}
              isFilter={true}
              heading={<>Modules</>}
            >
              We partner with bold builders to build apps and protocols that
              reinvent Bitcoin. As technical investors, we invest at the
              earliest stage and take a hands-on approach to help builders build
              and launch.
            </LabContent>
          </div>
        );

      default:
        return (
          <div>
            <LabContent
              isHaveNumber
              heading={
                <>
                  <HeadingText
                    first={'Chains'}
                    headings={[
                      '',
                      // 'Chains',
                      // 'DeFi on Bitcoin',
                      // 'NFTs on Bitcoin',
                      // 'Gaming on Bitcoin',
                      // 'AI on Bitcoin',
                      // 'DAOs on Bitcoin',
                    ]}
                  />
                </>
              }
              landingData={Portfolio}
            >
              We partner with bold builders to build apps and protocols that
              reinvent Bitcoin. As technical investors, we invest at the
              earliest stage and take a hands-on approach to help builders build
              and launch.
            </LabContent>
          </div>
        );
    }
  };
  const background = useMemo(() => {
    if (isDark) {
      return '#000';
    } else {
      if (tab === 2) {
        return '#fff';
      } else {
        return '#fff';
      }
    }
  }, [tab]);

  const TAB_LIST = [
    'ALL',
    'Data Validity',
    'Data Availability',
    'CROSS-CHAIN BRIDGES',
    'Rollup protocol',
  ];

  return (
    <div
      className={`${s.lab} ${isDark && s.darkTheme}`}
      style={{ backgroundColor: background }}
    >
      {/* <LabHeader
        setTab={setTab}
        setIsDark={setIsDark}
        bgColor={background}
        tab={tab}
      /> */}
      <TabContent />
    </div>
  );
};

export default Lab;
