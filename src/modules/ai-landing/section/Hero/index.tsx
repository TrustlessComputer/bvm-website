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
import ModalVideo from 'react-modal-video';

export default function Hero(): React.JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const refVideoBg = useRef<HTMLVideoElement>(null);
  const refVideoBgLoop = useRef<HTMLVideoElement>(null);
  const { contextSafe } = useGSAP({ scope: heroRef });
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

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
              <HomeTitle className={`${s.mainHeading}`}>
                Project Truly Open AI
              </HomeTitle>
              <Fade delayEnter={1.5}>
                <p className={s.desc}>
                  An open AI infrastructure that benefits humankind — owned by
                  none.
                </p>
              </Fade>
              <div className={`${s.wrapperBtn}`}>
                <Fade delayEnter={1.8}>
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
                <Fade delayEnter={2}>
                  <Button
                    onClick={() => {
                      window.open('https://bvm.network/blockchains/customize');
                    }}
                    className={`${s.btn}`}
                    isWhite
                  >
                    Deploy an AI chain
                  </Button>
                </Fade>
                {/* <Fade delayEnter={2}>
                  <Button
                    onClick={() => {
                      router.push('/use');
                    }}
                    className={`${s.btn}`}
                    isWhite
                  >
                   Deploy an AI dapp
                  </Button>
                </Fade> */}
              </div>

              <Fade delayEnter={2.2}>
                <div className={s.videoWrapper}>
                  <a
                    href={'#'}
                    onClick={() => setOpen(true)}
                    style={{ textAlign: 'center', display: 'block', position: 'relative' }}
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
              </Fade>
            </div>
          </HomeContainer>
          {/* <HeroLabel /> */}
          <ModalVideo
            channel='custom'
            url={'/public-sale/public_sale_video_2.mp4'}
            isOpen={isOpen}
            onClose={() => {
              setOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
