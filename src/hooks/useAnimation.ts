import { MutableRefObject, useEffect, useRef } from 'react';
import {MathMap} from "@/utils/mathUtils";
import useAnimationStore from '@/stores/useAnimationStore';

interface IProps {
  trigger: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  customerStart?: string;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  initAnimation: () => void;
  playAnimation: () => void;
}

export default function useAnimation({
  trigger,
  initAnimation,
  playAnimation,
  threshold,
}: IProps): void {

  const {play} = useAnimationStore();
  const refObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
     initAnimation();
  }, [initAnimation]);

  useEffect(() => {

      let calcTheshold = threshold || 0;

      if (calcTheshold === undefined && trigger.current) {
        const { height, top } = trigger.current.getBoundingClientRect();
        if (top >= window.innerHeight) {
          calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
          calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
        }
      }

      refObserver.current = new IntersectionObserver(
        (entries) => {
          if ((entries[0] as any).isIntersecting && play) {
            playAnimation();
            trigger.current && refObserver.current?.unobserve(trigger.current);
            refObserver.current?.disconnect();
          }
        },
        { threshold: calcTheshold / 100 }
      );
      trigger.current &&
      refObserver.current?.observe(trigger.current);

    return () => {
      refObserver.current?.disconnect();
    };
  }, [play, playAnimation]);

}
