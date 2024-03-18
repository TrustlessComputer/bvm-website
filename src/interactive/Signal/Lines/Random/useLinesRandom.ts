import { useGSAP } from '@gsap/react';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import s from './styles.module.scss';

interface IUseHeadingChars {
  refContent: MutableRefObject<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | null
  >;
  delayTrigger?: number;
  delayEnter?: number;
  offset?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  onComplete?: () => void;
}

export default function useLinesRandom({
                                         refContent,
                                         delayTrigger = 0,
                                         delayEnter = 0,
                                         offset = 0,
                                         isObserver,
                                         start,
                                         horizontal,
                                         onComplete,
                                       }: IUseHeadingChars): {
  playAnimation: () => void;
  initAnimation: () => void;
} {
  const { contextSafe } = useGSAP({ scope: refContent });
  const initAnimation = contextSafe(() => {
    refContent.current?.classList.add(s.linesRandom);
    gsap.set(refContent.current, { opacity: 0, y: 10, overwrite: 'auto' });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({
      refContentCurrent: refContent.current,
      delayEnter,
      delayTrigger,
    });

    gsap.to(refContent.current, {
      opacity: 1,
      duration: 0.5,
      y: 0,
      ease: 'power3.inOut',
      delay: offset ? -offset : delay,
      overwrite: 'auto',
      onComplete,
    });
  });

  return { playAnimation, initAnimation };
}
