'use client';

import useHeadingChars from '@interactive/Signal/Chars/useHeadingChars';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  onComplete?: () => void;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function HeadingChars({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  start,
  horizontal,
  onComplete,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  useHeadingChars({
    refContent,
    delayTrigger,
    delayEnter,
    isObserver,
    start,
    horizontal,
    onComplete,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
