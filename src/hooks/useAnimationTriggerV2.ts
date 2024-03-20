import { useGSAP } from '@gsap/react';
import { isPlayForPopupState, isPlayState } from '@layouts/Animation/animationSignal';
import useLoadManageSignal, { loadedSate } from '@layouts/Animation/loadManageSignal';
import { useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@utils/mathUtils';
import { useComputedDeps } from '@utils/signalUtils';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MutableRefObject, useEffect, useRef } from 'react';

import { IAnimationElement, IAnimationProps, IValueHookAnimation } from '@/types/animation';

interface IProps extends IAnimationProps, IValueHookAnimation {
  trigger: MutableRefObject<IAnimationElement | null>;
}

export default function useAnimationTriggerV2({
                                                trigger,
                                                initAnimation,
                                                playAnimation,
                                                isObserver,
                                                threshold,
                                                start,
                                                horizontal,
                                                markers,
                                                isInPopup,
                                              }: IProps): void {
  const refObserver = useRef<IntersectionObserver | null>(null);
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();

  const isPlayTrigger = useComputedDeps(() => {
    return (isPlayForPopupState.value && isInPopup) || isPlayState.value;
  }, [isInPopup]);
  const { contextSafe } = useGSAP({ scope: trigger });
  useEffect(() => {
    registerLoad();
    setTimeout(() => {
      unRegisterLoad();
    }, 10);
  });

  useSignalEffect(() => {
    if (loadedSate.value) {
      setTimeout(() => {
        initAnimation();
      }, 10);
    }
  });

  const onHandleAnimation = contextSafe((): (() => void) => {
    let calcTheshold = threshold || 0;
    let triggerTl: ScrollTrigger | null = null;
    if (calcTheshold === 0 && trigger.current) {
      const { height, top } = trigger.current.getBoundingClientRect();
      if (top >= window.innerHeight) {
        calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
        calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
      }
    }

    if (!isObserver) {
      triggerTl = ScrollTrigger.create({
        trigger: trigger.current,
        onEnter: () => playAnimation(),
        start: start || `top+=${calcTheshold}% bottom`,
        horizontal,
        once: true,
        markers: true,
      });
    } else {
      refObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            playAnimation();
            trigger.current && refObserver.current?.unobserve(trigger.current);
            refObserver.current?.disconnect();
          }
        },
        { threshold: calcTheshold / 100 },
      );
      trigger.current && refObserver.current?.observe(trigger.current);
    }

    return (): void => {
      trigger.current && refObserver.current?.unobserve(trigger.current);
      refObserver.current?.disconnect();
      triggerTl && triggerTl?.kill();
    };
  });

  useSignalEffect(() => {
    const clear = isPlayTrigger.value && onHandleAnimation() || null;
    return () => {
      clear && clear();
    };
  });
}
