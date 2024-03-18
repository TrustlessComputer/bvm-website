import Button from '../../../../components/Button';
import { useDebounce } from '@/hooks/useDebounce';
import useFade from '@/interactive/Signal/Fade/useFade';
import { useEffect, useRef } from 'react';
import { useStorePrimitive } from '../../useStorePrimitive';
import s from '../styles.module.scss';
import { useRouter } from 'next/navigation';

export default function ButtonInner({
                                      title,
                                      link,
                                      id,
                                      isOpen
                                    }: {
  title?: string;
  link?: string;
  id?: number;
  isOpen?: boolean;
}) {
  const { idPrimitive } = useStorePrimitive();
  const idDebouncePrimitive = useDebounce(idPrimitive, 300);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rounter = useRouter();
  const { initAnimation: btnOut, playAnimation: btnIn } = useFade({
    refContent: buttonRef,
    duration: 1.2,
    delayTrigger: 0.6,
  });
  useEffect(() => {
    btnOut();
  }, []);
  useEffect(() => {
    if (id === idDebouncePrimitive) {
      btnIn();
    } else {
      btnOut();
    }
  }, [idDebouncePrimitive]);
  return (
    <>
      {
        link ? <Button onClick={() => {
          isOpen ? window.open(link) : rounter.push(link);
        }} ref={buttonRef} isWhite className={`${s.contentTab_button_inner}`}>
          {title}
        </Button> : <Button ref={buttonRef} isDisabled className={`${s.contentTab_button_inner}`}>
          Coming Soon
        </Button>
      }
    </>
  );
}
