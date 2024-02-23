import s from './styles.module.scss';
import Intro from '@/modules/landing/Componets/Intro';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import JoinAllowList from '@/modules/landing/Componets/Hero/JoinAllowList';
import React from 'react';
import JoinAllowListHero from '@/modules/landing/Componets/Hero/JoinAllowListHero';
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
        <JoinAllowListHero />
        <Intro />
      </div>
      <div className={s.hero_wrap__mobile}>
        <HeroLabel isMobile={true} />
      </div>
    </>
  );
}
