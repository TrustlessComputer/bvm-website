import { PropsWithChildren, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import useAnimation from '@/hooks/useAnimation';
import useWindowSize from '@/hooks/useWindowSize';
import { useGSAP } from '@gsap/react';

interface IProp extends PropsWithChildren {
  delay?: number;
  scale?: number;
}

export default function Scale({ children, delay, scale }: IProp) {
  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {
  }, { scope: refContent });

  const initAnimation = contextSafe((): void => {
    refContent.current &&
      gsap.set(refContent.current, {
        opacity: 0,
        scale: scale ? scale : 1.2,
      });
  });

  const playAnimation = contextSafe((): void => {
    refContent.current &&
      gsap.to(refContent.current, {
        opacity: 1,
        scale: 1,
        delay,
        ease: 'power3.out',
        duration: 0.8,
      });
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold: 30,
  });

  return (
    <div ref={refContent} className={'anim-scale'}>
      {children}
    </div>
  );
}
