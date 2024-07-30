import { useGSAP } from '@gsap/react';
import useAnimationTriggerV2 from '@hooks/useAnimationTriggerV2';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';
import SplitType from 'split-type';

import s from './styles.module.scss';

interface IUseHeadingChars {
  refContent: MutableRefObject<HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  offset?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  onComplete?: () => void;
}

export default function useHeadingChars({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
  isObserver,
  start,
  horizontal,
  onComplete,
}: IUseHeadingChars): void {
  const { contextSafe } = useGSAP({ scope: refContent });
  const refText = useRef<SplitType | null>(null);

  const initAnimation = contextSafe(() => {
    refContent.current?.classList.add(s.headingChars);
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words,chars' });
    gsap.killTweensOf(refText.current?.words);
    gsap.set(refText.current?.chars, { opacity: 0 });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    refText.current?.words &&
      gsap.to(refText.current.words, {
        stagger: 0.015,
        y: '0%',
        duration: 1.6,
        ease: 'power3.out',
        delay: offset ? -offset : delay,
        overwrite: 'auto',
        onComplete,
      });
  });

  useAnimationTriggerV2({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    start,
    horizontal,
  });
}
