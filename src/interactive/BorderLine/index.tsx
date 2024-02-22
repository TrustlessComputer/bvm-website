import { useRef } from 'react';
import s from './styles.module.scss';
import useAnimation from '@/hooks/useAnimation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BorderLine({ delay }: { delay: number }) {

  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {
  }, { scope: refContent });

  const init = contextSafe(() => {
    refContent.current && gsap.set(refContent.current, { width: '0%' });
  });

  const play = contextSafe(() => {
    refContent.current && gsap.to(refContent.current, { width: '100%', ease: 'power3.inOut', delay, duration: .8 });
  });

  useAnimation({
    trigger: refContent,
    initAnimation: init,
    playAnimation: play,
    threshold: 100,
  });
  return (<div ref={refContent} className={s.line} />);
}
