'use client';

import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import useCharsTyping from '@interactive/Signal/Chars/useCharsTyping';
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

export default function HeadingTyping({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  start,
  horizontal,
  onComplete,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  const { initAnimation, playAnimation } = useCharsTyping({
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
