import React, { PropsWithChildren, useEffect, useRef } from 'react';
import useAnimationStore from '@/stores/useAnimationStore';
import s from './styles.module.scss';
import { Portal } from '@chakra-ui/portal';

interface IProp extends PropsWithChildren {
  headings: string[];
  className: string
}

export default function HeadingText({ children, headings, className }: IProp) {
  const refSpan = useRef<HTMLSpanElement>(null);
  const reftime = useRef<NodeJS.Timeout>();
  const { play } = useAnimationStore();

  useEffect(() => {
    if (!refSpan.current || !play) return;

    const sentences = headings;

    let currentIndex = 0;
    let offset = 0;
    const sentenceElement = refSpan.current;
    let forwards = true;
    let skipCount = 0;
    const skipDelay = 30;
    const speed = 70;

    const updateSentence = () => {
      if (!sentenceElement) return;
      sentenceElement.innerHTML = sentences[currentIndex].substring(
        0,
        offset,
      );
    };

    const handleAnimation = () => {
      if (forwards) {
        if (offset >= sentences[currentIndex].length) {
          if (++skipCount === skipDelay) {
            forwards = false;
            skipCount = 0;
          }
        }
      } else if (offset === 0) {
        forwards = true;
        currentIndex = (currentIndex + 1) % sentences.length;
      }

      if (skipCount === 0) {
        forwards ? offset++ : offset--;
      }

      updateSentence();
    };

    reftime.current = setInterval(handleAnimation, speed);
    return () => {
      clearInterval(reftime.current);
    };
  }, [play]);


  return (
    <div className={`${s.heading} ${className}`}>
      {children}{' '}
      <b ref={refSpan}></b>
      <span className={s.heading_mouse}>_</span>
    </div>
  );
}
