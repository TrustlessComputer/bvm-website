'use client';

import { isPlayedState, isPlayState } from '@layouts/Animation/animationSignal';
import useLoadManageSignal from '@layouts/Animation/loadManageSignal';
import useLogicAnimate from '@layouts/Animation/useLogicAnimate';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import useWindowResize from '@hooks/useWindowResize';

interface IProp extends PropsWithChildren {
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  history.scrollRestoration = 'manual';

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}
export default function Animate({ children }: IProp): ReactElement {
  useLogicAnimate();
  const isFirstLoader = useSignal(true);
  const { scrollHeight } = useWindowResize();
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();
  useSignalEffect(() => {
    isFirstLoader.value = !isPlayedState.value && !isPlayState.value;
  });

  useSignalEffect(() => {
    scrollHeight.value && isPlayState.value && ScrollTrigger.refresh();
  });

  useSignalEffect(() => {
    if (isPlayState.value) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  });


  useEffect(() => {
    registerLoad();
    document.fonts.ready.then(() => {
      setTimeout(unRegisterLoad, 200);
    });

    return () => {
      unRegisterLoad();
    };
  });

  return (
    <main>
      {children}
    </main>
  );
}
