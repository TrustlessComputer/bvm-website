'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import s from '../gamefi/styles.module.scss';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import FooterSection from './FooterSection';

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
