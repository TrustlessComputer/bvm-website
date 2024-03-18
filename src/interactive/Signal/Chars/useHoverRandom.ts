import { MutableRefObject, useRef } from 'react';

type IUseHoverRandom = {
  refText: MutableRefObject<HTMLDivElement | HTMLButtonElement | null>
}

export default function useHoverRandom({ refText }: IUseHoverRandom) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
  const refInterval = useRef<NodeJS.Timeout>();
  const refClear = useRef<NodeJS.Timeout>();
  const refIteration = useRef<number>(0);
  const refOriginText = useRef<string | null>(null);

  const onHover = () => {
    if (!refText.current) return;

    refClear.current && clearTimeout(refClear.current);
    refInterval.current && clearInterval(refInterval.current);
    refIteration.current = 0;
    if (!refOriginText.current) {
      refOriginText.current = refText.current.innerText || '';
    }

    refInterval.current = setInterval(() => {
      if (!refText.current) return;

      refText.current.innerText = refText.current.innerText
        .split('')
        .map((letter, index) => {
          if (index < refIteration.current) {
            return refOriginText?.current ? refOriginText?.current[index] : '';
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');
    }, 30);

    refClear.current = setTimeout(() => {
      if (refText.current) {
        refText.current.innerText = refOriginText.current || '';
      }
      clearInterval(refInterval.current);
    }, 400);
  };


  return { onHover };
}
