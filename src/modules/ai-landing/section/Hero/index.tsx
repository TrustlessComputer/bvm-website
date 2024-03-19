'use client';

import Fade from '@/interactive/Signal/Fade';
import Button from '../../components/Button';
import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import { VIDEOS_CDN } from '@constants/common';
import { useGSAP } from '@gsap/react';
import { isPlayState } from '@layouts/Animation/animationSignal';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { useRef, useState } from 'react';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import HeroLabel from '../../components/HeroLabel';

export default function Hero(): React.JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const refVideoBg = useRef<HTMLVideoElement>(null);
  const refVideoBgLoop = useRef<HTMLVideoElement>(null);
  const { contextSafe } = useGSAP({ scope: heroRef });
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const DELAY = 2;

  const onEnedVideo = contextSafe(() => {
    gsap.to(refVideoBgLoop.current, {
      opacity: 1,
      ease: 'power3.out',
      duration: 0.4,
    });
    gsap.to(refVideoBg.current, {
      opacity: 0,
      ease: 'power3.out',
      delay: 0.1,
      duration: 0.4,
    });
  });

  const onTimeupdate = () => {
    if (refVideoBg.current && refVideoBg.current?.currentTime > 8) {
      refVideoBg.current?.removeEventListener('timeupdate', onTimeupdate);
      onEnedVideo();
    }
  };

  const animationIn = contextSafe(() => {
    gsap.fromTo(
      refVideoBg.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power3.inOut' },
    );
  });

  useSignalEffect(() => {
    if (isPlayState.value) {
      animationIn();
      refVideoBg.current?.addEventListener('timeupdate', onTimeupdate);
      refVideoBg.current?.play();
      refVideoBgLoop.current?.play();
      setTimeout(() => {
        heroRef.current?.classList.add(s.blur);
      }, 4000);
    }
  });
  return (
    <>
      <div className={`${s.hero}`} ref={heroRef}>
        <div className={s.hero_parallax}>
          <video
            ref={refVideoBg}
            width={10}
            height={10}
            className={s.hero_bg}
            src={`${VIDEOS_CDN}/LP_Banner_03.mp4`}
            preload={'auto'}
            playsInline
            muted
          />
          <video
            ref={refVideoBgLoop}
            width={10}
            height={10}
            className={`${s.hero_bg} ${s.hero_bg__loop}`}
            src={`${VIDEOS_CDN}/lp_banner_loop_hero.mp4`}
            loop
            preload={'auto'}
            playsInline
            muted
          />

          <HomeContainer className={`${s.container}`}>
            <div className={`${s.contentWrapper}`}>
              <HomeTitle delayEnter={DELAY} className={`${s.mainHeading}`}>
                <span>Project</span> Truly Open AI
              </HomeTitle>
              <Fade delayEnter={DELAY + .1}>
                <p className={s.desc}>
                  An open AI infrastructure that benefits all humankind and is
                  owned by none.
                </p>
              </Fade>
              <div className={`${s.wrapperBtn}`}>
                <Fade delayEnter={DELAY + .2}>
                  <Button
                    onClick={() => {
                      window.open('https://eternalai.org/');
                    }}
                    isOrange={true}
                    className={`${s.btn}`}
                  >
                    Explore demos
                  </Button>
                  {/*<Button onClick={()=>{*/}
                  {/*  window.open('https://nakachain.xyz/launchpad')*/}
                  {/*}} isWhite={true} className={`${s.btn}`}>*/}
                  {/*  Launchpad*/}
                  {/*</Button>*/}
                </Fade>
                <Fade delayEnter={DELAY + .3}>
                  <Button
                    onClick={() => {
                      router.push('/blockchains/customize');
                    }}
                    className={`${s.btn}`}
                    isWhite
                  >
                    Deploy an AI chain
                  </Button>
                </Fade>
                <Fade delayEnter={DELAY + .4}>
                  <Button
                    onClick={() => {
                      window.open('https://docs.bvm.network/bvm/build-ai-on-bitcoin/decentralized-ai-beginner')
                    }}
                    className={`${s.btn}`}
                    isWhite
                  >
                   Deploy an AI dapp
                  </Button>
                </Fade>
              </div>
              <Fade delayEnter={DELAY + .4}>
                <div className={s.whitepaperWrap}>
                  <a className={s.whitepaper} href='/ai/whitepaper.pdf' target={'_blank'}>Read the whitepaper
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M9.99978 16.7498C9.80778 16.7498 9.61575 16.6768 9.46975 16.5298C9.17675 16.2368 9.17675 15.7618 9.46975 15.4688L12.9397 11.9988L9.46975 8.52883C9.17675 8.23583 9.17675 7.7608 9.46975 7.4678C9.76275 7.1748 10.2378 7.1748 10.5308 7.4678L14.5308 11.4678C14.8238 11.7608 14.8238 12.2358 14.5308 12.5288L10.5308 16.5288C10.3838 16.6768 10.1918 16.7498 9.99978 16.7498Z'
                        fill='white' />
                    </svg>
                  </a>
                </div>
              </Fade>

              {/* <Fade delayEnter={2.2}>
                <div className={s.videoWrapper}>
                  <a
                    href={'#'}
                    onClick={() => setOpen(true)}
                    style={{ display: 'block', position: 'relative' }}
                  >
                    <p className={s.videoWrapper_text}>Watch the film</p>
                    <img
                      src={`/ai-landing/btn-video.png`}
                      width={224}
                      alt={'right'}
                      style={{ margin: 'auto', marginBottom: '8px' }}
                    />
                  </a>
                </div>
              </Fade> */}
              <Fade delayEnter={DELAY + .5}>
                <div><HeroLabel /></div>
              </Fade>
            </div>
          </HomeContainer>
          {/*<ModalVideo*/}
          {/*  channel="custom"*/}
          {/*  url={`${VIDEOS_CDN}/Intro_ver03_02.mp4`}*/}
          {/*  isOpen={isOpen}*/}
          {/*  onClose={() => {*/}
          {/*    setOpen(false);*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      </div>
    </>
  );
}
