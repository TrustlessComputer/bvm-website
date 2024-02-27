'use client';

import { Box } from '@chakra-ui/react';
import CategorySection from '@/modules/gamefi/CategorySection';
import FooterSection from '@/modules/gamefi/FooterSection';
import HeroSection from '@/modules/gamefi/HeroSection';
import s from './styles.module.scss';
import ContainerDiv from '@/components/Container';

const GameFiModule = () => {
  return (
    <Box className={s.container} bgColor={'#f6f6f6'}>
      <div className={s.heroSection}>
          <HeroSection />
      </div>
      <div className={s.categorySection}>
          <CategorySection />
      </div>
      <FooterSection />
    </Box>
  );
};

export default GameFiModule;
