import { MutableRefObject, useEffect, useRef } from 'react';
import { MathMap } from '@/utils/mathUtils';
import useAnimationStore from '@/stores/useAnimationStore';
import { useGSAP } from '@gsap/react';

interface IProps {
  trigger: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  customerStart?: string;
  isObserver?: boolean;
  start?: string;
  delay?: number,
  delayEnter?: number,
  horizontal?: boolean;
  initAnimation: () => void;
  playAnimation: (d?: number) => void;
}

export default function useAnimation({
                                       trigger,
                                       initAnimation,
                                       playAnimation,
                                       threshold,
                                       delay = 0,
                                       delayEnter = undefined,
                                     }: IProps): void {

  const { play, fontReady } = useAnimationStore();
  const refObserver = useRef<IntersectionObserver | null>(null);

  useGSAP(() => {
    initAnimation();
  }, { dependencies: [fontReady] });

  useGSAP(() => {

    if (!play || !trigger.current) return;
    let calcTheshold = threshold || 0;

    const { height, top } = trigger.current.getBoundingClientRect();
    if (calcTheshold === undefined) {

      if (top >= window.innerHeight) {
        calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
        calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
      }
    }

    refObserver.current = new IntersectionObserver(
      (entries) => {
        if ((entries[0] as any).isIntersecting && play) {

          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          const dl = scrollTop === 0 && top < window.innerHeight ? (delayEnter !==undefined ? delayEnter : delay) : delay;

          playAnimation(dl);
          trigger.current && refObserver.current?.unobserve(trigger.current);
          refObserver.current?.disconnect();
        }
      },
      { threshold: calcTheshold / 100 },
    );
    trigger.current &&
    refObserver.current?.observe(trigger.current);

    return () => {
      refObserver.current?.disconnect();
    };
  }, { dependencies: [play, fontReady] });

}
