'use client';

import useAnimationSignal from '@layouts/Animation/animationSignal';
import useLoadManageSignal from '@layouts/Animation/loadManageSignal';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function useLogicAnimate(): void {
  const pathName = usePathname();
  const { reset: resetAnimation, resetForPopup } = useAnimationSignal();
  const refTime = useRef<NodeJS.Timeout>();
  const { reset: resetLoader, registerLoad, unRegisterLoad } = useLoadManageSignal();

  useEffect(() => {
    resetLoader();
    resetForPopup();
    resetAnimation();

    //quickLoaded
    registerLoad();
    refTime.current = setTimeout(unRegisterLoad, 300);
    return (): void => {
      refTime.current && clearTimeout(refTime.current);
      unRegisterLoad();
    };
  }, [pathName]);
}
