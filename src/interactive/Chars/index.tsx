import useAnimation from '@/hooks/useAnimation';
import { gsap } from 'gsap';
import { PropsWithChildren, useCallback, useRef } from 'react';
import SplitType from 'split-type';
import s from './styles.module.scss';

interface IProp extends PropsWithChildren {
  delay?: number;
}
export default function Chars({ children, delay = 0 }: IProp) {
  const refContent = useRef<HTMLDivElement>(null);
  const refChars = useRef<any>();

  const initAnimation = useCallback(() => {
    if (!refContent.current) return;
    const text = new SplitType(refContent.current, { types: 'words,chars' });
    gsap.set(text.chars, { opacity: 0 });
    refChars.current = text.chars;
  }, []);

  const playAnimation = useCallback(() => {
    refChars.current &&
      gsap.to(refChars.current, {
        opacity: 1,
        ease: 'power3.inOut',
        duration: 0.8,
        delay,
        stagger: {
          from: 'random',
          amount: 0.3,
        },
      });
  }, []);

  useAnimation({
    trigger: refContent,
    playAnimation,
    initAnimation,
    threshold: 50,
  });

  return (
    <div ref={refContent} className={s.chars}>
      {children}
    </div>
  );
}
