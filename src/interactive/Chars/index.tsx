import useAnimation from '@/hooks/useAnimation';
import { gsap } from 'gsap';
import { PropsWithChildren, useCallback, useRef } from 'react';
import SplitType from 'split-type';
import s from './styles.module.scss';
import { useGSAP } from '@gsap/react';

interface IProp extends PropsWithChildren {
  classNames?: string;
  delay?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  classNames?: string
}

export default function Chars({ children, delay = 0, from, to, classNames }: IProp) {
  const refContent = useRef<HTMLDivElement>(null);
  const refChars = useRef<any>();
  const { contextSafe } = useGSAP(() => {
  }, { scope: refContent });

  const initAnimation = contextSafe(() => {
    if (!refContent.current) return;
    const text = new SplitType(refContent.current, { types: 'words,chars' });
    gsap.set(text.chars, { ...{ opacity: 0 }, ...from });
    refChars.current = text.chars;
  });

  const playAnimation = contextSafe(() => {
    refChars.current &&
    gsap.to(refChars.current, {
      ...{
        opacity: 1,
        ease: 'power3.inOut',
        duration: 0.8,
        delay,
        stagger: {
          from: 'random',
          amount: 0.3,
        },
      }, ...to,
    });
  });

  useAnimation({
    trigger: refContent,
    playAnimation,
    initAnimation,
    threshold: 50,
  });

  return (
    <div ref={refContent} className={`${s.chars} ${classNames}`}>
      {children}
    </div>
  );
}
