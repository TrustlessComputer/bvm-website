'use client';

import { Box } from '@chakra-ui/react';
import CategorySection from '@/modules/gamefi/CategorySection';
import FooterSection from '@/modules/gamefi/FooterSection';
import HeroSection from '@/modules/gamefi/HeroSection';
import s from './styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';

const GameFiModule = () => {
  return (
    <Box className={s.container} bgColor={'#f6f6f6'}>
      <RetroHero label={'Designed for Game builders'} btn1={{
        title: 'Create your own GameFi L2',
        link: '#',
      }}
                 btn2={{
                   title: 'Explore Bitcoin Arcade now',
                   label: 'Need an example?',
                   link: '#',
                 }}
                 src={'/retro/hero.png'}
      >
        Shape the Future of Gaming on Bitcoin
      </RetroHero>
    </Box>
  );
};

export default GameFiModule;
