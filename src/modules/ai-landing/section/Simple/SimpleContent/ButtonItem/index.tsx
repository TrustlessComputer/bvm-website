import Button from '../../../../components/Button';
import { useDebounce } from '@/hooks/useDebounce';
import useFade from '@/interactive/Signal/Fade/useFade';
import { useEffect, useRef } from 'react';
import { useStoreSimple } from '../../useStoreSimple';
import s from '../style.module.scss';

export default function ButtonItem({ link, id }: { link: string; id: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { idSimple } = useStoreSimple();
  const idDebounceSimple = useDebounce(idSimple, 300);

  const { initAnimation: btnOut, playAnimation: btnIn } = useFade({
    refContent: buttonRef,
    duration: 1.2,
    delayTrigger: 0.6,
  });
  useEffect(() => {
    btnOut();
  }, []);
  useEffect(() => {
    if (id === idDebounceSimple) {
      btnIn();
    } else {
      btnOut();
    }
  }, [idDebounceSimple]);
  return (
    <Button
      ref={buttonRef}
      isWhite={true}
      className={s.simpleContent_button_inner}
    >
      Building now
    </Button>
  );
}
