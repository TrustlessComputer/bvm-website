import s from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useAnimationStore from '@/stores/useAnimationStore';
import Image from 'next/image';
import { MathMap } from '@/utils/mathUtils';
import { DotLottiePlayer } from '@dotlottie/react-player';

export default function Intro() {

  const refBtn = useRef<HTMLButtonElement>(null);
  const refWrap = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refThumb = useRef<HTMLDivElement>(null);
  const refActions = useRef({ isDown: false, isComplete: false, current: 0 });
  const quickTo = useRef<gsap.QuickToFunc>();
  const quickFillter = useRef<gsap.QuickToFunc>();
  const { setPlay, setPlayed, played } = useAnimationStore();
  const lottieRef = useRef<any>();

  useEffect(() => {
    played && completed();
  }, [played]);

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
        setPlayed();
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
      lottieRef.current?.seek(100);
    } else {
      refActions.current.current = 0;
      quickTo.current && quickTo.current(0);
      lottieRef.current?.seek(0);
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
    lottieRef.current?.seek(x);
    quickTo.current && quickTo.current(refActions.current.current);

    if (refActions.current.current > rectWrap.width / 2) {
      const dis = rectWrap.width - rectBtn.width;
      refActions.current.current = 0;
      completed();
      quickTo.current && quickTo.current(dis);
      lottieRef.current?.seek(100);
    }
  };

  return <div ref={refContent} className={s.intro}>
    {
      !played && <div className={s.intro_inner}>
        <div className={s.intro_inner_thumbnail} ref={refThumb}>
          <DotLottiePlayer
            lottieRef={lottieRef}
            src='/landing/bvm-lego2.lottie'
          />
        </div>
        <p className={s.intro_inner_content}>Connect these two building blocks to <br /> enter
          the <span>future of Bitcoin</span>.</p>
        <div className={s.drag} onMouseMove={onMouse} onTouchMove={onMouse}>
          <div ref={gradientRef} className={s.drag_line}>
            <svg xmlns='http://www.w3.org/2000/svg' width='130' height='2' viewBox='0 0 130 2' fill='none'>
              <path
                d='M0.827713 0.840111L0.427124 0.840111L0.427124 1.64131L0.827713 1.64131L0.827713 0.840111ZM129.019 0.840126L127.016 0.840125L127.016 1.64132L129.019 1.64132L129.019 0.840126ZM123.01 0.840125L119.004 0.840124L119.004 1.64132L123.01 1.64132L123.01 0.840125ZM114.998 0.840124L110.992 0.840123L110.992 1.64132L114.998 1.64132L114.998 0.840124ZM106.986 0.840123L102.98 0.840123L102.98 1.64132L106.986 1.64132L106.986 0.840123ZM98.974 0.840122L94.968 0.840122L94.968 1.64132L98.974 1.64132L98.974 0.840122ZM90.9621 0.840121L86.9561 0.840121L86.9561 1.64132L90.9621 1.64132L90.9621 0.840121ZM82.9501 0.84012L78.9442 0.84012L78.9442 1.64131L82.9501 1.64131L82.9501 0.84012ZM74.9382 0.840119L70.9322 0.840119L70.9322 1.64131L74.9382 1.64131L74.9382 0.840119ZM66.9263 0.840119L62.9203 0.840118L62.9203 1.64131L66.9263 1.64131L66.9263 0.840119ZM58.9143 0.840118L54.9083 0.840117L54.9083 1.64131L58.9143 1.64131L58.9143 0.840118ZM50.9024 0.840117L46.8964 0.840116L46.8964 1.64131L50.9024 1.64131L50.9024 0.840117ZM42.8904 0.840116L38.8844 0.840115L38.8844 1.64131L42.8904 1.64131L42.8904 0.840116ZM34.8785 0.840115L30.8725 0.840114L30.8725 1.64131L34.8785 1.64131L34.8785 0.840115ZM26.8665 0.840114L22.8605 0.840114L22.8605 1.64131L26.8665 1.64131L26.8665 0.840114ZM18.8546 0.840113L14.8486 0.840113L14.8486 1.64131L18.8546 1.64131L18.8546 0.840113ZM10.8426 0.840112L6.83665 0.840112L6.83665 1.64131L10.8426 1.64131L10.8426 0.840112ZM2.83068 0.840111L0.827713 0.840111L0.827713 1.64131L2.83068 1.64131L2.83068 0.840111Z'
                fill='url(#paint0_linear_28257_8061)' />
              <defs>
                <linearGradient id='paint0_linear_28257_8061' x1='0.827713' y1='1.24071' x2='131.562' y2='1.24072'
                                gradientUnits='userSpaceOnUse'>
                  <stop stop-color='white' stop-opacity='0' />
                  <stop offset='0.9999' stop-color='white' />
                  <stop offset='1' stop-color='white' stop-opacity='0' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div ref={refWrap} className={s.drag_inner} onMouseLeave={onMouseUp}>
            <button ref={refBtn} onMouseDown={onMouseDown} onTouchStart={onMouseDown} onTouchEnd={onMouseUp}
                    onMouseUp={onMouseUp}><img
              src='/landing/drag.svg?v=2'
              alt='drag' /></button>
          </div>
          <button className={s.mood}>
            <img src='/landing/subtract.svg' alt='substract' />
          </button>
        </div>
      </div>
    }
  </div>;
}
