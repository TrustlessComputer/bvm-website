'use client';

import React, { useEffect, useRef, useState } from 'react';
import s from './style.module.scss';
import HomeContainer from '../../components/HomeContainer';
import { SimpleData } from './data';
import SimpleTab from './SimpleTab';
import SimpleContent from './SimpleContent';
import { useStoreSimple } from './useStoreSimple';
import useCharsTyping from '@/interactive/Signal/Chars/useCharsTyping';
import { useIsInViewportSignal } from '@/hooks/useIsInViewportSignal';
import { useSignalEffect } from '@preact/signals-react';
import { useIsDesktop } from '@/hooks/useWindowResize';
import SimpleMobile from './SimpleMobile';
import { useGSAP } from '@gsap/react';
import { MathMap } from '@/utils/mathUtils';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import gsap from 'gsap';


const Simple = () => {
  const [tab, setTab] = useState<number>(0);
  const wrapContent = useRef<HTMLDivElement>(null);
  const wrapContent_inner = useRef<HTMLDivElement>(null);
  const { setIdSimple } = useStoreSimple();
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapBgRef = useRef<HTMLDivElement>(null);
  const titleHeadingRef = useRef<HTMLHeadingElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!wrapContent.current || !visible.value) return;
    gsap.to(window, { scrollTo: { y: wrapContent.current, offsetY: -(tab * window.innerHeight) }, ease: 'power2', duration: .1 });
  }, [tab]);

  useEffect(() => {
    !isDesktop && setIdSimple(0);
  }, [isDesktop]);

  const { initAnimation, playAnimation } = useCharsTyping({
    refContent: titleHeadingRef,
    delayTrigger: 0.3,
  });

  const { visible } = useIsInViewportSignal({ ref: titleHeadingRef });
  useSignalEffect(() => {
    if (visible.value) {
      playAnimation();
    }
  });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
      initAnimation();
      const lengthData = SimpleData.length - 1;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1200px)', () => {
        ScrollTrigger.create({
          trigger: wrapContent.current,
          start: `top top`,
          end: 'bottom bottom',
          pin: wrapContent_inner.current,
          pinSpacing: false,
          markers: true,
          onUpdate: ({ progress }) => {
            const id = Math.min(
              lengthData,
              Math.round(MathMap(progress, 0, 1, 0, lengthData)),
            );
            setIdSimple(id);
          },
        });
      });
    },
    { scope: wrapContent },
  );

  return (
    <div className={s.simple} ref={wrapContent}>
      <div className={s.simple_inner} ref={wrapContent_inner}>
        <div className={s.simple_bg} ref={wrapBgRef}></div>
        <HomeContainer className={s.container}>
          <h2 className={s.simple_title} ref={titleHeadingRef}>
            <span> BUILT BY THE</span> WORLD’S AI EXPERTS <span>{` AND `}</span> CRYPTO EXPERTS
          </h2>
          {isDesktop ? (
            <div className={s.wrapContent} ref={contentRef}>
              <div className={s.wrapContent_tabs}>
                {SimpleData.map((item, index) => (
                  <SimpleTab
                    key={item.id}
                    id={item.id}
                    content={item.label}
                    active={index == tab}
                    setTab={setTab}
                  />
                ))}
              </div>
              <div className={s.wrapContent_list}>
                <SimpleContent data={SimpleData} />
              </div>
            </div>
          ) : (
            <SimpleMobile />
          )}
        </HomeContainer>
      </div>
    </div>
  );
};

export default Simple;
