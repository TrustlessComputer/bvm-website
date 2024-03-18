import { useDebounce } from '@/hooks/useDebounce';
import useCharsTyping from '@/interactive/Signal/Chars/useCharsTyping';
import { useEffect, useRef } from 'react';
import { useStoreSimple } from '../../useStoreSimple';
import s from '../style.module.scss';

export default function Title({ title, id }: { title: string; id: number }) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const { idSimple } = useStoreSimple();
  const idDebounceSimple = useDebounce(idSimple, 300);
  const { initAnimation, playAnimation } = useCharsTyping({
    refContent: titleRef,
    delayTrigger: 0,
  });

  useEffect(() => {
    initAnimation();
  }, []);

  useEffect(() => {
    if (id === idDebounceSimple) {
      playAnimation();
    } else {
      initAnimation();
    }
  }, [idDebounceSimple]);

  return (
    <p className={s.simpleContent_title_inner} ref={titleRef}>
      {title}
    </p>
  );
}
