import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import Fade from '@/interactive/Fade';

type TItemHero = {
  icon: string;
  title: string;
};

export default function ItemHero({
  data,
  delay,
}: {
  data: TItemHero;
  delay: number;
}) {
  return (
    <div className={s.itemHero}>
      <Fade from={{ x: 20 }} to={{ x: 0 }} delay={delay}>
        <div className={s.itemHero_inner}>
          <div className={s.itemHero_content}>
            <Image
              className={s.itemHero_img}
              src={data.icon}
              alt={data.title}
              width={45}
              height={45}
            />
            <p className={s.itemHero_content_title}>{data.title}</p>
          </div>
        </div>
      </Fade>
    </div>
  );
}
