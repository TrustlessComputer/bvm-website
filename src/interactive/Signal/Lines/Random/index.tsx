'use client';

import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import useLinesRandom from '@interactive/Signal/Lines/Random/useLinesRandom';
import useAnimationTriggerV2 from '@/hooks/useAnimationTriggerV2';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  onComplete?: () => void;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function LinesRandom({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  start,
  horizontal,
  onComplete,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  const { initAnimation, playAnimation } = useLinesRandom({
    refContent,
    delayTrigger,
    delayEnter,
    isObserver,
    start,
    horizontal,
    onComplete,
  });

  useAnimationTriggerV2({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    start,
    horizontal,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
