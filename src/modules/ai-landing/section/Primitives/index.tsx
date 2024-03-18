'use client';
import { useIsInViewportSignal } from '@/hooks/useIsInViewportSignal';
import useCharsTyping from '@/interactive/Signal/Chars/useCharsTyping';
import PrimitivesTab from '@/modules/ai-landing/section/Primitives/PrimitivesTab';
import { FAKE_DATA } from '@/modules/ai-landing/section/Primitives/data';
import Button from '../../components/Button';
import HomeContainer from '../../components/HomeContainer';
import { useSignalEffect } from '@preact/signals-react';
import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import { useStorePrimitive } from './useStorePrimitive';

export default function Primitives(): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setIdPrimitive } = useStorePrimitive();
  const contentRef = useRef<HTMLDivElement>(null);
  const titleHeadingRef = useRef<HTMLHeadingElement>(null);

  const { initAnimation, playAnimation } = useCharsTyping({
    refContent: titleHeadingRef,
    delayTrigger: 0.3,
  });
  const { visible } = useIsInViewportSignal({ ref: titleHeadingRef });
  const handleChangeTab = (id: number) => {
    setIdPrimitive(id);
  };

  useEffect(() => {
    initAnimation();
  }, []);
  useSignalEffect(() => {
    if (visible.value) {
      playAnimation();
    }
  });

  return (
    <div className={`${s.wrapperSection}`} ref={wrapperRef}>
      <HomeContainer className={`${s.container}`}>
        <div className={s.wrapperContent}>
          <h2 className={s.title} ref={titleHeadingRef}>
            Industries & <span>use cases</span>
          </h2>
          <div className={s.wrapperContent_inner} ref={contentRef}>
            <div className={`${s.wrapperBtn}`}>
              {FAKE_DATA.map((item, index) => (
                <Button
                  key={item.id}
                  id={index}
                  className={`${s.btn}`}
                  onClick={() => handleChangeTab(item.id)}
                >
                  {item.caseStudy}
                </Button>
              ))}
            </div>
            <PrimitivesTab data={FAKE_DATA} />
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}
