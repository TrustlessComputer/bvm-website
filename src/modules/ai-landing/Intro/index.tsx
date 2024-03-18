'use client';

import { VIDEOS_CDN } from '@constants/common';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import s from './styles.module.scss';
import { gsap } from 'gsap';
import Image from 'next/image';
import useAnimationSignal from '@layouts/Animation/animationSignal';
import useCharsTyping from '@interactive/Signal/Chars/useCharsTyping';
import HomeContainer from '../components/HomeContainer';

export default function Intro() {
  const refContent = useRef<HTMLDivElement>(null);
  const refDesc = useRef<HTMLDivElement>(null);
  const refDescScan = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const refLooping = useRef<HTMLSpanElement>(null);

  const finalRef = useRef<HTMLDivElement>(null);
  const btSkipRef = useRef<HTMLButtonElement>(null);

  const refVideoScaled = useRef<HTMLVideoElement>(null);
  const refVideoArt = useRef<HTMLDivElement>(null);

  const { play, setPlayed } = useAnimationSignal();
  const { initAnimation, playAnimation } = useCharsTyping({
    refContent: refDesc,
  });

  const { initAnimation: intDescScanned, playAnimation: playDescScanned } = useCharsTyping({
    refContent: refDescScan,
  });

  const { initAnimation: intFinnalText, playAnimation: playFinnalText } = useCharsTyping({
    refContent: finalRef,
  });

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(refVideoArt.current, { opacity: 0 });
      initAnimation();
      intDescScanned();
      intFinnalText();

      playAnimation();
      canPlay();
      refVideoScaled.current?.addEventListener('canplay', hideLoad);
      refVideoScaled.current?.addEventListener('ended', scanned);
      return () => {
        refVideoScaled.current?.removeEventListener('canplay', hideLoad);
        refVideoScaled.current?.removeEventListener('ended', scanned);
      };
    },
    { scope: refContent },
  );

  const hideLoad = () => {
    refLooping.current?.classList.add(s.isDone);
    refContent.current?.classList.add(s.isDone);
  };

  const canPlay = contextSafe(() => {
    gsap.to(refVideoArt.current, {
      opacity: 1, ease: 'power3.inOut', duration: 3,
      onComplete: () => {
        refVideoScaled.current?.play();
      },
    });
  });

  const introDonned = contextSafe(() => {
    play();
    setPlayed();
    localStorage.setItem('isLoaded', '1');
    gsap.set(refContent.current, { display: 'none' });
  });

  const scanned = contextSafe(() => {

    const tl = gsap.timeline();
    tl.to(refDesc.current, {
      opacity: 0,
      ease: 'power3.out',
      duration: 0.4,
      onStart: playDescScanned,
    });

    tl.to(finalRef.current, {
      opacity: 1,
      delay: .5,
      ease: 'power3.out',
      duration: 0.4,
      onStart: () => {
        playFinnalText();
      },
    });

    tl.to([refDescScan.current, finalRef.current, btSkipRef.current], {
      opacity: 0,
      ease: 'power3.out',
      duration: 0.4,
      delay: 3,
    });

    tl.to(refInner.current, {
      scale: 0, ease: 'power3.inOut', duration: 1.2, onComplete: () => {
        introDonned();
      },
    });

  });

  const skip = (): void => {
    gsap.to(refContent.current, {
      opacity: 0, duration: .5, ease: 'power3.inOut', onComplete: () => {
        introDonned();
      },
    });
  };

  return (
    <div className={s.intro} ref={refContent}>
      <HomeContainer className={s.container}>
        <div className={s.inner} ref={refInner}>
          <div className={s.content}>
            <div className={s.desc}>
              <div ref={refDesc} className={s.desc_inner}>
                <p> Last year,</p>
                <p>we planted a seed: Perceptrons.</p>
                <p>A glimpse into AI's potential on-chain.</p>
                <span ref={refLooping} className={s.looping}>_</span>
              </div>
              <div className={`${s.desc_scan} ${s.desc}`} ref={refDescScan}>
                <p>NOW,</p>
                <p>that seed evolves...</p>
              </div>
            </div>
          </div>
          <div ref={refVideoArt} className={s.videos}>
            <div className={s.videos_bg} />
            <div className={`${s.video}`}>
              <video
                poster={'/images/preloader-poster.jpeg'}
                ref={refVideoScaled}
                // src={`${VIDEOS_CDN}/combine-resized-new-async-2-optimized.mp4`}
                preload={'auto'}
                muted
                playsInline
              >
                <source src={`${VIDEOS_CDN}/combine-resized-new-async-2-optimized.webm`} type="video/webm" />
                <source src={`${VIDEOS_CDN}/combine-resized-new-async-2-optimized.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>
          <div ref={finalRef} className={`${s.final}`}>
            <Image
              src={'/svg/icon-sound.svg'}
              alt={'icon-sound.svg'}
              width={20}
              height={17}
            />
            <p>ETERNAL.AI-<b>truly Open AI</b></p>
          </div>
        </div>
        <button className={s.skip} ref={btSkipRef} onClick={skip}>Skip</button>
      </HomeContainer>
    </div>
  );
}
