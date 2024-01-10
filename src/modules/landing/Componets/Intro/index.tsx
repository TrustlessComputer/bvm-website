import s from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useAnimationStore from '@/stores/useAnimationStore';
import Image from 'next/image';
import { MathMap } from '@/utils/mathUtils';

export default function Intro() {

  const refBtn = useRef<HTMLButtonElement>(null);
  const refWrap = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refThumb = useRef<HTMLDivElement>(null);
  const refActions = useRef({ isDown: false, isComplete: false, current: 0 });
  const quickTo = useRef<gsap.QuickToFunc>();
  const quickFillter = useRef<gsap.QuickToFunc>();
  const { setPlay } = useAnimationStore();

  useEffect(() => {
    if (typeof document !== undefined) {
      document.body.style.overflow = 'hidden';
    }
    quickTo.current = gsap.quickTo(refBtn.current, 'x', {
      duration: .2,
    });

    quickFillter.current = gsap.quickTo(refThumb.current, '--clipPath', {
      duration: .2,
    });
  }, []);
  const completed = () => {
    refActions.current.isComplete = true;
    gsap.fromTo(refContent.current, { pointerEvents: 'none' }, {
      opacity: 0, scale: 1.2, delay: .4, ease: 'power3.inOut', onComplete: () => {
        document.body.style.overflow = 'auto';
        if (refContent.current)
          refContent.current.style.display = 'none';
      },
    });
    setTimeout(setPlay, 400);
  };

  const onMouseUp = () => {

    if (refActions.current.isComplete || !refBtn.current || !refWrap.current) return;
    refActions.current.isDown = false;
    const rectBtn = refBtn.current.getBoundingClientRect();
    const rectWrap = refWrap.current.getBoundingClientRect();

    if (refActions.current.current > rectWrap.width / 2) {
      const dis = rectWrap.width - rectBtn.width;
      refActions.current.current = 0;
      completed();
      quickTo.current && quickTo.current(dis);
      quickFillter.current &&  quickFillter.current(100);
    } else {
      refActions.current.current = 0;
      quickTo.current && quickTo.current(0);
      quickFillter.current &&  quickFillter.current(0);
      gsap.to(gradientRef.current, { opacity: 1, ease: 'power3.out', duration: .6 });
    }
  };

  const onMouseDown = () => {
    if (refActions.current.isComplete) return;
    refActions.current.isDown = true;
    gsap.to(gradientRef.current, { opacity: 0, ease: 'power3.out', duration: .6 });
  };

  const onMouse = (e: any) => {
    if (!refActions.current.isDown || refActions.current.isComplete) return;
    if (!refBtn.current || !refWrap.current) return;

    const rectBtn = refBtn.current.getBoundingClientRect();
    const rectWrap = refWrap.current.getBoundingClientRect();

    refActions.current.current = (e.clientX - (rectWrap.left) - rectBtn.width / 2);
    refActions.current.current = Math.max(Math.min(refActions.current.current, (rectWrap.width - rectBtn.width)), 0);

    const x = MathMap(refActions.current.current, 0, (rectWrap.width - rectBtn.width), 0, 100);
    quickTo.current && quickTo.current(refActions.current.current);
    quickFillter.current &&  quickFillter.current(x);

    if (refActions.current.current > rectWrap.width / 2) {
      const dis = rectWrap.width - rectBtn.width;
      refActions.current.current = 0;
      completed();
      quickTo.current && quickTo.current(dis);
      quickFillter.current &&  quickFillter.current(100);
    }
  };

  return <div ref={refContent} className={s.intro}>
    <div className={s.intro_inner}>
      <div className={s.intro_inner_thumbnail} ref={refThumb}>
        <Image className={s.real} src={'/landing/preload.png'} alt={'preload'} width={226} height={200} />
        <Image className={s.clone} src={'/landing/preload.png'} alt={'preload'} width={226} height={200} />
      </div>
      <p className={s.intro_inner_content}>Hold & Drag to enter Bitcoin Virtual Machine</p>
      <div className={s.drag} onMouseMove={onMouse}>
        <div ref={gradientRef} className={s.drag_line}>
          <svg xmlns='http://www.w3.org/2000/svg' width='162' height='2' viewBox='0 0 162 2' fill='none'>
            <path
              d='M1.14865 0.499982L0.648651 0.499982L0.648651 1.49998L1.14865 1.49998L1.14865 0.499982ZM161.149 0.5L158.649 0.5L158.649 1.5L161.149 1.5L161.149 0.5ZM153.649 0.499999L148.649 0.499999L148.649 1.5L153.649 1.5L153.649 0.499999ZM143.649 0.499998L138.649 0.499997L138.649 1.5L143.649 1.5L143.649 0.499998ZM133.649 0.499997L128.649 0.499996L128.649 1.5L133.649 1.5L133.649 0.499997ZM123.649 0.499996L118.649 0.499995L118.649 1.5L123.649 1.5L123.649 0.499996ZM113.649 0.499995L108.649 0.499994L108.649 1.49999L113.649 1.49999L113.649 0.499995ZM103.649 0.499994L98.6486 0.499993L98.6486 1.49999L103.649 1.49999L103.649 0.499994ZM93.6487 0.499992L88.6487 0.499992L88.6487 1.49999L93.6487 1.49999L93.6487 0.499992ZM83.6487 0.499991L78.6487 0.499991L78.6487 1.49999L83.6487 1.49999L83.6487 0.499991ZM73.6487 0.49999L68.6487 0.49999L68.6487 1.49999L73.6487 1.49999L73.6487 0.49999ZM63.6487 0.499989L58.6487 0.499988L58.6487 1.49999L63.6487 1.49999L63.6487 0.499989ZM53.6487 0.499988L48.6486 0.499987L48.6486 1.49999L53.6487 1.49999L53.6487 0.499988ZM43.6486 0.499987L38.6486 0.499986L38.6486 1.49999L43.6486 1.49999L43.6486 0.499987ZM33.6486 0.499986L28.6487 0.499985L28.6487 1.49999L33.6486 1.49999L33.6486 0.499986ZM23.6487 0.499985L18.6487 0.499984L18.6487 1.49998L23.6487 1.49998L23.6487 0.499985ZM13.6487 0.499983L8.64865 0.499983L8.64865 1.49998L13.6487 1.49998L13.6487 0.499983ZM3.64865 0.499982L1.14865 0.499982L1.14865 1.49998L3.64865 1.49998L3.64865 0.499982Z'
              fill='url(#paint0_linear_27930_13578)' />
            <defs>
              <linearGradient id='paint0_linear_27930_13578' x1='1.14865' y1='0.999982' x2='164.323' y2='1'
                              gradientUnits='userSpaceOnUse'>
                <stop stop-color='white' stop-opacity='0' />
                <stop offset='0.9999' stop-color='white' />
                <stop offset='1' stop-color='white' stop-opacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div ref={refWrap} className={s.drag_inner} onMouseLeave={onMouseUp}>
          <button ref={refBtn} onMouseDown={onMouseDown} onMouseUp={onMouseUp}><img
            src='/landing/drag.svg?v=2'
            alt='drag' /></button>
        </div>
        <button className={s.mood}>
          <img src='/landing/subtract.svg' alt='substract' />
        </button>
      </div>
    </div>
  </div>;
}
