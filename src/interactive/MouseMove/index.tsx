'use client';

import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useRef } from 'react';

import s from './styles.module.scss';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import useMouse from '@/hooks/useMouse';
import { useGSAP } from '@gsap/react';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  velocity?: number;
  offset?: number;
  isObserver?: boolean;
}

export default function BoxParallaxMouseMove({
                                               children,
                                               velocity = -200,
                                               offset,
                                             }: ParagraphLineMaskProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refMask = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refSetter = useRef<{ qX: null | gsap.QuickToFunc; qY: null | gsap.QuickToFunc }>({
    qX: null,
    qY: null,
  });
  const refOffset = useRef<undefined | number>(offset);
  const mouse = useMouse();
  const isInview = useIsInViewport({ ref: refWrap, customOptions: { threshold: 0 } });

  useEffect(() => {

    // console.log('____isInview', isInview);
    // if (!isInview) return;
    const disX = mouse.x / window.innerWidth - 0.5;
    const disY = mouse.y / window.innerHeight - 0.5;
    if (refOffset.current) {
      refSetter.current.qX && refSetter.current.qX(disX * velocity * refOffset.current);
      refSetter.current.qY && refSetter.current.qY(disY * velocity * refOffset.current);
    }


  }, [mouse, velocity, isInview]);

  useGSAP(() => {
    refSetter.current.qX = gsap.quickTo(refWrap.current, 'x', {
      duration: 0.5,
      ease: 'power3',
    });
    refSetter.current.qY = gsap.quickTo(refWrap.current, 'y', {
      duration: 0.5,
      ease: 'power3',
    });
  }, { scope: refWrap });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div className={s.moueMove} ref={refWrap}>
      <div className={`${s.moueMove_mask} w-full h-full`} ref={refMask}>
        {React.cloneElement(children, { ...{ ref: refContent } })}
      </div>
    </div>
  );
}
