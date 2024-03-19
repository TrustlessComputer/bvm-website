'use client';

import { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import useAnimationSignal from '@layouts/Animation/animationSignal';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Loader() {
  const { play, setPlayed } = useAnimationSignal();
  const timeRef = useRef<NodeJS.Timeout>();
  const refLoader = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    timeRef.current = setTimeout(() => {
      gsap.to(refLoader.current, {
        opacity: 0, ease: 'power3.inOut', duration: 1,
        onComplete: () => {
          play();
          setPlayed();
          if (refLoader.current) refLoader.current.style.display = 'none';
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeRef.current);
    };
  }, { scope: refLoader });
  return <div ref={refLoader} className={s.loader} />;
}
