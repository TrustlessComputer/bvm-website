'use client';

import React, { ReactElement, useMemo, useState } from 'react';
import s from './style.module.scss';
import LabContent from './LabContent';
import { OpenSource, Portfolio, Research } from './data';
import HeadingText from './HeadingText';
import LabHeader from './LabHeader';

const Lab = () => {
  const [tab, setTab] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);
  const TabContent = (): ReactElement => {
    switch (tab) {
      case 1:
        return (
          <div>
            <LabContent
              landingData={Research}
              heading={
                <>
                  Pioneering research <br /> on Bitcoin
                </>
              }
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
                    first={'Welcome to '}
                    headings={[
                      'the future of Bitcoin',
                      'DeFi on Bitcoin',
                      'NFTs on Bitcoin',
                      'Gaming on Bitcoin',
                      'AI on Bitcoin',
                      'DAOs on Bitcoin',
                    ]}
                  />
                </>
              }
              landingData={Portfolio}
            >
              We back bold founders building the future of Bitcoin. As technical
              investors, we conduct cutting-edge research on Bitcoin, open
              source most of our work so builders can build with them, and roll
              up our sleeves to assist founders in building their products.
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
