import s from './styles.module.scss';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import React from 'react';
import Banner from './Banner';
import Fade from '@/interactive/Fade';
import useAnimationStore from '@/stores/useAnimationStore';

export default function Hero() {
  const { isPlaying } = useAnimationStore();

  return (
    <>
      <div className={s.hero}>
        <div className={s.hero_wrap}>
          <BgHero />
          {/* <Banner /> */}
        </div>
        {isPlaying && <HeroContent />}
      </div>
      <HeroLabel />
    </>
  );
}
