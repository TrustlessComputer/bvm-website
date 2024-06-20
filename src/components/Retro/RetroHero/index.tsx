import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export interface IHeroBtn_1 {
  title: string,
  link: string,
  target?: '_blank' | ''
}

export interface IHeroBtn_2 extends IHeroBtn_1 {
  label: string;
}

export interface IRetroHero extends PropsWithChildren {
  subTitle: string,
  label: string,
  btn1: IHeroBtn_1,
  btn2: IHeroBtn_2,
  src: string,
  isVideo?: boolean
}

function RetroHero({ label, subTitle, children, btn1, btn2, src, isVideo }: IRetroHero): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      {
        isVideo ? <video src={src} className={s.bg} autoPlay loop playsInline muted></video> :
          <Image className={s.bg} src={src} width={1920} height={567} alt={'bg-hero'} />
      }
      <div className={` ${s.container} containerV3`}>
        <div className={s.wrapperContent}>
          <p className={s.subTitle}>{subTitle}</p>
          <p className={s.heading}>{children}</p>
          <p className={s.label}>{label}</p>
          <div className={s.wrapperLink}>
            <Link href={btn1.link} target={btn1.target} className={s.btn}>{btn1.title}</Link>
            <div className={s.linkBottom}>
              <p>{btn2.label}</p>
              <Link href={btn2.link} target={btn2.target}>{btn2.title}</Link>
              <div className={s.icon}>
                <Image src={'/retro/ic_arrowTR.svg'} alt={'icon'} width={12} height={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetroHero;
