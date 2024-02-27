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

export default DeFiModule;
