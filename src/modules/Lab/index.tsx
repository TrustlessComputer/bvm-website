'use client';

import React, { ReactElement, useMemo, useState } from 'react';
import s from './style.module.scss';
import LabContent from './LabContent';
import { OpenSource, Portfolio, Research } from './data';
import HeadingText from './HeadingText';
import LabHeader from './LabHeader';

const Lab = ({ tab, isDark }: { tab: number; isDark: boolean }) => {
  const TabContent = (): ReactElement => {
    switch (tab) {
      case 1:
        return (
          <div>
            <LabContent
              landingData={Research}
              heading={<>Research</>}
              isLowercaseTitle
            >
              We believe that our research will eventually make Bitcoin vastly
              more useful than just a currency. We hope builders find our
              research helpful and start building DeFi, Gaming, NFTs, Payments,
              DAOs, and more on Bitcoin.
            </LabContent>
          </div>
        );

      case 2:
        return (
          <div>
            <LabContent
              landingData={OpenSource}
              heading={
                <>
                  Building
                  <br /> open-source projects
                </>
              }
            >
              We hope to make a contribution to the Bitcoin ecosystem by
              actively releasing open-source projects so builders can experiment
              and build with them.
            </LabContent>
          </div>
        );

      default:
        return (
          <div>
            <LabContent
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
        return '#F3F1E8';
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
