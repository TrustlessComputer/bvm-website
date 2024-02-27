'use client';

import { Box } from '@chakra-ui/react';
import s from '../gamefi/styles.module.scss';
import BoxContent from '@/layouts/BoxContent';
import HeroSection from '@/modules/socialfi/HeroSection';
import CategorySection from '@/modules/socialfi/CategorySection';
import FooterSection from '@/modules/socialfi/FooterSection';

const SocialFiModule = () => {
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

export default SocialFiModule;
