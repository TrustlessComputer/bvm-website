import s from './styles.module.scss';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import React from 'react';
import Banner from './Banner';

export default function Hero() {
  return (
    <>
      <div className={s.hero}>
        <div className={s.hero_wrap}>
          <BgHero />
          <Banner />
        </div>
        <HeroContent />
      </div>
      <HeroLabel />
    </>
  );
}
