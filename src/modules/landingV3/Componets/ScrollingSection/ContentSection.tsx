import s from './styles.module.scss';
import Link from 'next/link';
import { ISectionContentProps } from '@/modules/landingV3/Componets/SectionContent/section-content';
import { useEffect, useRef } from 'react';
import {
  useAnimationOnFame,
  useScrollingSectionStore,
} from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

interface IProps extends ISectionContentProps {
  idx: number;
}

export default function ContentSection({ idx, subTitle, title, children, button, button2, fameIns, fameOuts }: IProps) {

  const refContent = useRef<HTMLDivElement>(null);
  // const { setSectionActive } = useScrollingSectionStore();

  useAnimationOnFame({
    refContent, fameIns, fameOuts
  })

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.set(refContent.current, { opacity: 0 });
  //
  //   gsap.fromTo(refContent.current, {opacity: 1},{
  //     scrollTrigger: {
  //       trigger: refContent.current,
  //       start: 'top top+=25%',
  //       end: 'bottom top+=25%',
  //       scrub: true,
  //       // markers: true,
  //     }, opacity: 0, ease: 'power3.inOut', duration: .4,
  //   });
  //
  //   gsap.fromTo(refContent.current, { opacity: 0 }, {
  //     scrollTrigger: {
  //       trigger: refContent.current,
  //       start: 'top bottom-=10%',
  //       end: 'bottom bottom-=10%',
  //       // markers: true,
  //       scrub: true,
  //       onToggle: (self) => {
  //         if (self.isActive) {
  //           setSectionActive(idx);
  //         }
  //       },
  //     }, opacity: 1, ease: 'power3.inOut', duration: .4,
  //   });
  //
  // });

  return <div className={s.content} ref={refContent}>
    <p className={s.subTitle}>{subTitle}</p>
    <h2 className={s.content_title}>{title}</h2>
    <div className={s.content_desc}>{children}</div>
    {
      button && <div className={s.content_action}>
        <Link href={button.link} className={s.button} target={button.target || '_self'}>
          {button.title}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                  stroke-linejoin="round" />
          </svg>
        </Link>
      </div>
    }
    {
      button2 && <div className={`${s.content_action} ${s.content_action__2}`}>
        <Link href={button2.link} className={`${s.button} ${s.button__2}`} target={button2.target || '_self'}>
          {button2.title}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                  stroke-linejoin="round" />
          </svg>
        </Link>
      </div>
    }
  </div>;
}
