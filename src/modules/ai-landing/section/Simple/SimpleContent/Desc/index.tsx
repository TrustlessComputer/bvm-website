import { useDebounce } from '@/hooks/useDebounce';
import useLinesRandom from '@/interactive/Signal/Lines/Random/useLinesRandom';
import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useStoreSimple } from '../../useStoreSimple';
import s from '../style.module.scss';

export default function Desc({ desc, id }: { desc: string; id: number }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const { idSimple } = useStoreSimple();
  const idDebounceSimple = useDebounce(idSimple, 300);
  const { initAnimation: descOut, playAnimation: descIn } = useLinesRandom({
    refContent: descRef,
    delayTrigger: 0.3,
    start: 'top 50%',
  });

  useEffect(() => {
    descOut();
  }, []);

  useEffect(() => {
    if (id === idDebounceSimple) {
      descIn();
    } else {
      descOut();
    }
  }, [idDebounceSimple]);

  return (
    <p className={cn(s.simpleContent_content_inner, 'text-desc')} ref={descRef}>
      {desc}
    </p>
  );
}
