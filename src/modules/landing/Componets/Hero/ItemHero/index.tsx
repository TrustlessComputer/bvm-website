import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import SvgInset from '@/components/SvgInset';
import Fade from '@/interactive/Fade';

type TItemHero = {
  icon: string;
  title: string;
  index: number;
  length: number
};

function ItemHero({ data, delay }: { data: TItemHero, delay:number }) {

  const fristItem = data.index === 0;
  const lastItem = data.index === data.length;
  const srcSvg = fristItem
    ? '/landing/svg/frame_hero_fill.svg'
    : '/landing/svg/frame_hero.svg';

  return (
    <Fade from={{ x: 20 }} to={{ x: 0 }} delay={delay}>
      <div className={s.itemHero}>
        <SvgInset fullWidth={true} svgUrl={srcSvg} className={s.itemHero_frame} />
        {!lastItem && <span className={s.itemHero_stud}></span>}
        <div className={s.itemHero_content}>
          <Image src={data.icon} alt={data.title} width={45} height={45} />
          <p className={s.itemHero_content_title}>{data.title}</p>
        </div>
      </div>
    </Fade>
  );
}

export default ItemHero;
