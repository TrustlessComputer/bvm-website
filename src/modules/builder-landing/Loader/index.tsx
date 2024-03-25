'use client';

import s from './styles.module.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import useAnimationStore from '@/stores/useAnimationStore';

export default function Loader() {

  const refContent = useRef<HTMLDivElement>(null);
  const { setPlay, setPlayed, fontReady } = useAnimationStore();

  useGSAP(() => {
    fontReady &&  gsap.fromTo(
      refContent.current,
      { pointerEvents: 'none' },
      {
        opacity: 0,
        delay: .4,
        ease: 'power3.inOut',
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setPlayed();
          if (refContent.current) refContent.current.style.display = 'none';
        },
      },
    );
    fontReady && setTimeout(setPlay, 300);
  }, { scope: refContent, dependencies:[fontReady] });


  return (
    <div ref={refContent} className={s.loader}>
    </div>
  );
}
