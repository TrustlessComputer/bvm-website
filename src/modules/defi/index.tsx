'use client';

import { Box } from '@chakra-ui/react';
import CategorySection from './CategorySection';
import FooterSection from './FooterSection';
import HeroSection from './HeroSection';
import s from '../gamefi/styles.module.scss';
import Loader from '@/modules/builder-landing/Loader';

const DeFiModule = () => {
  return (
    <>
      <Box className={s.container} bgColor={'#f6f6f6'}>
        <div className={s.heroSection}>
          <HeroSection />
        </div>
        <div className={s.categorySection}>
          <CategorySection />
        </div>
        <FooterSection />
      </Box>
    </>

  );
};

export default DeFiModule;
