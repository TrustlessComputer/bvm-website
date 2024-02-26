'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import CategorySection from '@/modules/gamefi/CategorySection';
import FooterSection from '@/modules/gamefi/FooterSection';
import HeroSection from '@/modules/gamefi/HeroSection';
import s from './styles.module.scss';

const GameFiModule = () => {
  return (
    <Box className={s.container} bgColor={'#F3F1E8'}>
      <Box h={['20px', '80px']} />
      <div className={s.heroSection}>
        <BoxContent>
          <HeroSection />
        </BoxContent>
      </div>
      <div className={s.categorySection}>
        <BoxContent pt={['80px']}>
          <CategorySection />
        </BoxContent>
      </div>
      <FooterSection />
    </Box>
  );
};

export default GameFiModule;
