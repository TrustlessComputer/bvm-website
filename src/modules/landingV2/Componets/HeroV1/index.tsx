import s from './styles.module.scss';
import BgHero from '@/modules/landingV2/Componets/HeroV1/Bg';
import HeroLabel from '@/modules/landingV2/Componets/HeroV1/HeroLabel';
import HeroContent from '@/modules/landingV2/Componets/HeroV1/Content';
import React from 'react';

export default function Hero() {
  return (
    <>
      <div className={s.hero}>
        <div className={s.hero_wrap}>
          <BgHero />
        </div>
        <HeroContent />
      </div>
      <HeroLabel />
    </>
  );
}
