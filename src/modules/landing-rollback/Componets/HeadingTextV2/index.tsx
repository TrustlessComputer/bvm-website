import React, { PropsWithChildren, useEffect, useRef } from 'react';
import s from './styles.module.scss';
import { gsap } from 'gsap';
import useAnimationStore from '@/stores/useAnimationStore';

interface IProp extends PropsWithChildren {
  className: string;
  headings: string[];
}

export default function HeadingTextV2({ headings, className, children }: IProp) {
  const { play } = useAnimationStore();
  const refCOntent = useRef<HTMLDivElement>(null);
  const list = useRef<any>();
  const refNext = useRef(-1);
  const refLoop = useRef<any>();
  const refTime = useRef<any>();
  const refMask = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!refCOntent.current) return;
    list.current = refCOntent.current.querySelectorAll('.js-el');
    gsap.set(list.current, { yPercent: 100 });
  }, []);


  const nextSlide = () => {
    const old = refNext.current;
    refNext.current++;
    if (refNext.current >= list.current.length) {
      refNext.current = 0;
    }


    refMask.current && gsap.to(refMask.current, {width: list.current[refNext.current].scrollWidth, ease: 'power3.out', duration: .6});
    gsap.to(list.current[old], { yPercent: -100, ease: 'power3.out', duration: .6 });
    gsap.fromTo(list.current[refNext.current], { yPercent: 100 }, { yPercent: 0, ease: 'power3.out', duration: .6 });

  };

  useEffect(() => {
    if (!play) return;
    refTime.current = setTimeout(nextSlide, 500);
    refLoop.current = setInterval(nextSlide, 2000);
    return () => {
      clearInterval(refLoop.current);
      clearTimeout(refTime.current);
    };
  }, [play]);

  return (
    <div ref={refCOntent} className={`${className} ${s.heading}`}>
     <span>{children}</span>
      {' '}
      <span className={s.heading_mask} ref={refMask}>
          {
            headings.map((h, index) => {
              return <b key={h}
                        className={`${s.heading_mask_el} js-el`}>{h}</b>;
            })
          }
      </span>
    </div>
  );
}
