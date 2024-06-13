import React, { PropsWithChildren, useEffect, useState, useRef } from 'react';
import s from './styles.module.scss';
import useLabStore from '../useLabStore';

interface IProp extends PropsWithChildren {
  first: string;
  headings: string[];
}

export default function HeadingText({ children, headings, first }: IProp) {
  const refSpan = useRef<HTMLSpanElement>(null);
  const refSpanFirst = useRef<HTMLSpanElement>(null);
  const reftime = useRef<NodeJS.Timeout>();
  const reftimeDelayFirst = useRef<NodeJS.Timeout>();

  const { isFirst, setIsFirst } = useLabStore();
  const [run, setRun] = useState<boolean>(isFirst);

  useEffect(() => {
    if (!refSpan.current || !run) return;

    const sentences = headings;

    let currentIndex = 0;
    let offset = 0;
    const sentenceElement = refSpan.current;
    let forwards = true;
    let skipCount = 0;
    const skipDelay = 30;
    const speed = 70;

    const updateSentence = () => {
      sentenceElement.textContent = sentences[currentIndex].substring(
        0,
        offset
      );
    };

    const handleAnimation = () => {
      if (forwards) {
        if (offset >= sentences[currentIndex].length) {
          setIsFirst();
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
  }, [run]);

  useEffect(() => {
    if (!refSpanFirst.current) return;

    const sentences = [first];

    let currentIndex = 0;
    let offset = 0;
    const sentenceElement = refSpanFirst.current;
    let forwards = true;
    let skipCount = 0;
    const skipDelay = 30;
    const speed = 70;

    const updateSentence = () => {
      sentenceElement.textContent = sentences[currentIndex].substring(
        0,
        offset
      );
    };

    const handleAnimation = () => {
      if (offset >= sentences[currentIndex].length) setRun(true);

      if (skipCount === 0) {
        offset++;
      }

      updateSentence();
    };

    reftimeDelayFirst.current = setTimeout(() => {
      reftime.current = setInterval(handleAnimation, speed);
    }, 200);
    return () => {
      reftimeDelayFirst.current && clearTimeout(reftimeDelayFirst.current);
      reftime.current && clearInterval(reftime.current);
    };
  }, []);

  return (
    <span className={s.heading}>
      {!run && (
        <>
          <span ref={refSpanFirst}></span>
          <span className={s.heading_mouse}>_</span>
        </>
      )}
      {run && first}
      <br />
      <span ref={refSpan}></span>
      {run && <span className={s.heading_mouse}>_</span>}
    </span>
  );
}
