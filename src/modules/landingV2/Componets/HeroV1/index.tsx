import s from './styles.module.scss';
import BgHero from '@/modules/landingV2/Componets/HeroV1/Bg';
import HeroContent from '@/modules/landingV2/Componets/HeroV1/Content';
import React from 'react';
import HeroLabelCard from '@/modules/landingV2/Componets/HeroV1/HeroLabelCard';

export default function Hero() {
  return (
    <>
      <div className={s.hero}>
        <div className={s.hero_wrap}>
          <BgHero />
        </div>
        <HeroContent />
        <HeroLabelCard />
      </div>
    </>
  );
}
