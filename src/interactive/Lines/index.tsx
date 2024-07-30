import { PropsWithChildren, useCallback, useRef } from 'react';
import s from './styles.module.scss';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import useAnimation from '@/hooks/useAnimation';
import { useGSAP } from '@gsap/react';

interface IProp extends PropsWithChildren {
  delay?: number;
  delayEnter?: number;
  from?: gsap.TweenVars
  to?: gsap.TweenVars
};
export default function Lines({ children, delay, delayEnter = undefined, from, to }: IProp) {
  const refContent = useRef<HTMLDivElement>(null);
  const refWords = useRef<any>();
  const { contextSafe } = useGSAP(() => {
  }, { scope: refContent });

  const initAnimation = contextSafe(() => {
    if (!refContent.current) return;
    const text = new SplitType(refContent.current, { types: 'words' });
    gsap.set(text.words, { ...{ opacity: 0, y: '50%' }, ...from });
    refWords.current = text.words;
  });

  const playAnimation = contextSafe((dl = 0) => {
    refWords.current && gsap.to(refWords.current, {
      ...{
        delay: dl,
        opacity: 1, y: '0%', ease: 'power3.out', duration: .6, stagger: .005,
      }, ...to,
    });
  });

  useAnimation({
    trigger: refContent,
    playAnimation,
    initAnimation,
    threshold: 50,
    delayEnter,
    delay
  });

  return <div ref={refContent} className={s.chars}>
    {children}
  </div>;
}
