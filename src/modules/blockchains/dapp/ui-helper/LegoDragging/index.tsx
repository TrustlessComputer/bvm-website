import { signal, useSignalEffect } from '@preact/signals-react';
import { MouseEvent, useEffect, useRef } from 'react';
import s from './styles.module.scss';

export const legoDragging = signal<string | null>('');
export default function LegoDragging(): React.ReactElement {
  const refInner = useRef<HTMLDivElement>(null);

  const show = () => {
    if (!refInner.current) return;
    refInner.current.style.display = 'inline-block';
    refInner.current.innerHTML = legoDragging.value || '';
  };

  const hide = () => {
    if (!refInner.current) return;
    refInner.current.style.display = 'none';
  };

  useSignalEffect(() => {
    console.log('______leo', legoDragging.value);
    legoDragging.value ? show() : hide();
  });

  useEffect(() => {
    const onMoving = (e: any) => {
      if (!refInner.current) return;

      const rect = refInner.current?.getBoundingClientRect();
      const x = e.clientX - rect.width / 2;
      const y = e.clientY - rect.height / 2;
      refInner.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', onMoving);

    return () => {
      window.removeEventListener('mousemove', onMoving);
    };
  }, []);

  return (
    <div className={s.legoDragging} ref={refInner}>
      TEST LEGO DRAGING
    </div>
  );
}
