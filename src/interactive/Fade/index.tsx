import { PropsWithChildren, useRef } from 'react';
import useAnimation from '@/hooks/useAnimation';
import s from './styles.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface IProps extends PropsWithChildren {
  delay?: number,
  delayEnter?: number,
  className?: string,
  from?: gsap.TweenVars
  to?: gsap.TweenVars
};

export default function Fade({ children, delay, delayEnter = undefined, from, to, className }: IProps) {
  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  const initAnimation = contextSafe((): void => {
    refContent.current && gsap.set(refContent.current, { ...{ opacity: 0 }, ...from });
  });

  const playAnimation = contextSafe((dl = 0): void => {

    refContent.current && gsap.to(refContent.current, {
      ...{
        opacity: 1,
        delay: dl,
        ease: 'power3.out',
        duration: .8,
      }, ...to,
    });
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold: 30,
    delayEnter,
    delay,
  });

  return <div ref={refContent} className={`${s.fade} fade ${className}`}>
    {children}
  </div>;
}
