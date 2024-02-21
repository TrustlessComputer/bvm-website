import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import useAnimation from '@/hooks/useAnimation';
import s from './styles.module.scss';
import { gsap } from 'gsap';

interface IProps extends PropsWithChildren {
  delay?: number,
  className?: string,
  from?: gsap.TweenVars
  to?: gsap.TweenVars
};

export default function Fade({ children, delay, from, to, className }: IProps) {
  const refContent = useRef<HTMLDivElement>(null);

  const initAnimation = useCallback((): void => {
    refContent.current && gsap.set(refContent.current, {...{ opacity: 0 },...from});
  }, []);

  const playAnimation = useCallback((): void => {
    refContent.current && gsap.to(refContent.current, {...{ opacity: 1, delay, ease: 'power3.out', duration: .8 },...to});
  }, []);

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold: 30,
  });

  return <div ref={refContent} className={`${s.fade} fade ${className}`}>
    {children}
  </div>;
}
