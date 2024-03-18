'use client';

import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import LinesRandom from '@interactive/Signal/Lines/Random';
import { VIDEOS_CDN } from '@constants/common';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import Fade from '@interactive/Signal/Fade';

export default function OnChain(): React.JSX.Element {
  const refContainer = useRef<HTMLDivElement>(null);
  const router= useRouter();

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
              <p className={`${s.mainLable}`}>FULLY ONCHAIN AI</p>
            </LinesRandom>
            <HomeTitle className={`${s.mainHeading}`}>
              <span>Say hello</span> to decentralized AI.
            </HomeTitle>
            <LinesRandom>
              <p className={s.mainHeading_decs}>
                Powerful infrastructure, libraries, and tools to build AI smart
                contracts: AI decentralized applications that run exactly as
                programmed without the risk of being stopped, censored, or
                tricked.
              </p>
            </LinesRandom>
            <div className={s.mainHeading_buttons}>
             <Fade>
               <Button className={s.mainHeading_buttons_item} onClick={
                 ()=>{
                   router.push('/blockchains/customize')
                 }
               } isOrange>
                 Deploy an AI chain
               </Button>
             </Fade>
              {/*<Fade delayTrigger={.2}>*/}
              {/*  <Button className={s.mainHeading_buttons_item} isOrange>*/}
              {/*    Deploy an AI dapp*/}
              {/*  </Button>*/}
              {/*</Fade>*/}
            </div>
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
            {/* <LinesRandom>
              <p className={`${s.mainLable} ${s.mainLable__right}`}>BUILD UNSTOPPABLE AI</p>
            </LinesRandom>
            <LinesRandom>
              <p className={`${s.descImage}`}>
                Eternal AI is a Bitcoin L2 blockchain designed for AI smart contracts: AI applications that run exactly
                as programmed without the risk of being stopped, censored, or tricked. <br />It’s a safe and reliable
                way for everyone to use advanced AI.
              </p>
            </LinesRandom> */}
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}
