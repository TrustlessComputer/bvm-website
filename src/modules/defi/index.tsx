'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import CategorySection from './CategorySection';
import FooterSection from './FooterSection';
import HeroSection from './HeroSection';
import s from '../gamefi/styles.module.scss';

const DeFiModule = () => {
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

export default DeFiModule;
