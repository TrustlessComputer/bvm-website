'use client';

import { useIsMobile } from '@hooks/useWindowResize';
import BoxParallaxAdvance from '@interactive/Signal/BoxParallax/indexAdvance';
import BoxParallaxLite from '@interactive/Signal/BoxParallax/indexLite';
import React, { PropsWithChildren } from 'react';

interface IBoxParallax extends PropsWithChildren {
  className?: string;
  offset?: number;
  isObserver?: boolean;
  isAnimation?: boolean;
  delayEnter?: number;
  delayTrigger?: number;
}

export default function BoxParallax(props: IBoxParallax): React.ReactElement {
  const isMobile = useIsMobile();
  return isMobile ? <BoxParallaxLite {...props} /> : <BoxParallaxAdvance {...props} />;
}
