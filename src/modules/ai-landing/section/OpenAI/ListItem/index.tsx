'use client';

import React, { ReactElement, useRef } from 'react';
import s from './style.module.scss';
import SvgInset from '@/components/SvgInset';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import HeadingTyping from '@interactive/Signal/Chars/typing';
import LinesRandom from '@interactive/Signal/Lines/Random';

type IListItem = {
  title: string;
  content: string;
  content2?: string;
  icon: string;
};

const ListItem = ({ title, content, content2, icon }: IListItem): ReactElement => {
  const listItemRef = useRef<HTMLDivElement>(null);
  const refDot = useRef<HTMLDivElement>(null);
  const refCard = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refCard.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    tl.fromTo(refDot.current, { scale: 0 }, {
      scale: 1,
      ease: 'power3.inOut',
      duration: 1,
    });

    tl.fromTo(refCard.current, { x: 100, opacity: 0 }, {
      x: 0,
      opacity: 1,
      ease: 'power3.inOut',
      duration: 1,
    }, '-=1');


  }, { scope: refCard });
  return (
    <div ref={listItemRef} className={s.listItem}>
      <div className={`${s.listItem_dot}`} ref={refDot}></div>
      <div className={`${s.listItem_inner}`} ref={refCard}>
        <SvgInset size={120} svgUrl={icon} className={s.icon} />
        <HeadingTyping>
          <h5 className={`${s.listItem_title}`}>{title}</h5>
        </HeadingTyping>
        <LinesRandom delayTrigger={.15}>
          <div className={s.listItem_content}>
            <p>{content}</p>
            {content2 && (
              <p className={s.listItem_content_subContent}>{content2}</p>
            )}
          </div>
        </LinesRandom>
      </div>
    </div>
  );
};

export default ListItem;
