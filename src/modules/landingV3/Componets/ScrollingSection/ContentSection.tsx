import s from './styles.module.scss';
import Link from 'next/link';
import { ISectionContentProps } from '@/modules/landingV3/Componets/SectionContent/section-content';
import { useEffect, useRef } from 'react';
import { useScrollingSectionStore } from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

interface IProps extends ISectionContentProps {
  idx: number;
}

export default function ContentSection({ idx, subTitle, title, children, button, button2 }: IProps) {

  const refContent = useRef<HTMLDivElement>(null);
  const { setSectionActive } = useScrollingSectionStore();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(refContent.current, {opacity: 0});
    ScrollTrigger.create({
      trigger: refContent.current,
      start: 'center bottom-=10%',
      end: 'center top+=10%',
      markers: true,
      onToggle: (self) => {
        if (self.isActive) {
          setSectionActive(idx);
          gsap.to(refContent.current, { opacity: 1, ease: 'power3.inOut', duration: .4 });
        } else {
          gsap.to(refContent.current, { opacity: 0, ease: 'power3.inOut', duration: .4 });
        }
      },
    });
  });

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
