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

interface IProps extends ISectionContentProps {}

export default function ContentSection({ subTitle, title, children, button, button2, fameIns, fameOuts }: IProps) {

  const refContent = useRef<HTMLDivElement>(null);
  useAnimationOnFame({
    refContent, fameIns, fameOuts
  })

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
