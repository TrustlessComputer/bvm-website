import s from './styles.module.scss';
import ItemHero from '@/modules/landing/Componets/Hero/ItemHero';
import Image from 'next/image';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';
import React, { useState } from 'react';

const DATA_HERO = [
  {
    icon: '/landing/svg/lego_coin.svg',
    title: 'Bitcoin',
  },
  {
    icon: '/landing/svg/lego_optimism.svg',
    title: 'Optimism',
  },
  {
    icon: '/landing/svg/lego_celestia.svg',
    title: 'Celestia',
  },
  {
    icon: '/landing/svg/lego_polygon.svg',
    title: 'Polygon',
  },
  {
    icon: '/landing/uni-v2.svg',
    title: 'Uniswap',
  },
  {
    icon: '/landing/ic-ordinal.svg',
    title: 'Ordinals',
  },
  {
    icon: '/landing/ic-near.svg',
    title: 'Near',
  },
];

const DELAY = 7;

export default function HeroLabel({ isMobile }: { isMobile?: boolean }) {
  const delay = !isMobile ? DELAY  : 0;

  return (
    <div className={`${s.heroLabel} ${isMobile && s.heroLabel__mobile}`}>
      <div className={s.content}>
        <div className={`${s.inner} heroLabel_inner`}>
          <Fade delay={delay}>
            <div className={s.heroLabel_content}>
              <Image
                src={'/landing/svg/lego_icon_cube.svg'}
                alt='cube'
                width={32}
                height={32}
              />
              <p className={s.heroLabel_content_text}>
                Powered by the best-of-breed modules
              </p>
            </div>
          </Fade>
          <div className={`${s.heroLabel_listHero} ${isMobile && s.heroLabel_listHero__mobile}`}>
            {DATA_HERO.map((item, index) => {
              return <ItemHero key={index} delay={delay + index / 10} data={item} />;
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
