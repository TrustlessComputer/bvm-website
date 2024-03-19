import { useGSAP } from '@gsap/react';
import useAnimationTriggerV2 from '@hooks/useAnimationTriggerV2';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';
import SplitType from 'split-type';

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

export default function useCharsTyping({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
  isObserver,
  start,
  horizontal,
  onComplete,
}: IUseHeadingChars): {
  initAnimation: () => void;
  playAnimation: (timeScale?: number) => void;
} {
  const { contextSafe } = useGSAP({ scope: refContent });
  const refText = useRef<SplitType | null>(null);

  const initAnimation = contextSafe(() => {
    refContent.current?.classList.add(s.headingChars);
    refText.current = new SplitType(refContent.current as HTMLElement, {
      types: 'words,chars',
    });
    gsap.killTweensOf(refText.current?.chars);
    gsap.set(refText.current?.chars, { opacity: 0 });
  });

  const playAnimation = contextSafe((timeScale: number = 1) => {
    const delay = getDelay({
      refContentCurrent: refContent.current,
      delayEnter,
      delayTrigger,
    });
    refText.current?.chars &&
      gsap.to(refText.current.chars, {
        stagger: 0.03 * timeScale,
        opacity: 1,
        duration: 0.03 * timeScale,
        ease: 'power3.out',
        delay: offset ? -offset : delay,
        overwrite: 'auto',
        onComplete,
      });
  });

  return {
    initAnimation,
    playAnimation,
  };
}
