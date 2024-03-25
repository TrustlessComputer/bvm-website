'use client';

import useAnimationTriggerV2 from '@hooks/useAnimationTriggerV2';
import useFade from '@interactive/Signal/Fade/useFade';
import React, { PropsWithChildren, useRef } from 'react';

import { IAnimationElement, IAnimationProps } from '@/types/animation';

interface IFade extends PropsWithChildren, IAnimationProps {
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  from?: string;
}

export default function Fade({
  direction = 'none',
  delayTrigger,
  delayEnter,
  children,
  duration,
  from,
  isObserver,
  start,
  horizontal,
  threshold,
}: IFade): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useFade({
    refContent,
    delayTrigger,
    delayEnter,
    direction,
    duration,
    from,
  });

  useAnimationTriggerV2({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    threshold,
    start,
    horizontal,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
