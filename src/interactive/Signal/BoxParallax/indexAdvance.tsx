'use client';

import { useGSAP } from '@gsap/react';
import useAnimationTriggerV2 from '@hooks/useAnimationTriggerV2';
import useBoxParallax from '@interactive/Signal/BoxParallax/useBoxParallax';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import React, { PropsWithChildren, useRef } from 'react';

import s from './styles.module.scss';

interface IBoxParallax extends PropsWithChildren {
  className?: string;
  offset?: number;
  isObserver?: boolean;
  isAnimation?: boolean;
  delayEnter?: number;
  delayTrigger?: number;
}

export default function BoxParallaxAdvance({
  children,
  className,
  offset,
  isAnimation,
  delayEnter,
  delayTrigger,
  isObserver,
}: IBoxParallax): React.ReactElement {
  const refWrap = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({ scope: refWrap });
  useBoxParallax({ refWrap, refContent, offset: offset || 0.5 });

  const initAnimation = contextSafe(() => {
    if (!isAnimation) return;
    gsap.set(refContent.current, { '--clipPath': ' inset(100% 0% 0% 0%)', scale: 1.2 });
  });

  const playAnimation = contextSafe(() => {
    if (!isAnimation) return;
    const delay = getDelay({ delayEnter, delayTrigger, refContentCurrent: refContent.current });
    gsap.fromTo(
      refContent.current,
      { '--clipPath': ' inset(100% 0% 0% 0%)', scale: 1.2 },
      {
        delay,
        '--clipPath': ' inset(0% 0% 0% 0%)',
        ease: 'power3.inOut',
        duration: 1,
      }
    );
  });

  useAnimationTriggerV2({
    trigger: refWrap,
    initAnimation,
    playAnimation,
    isObserver,
    threshold: 30,
  });

  return (
    <div className={`${s.boxParallax} ${className}`} ref={refWrap}>
      <div className={s.boxParallax_inner} ref={refContent}>
        {children}
      </div>
    </div>
  );
}
