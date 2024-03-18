import React, { useEffect, useRef } from 'react';
import s from '../styles.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import useLinesRandom from '@/interactive/Signal/Lines/Random/useLinesRandom';
import { id } from 'ethers/lib/utils';
import { useStoreSimple } from '../../../Simple/useStoreSimple';
import { useStorePrimitive } from '../../useStorePrimitive';
import useCharsTyping from '@/interactive/Signal/Chars/useCharsTyping';

export default function Title({ title, id }: { title: string; id: number }) {
  const ttileRef = useRef<HTMLParagraphElement>(null);
  const { idPrimitive } = useStorePrimitive();
  const idDebouncePrimitive = useDebounce(idPrimitive, 300);

  const { initAnimation: titleOut, playAnimation: titleIn } = useCharsTyping({
    refContent: ttileRef,
    delayTrigger: 0.3,
  });

  useEffect(() => {
    titleOut();
  }, []);

  useEffect(() => {
    if (id === idDebouncePrimitive) {
      titleIn();
    } else {
      titleOut();
    }
  }, [idDebouncePrimitive]);

  return (
    <h4 ref={ttileRef} className={s.contentTab_title_inner}>
      {title}
    </h4>
  );
}
