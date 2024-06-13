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
              paddingX
              imageRect
              landingData={Research}
              heading={<>Research</>}
              isLowercaseTitle
            >
              We believe that our research will eventually make Bitcoin vastly
              more useful than just a currency. We hope builders find our
              research he lpful and start building DeFi, Gaming, NFTs, Payments,
              DAOs, and more on Bitcoin.
            </LabContent>
          </div>
        );

      case 2:
        return (
          <div>
            <LabContent
              paddingX
              imageRect
              isTagFilled
              landingData={Modules}
              heading={<>Modules</>}
            >
              We build and open source project that advance Bitcoin ecosystem.
              We believe in doing so even when there may not be a direct
              commercial incentive.
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
