'use client';

import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import LinesRandom from '@interactive/Signal/Lines/Random';
import { VIDEOS_CDN } from '@constants/common';

export default function OnChain(): React.JSX.Element {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // hande center content
    if (!refContainer.current) return;
    const height = window.innerHeight as number;
    const heightContainer = refContainer.current?.clientHeight as number;
    const heightHeader = 60;
    const topContainer = (height - heightContainer - heightHeader) / 2;
    refContainer.current.style.top = `${topContainer + heightHeader}px`;
  }, [refContainer.current]);
  return (
    <div className={`${s.wrapper}`}>
      <HomeContainer className={`${s.container}`} ref={refContainer}>
        <div className={`${s.wrapperContent}`}>
          <div className={`${s.left}`}>
            <LinesRandom>
              <p className={`${s.mainLable}`}>Welcome to The Future of Decentralized AI</p>
            </LinesRandom>

            <HomeTitle className={`${s.mainHeading}`}>
              Say Hello to <br /> <span>fully onchain</span> ai
            </HomeTitle>
          </div>

          <div className={`${s.right}`}>
            <div className={s.right_inner}>
              <video
                src={`${VIDEOS_CDN}/hero-video_v2.mp4`}
                preload={'auto'}
                autoPlay
                muted
                playsInline
                loop
              />
            </div>
            <LinesRandom>
              <p className={`${s.mainLable} ${s.mainLable__right}`}>BUILD UNSTOPPABLE AI</p>
            </LinesRandom>
            <LinesRandom>
              <p className={`${s.descImage}`}>
                Eternal AI is a Bitcoin L2 blockchain designed for AI smart contracts: AI applications that run exactly
                as programmed without the risk of being stopped, censored, or tricked. <br />It’s a safe and reliable
                way for everyone to use advanced AI.
              </p>
            </LinesRandom>
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}
