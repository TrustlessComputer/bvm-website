import React, { useEffect, useRef } from 'react';
import s from '../styles.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import useLinesRandom from '@/interactive/Signal/Lines/Random/useLinesRandom';
import { useStorePrimitive } from '../../useStorePrimitive';

export default function Desc({ desc, id }: { desc: string; id: number }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const { idPrimitive } = useStorePrimitive();
  const idDebouncePrimitive = useDebounce(idPrimitive, 300);
  const { initAnimation: descOut, playAnimation: descIn } = useLinesRandom({
    refContent: descRef,
    delayTrigger: 0.3,
  });

  useEffect(() => {
    descOut();
  }, []);

  useEffect(() => {
    if (id === idDebouncePrimitive) {
      descIn();
    } else {
      descOut();
    }
  }, [idDebouncePrimitive]);

  return (
    <p ref={descRef} className={s.contentTab_decs_inner}>
      {desc}
    </p>
  );
}
