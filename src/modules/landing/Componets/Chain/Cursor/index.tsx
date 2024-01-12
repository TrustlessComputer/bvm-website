import s from './styles.module.scss';
import useCursorStore from '@/modules/landing/Componets/Chain/Cursor/useCursorStore';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IProp extends PropsWithChildren {
};
export default function Cursor({ children }: IProp) {
  const refContent = useRef<HTMLDivElement>(null);
  const refCursor = useRef<HTMLDivElement>(null);

  const { isShow } = useCursorStore();

  useEffect(() => {
    if (isShow) {
      gsap.to(refCursor.current, { opacity: 1, ease: 'power3.out', duration: .4 });
    } else {
      gsap.to(refCursor.current, { opacity: 0, ease: 'power3.out', duration: .4 });
    }
  }, [isShow]);

  useEffect(() => {

    const quickX = gsap.quickTo(refCursor.current, 'x', { duration: 0.4, ease: "power3" });
    const quickY = gsap.quickTo(refCursor.current, 'y', { duration: 0.4, ease: "power3" });
    const onMouseMove = (e: MouseEvent) => {
      if(!refContent.current) return ;

      const rectWrap = refContent.current.getBoundingClientRect();
      const disX = e.clientX - rectWrap.left + 10;
      const disY = e.clientY - rectWrap.top + 10;

      quickX(disX);
      quickY(disY);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (<div className={s.wrapCursor} ref={refContent}>
    {
      children
    }
    <div className={s.cursor} ref={refCursor}>
      <div className={s.cursor_inner}>
        <span className={s.cursor_text}>Learn more</span> <img src='landing/icon-arrow.svg' alt='icon-arrow' />
      </div>
    </div>
  </div>);
}
