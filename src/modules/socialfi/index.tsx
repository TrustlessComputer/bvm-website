'use client';

import { Box } from '@chakra-ui/react';
import s from './style.module.scss';
import BoxContent from '@/layouts/BoxContent';
import HeroSection from '@/modules/socialfi/HeroSection';
import CategorySection from '@/modules/socialfi/CategorySection';
import FooterSection from '@/modules/socialfi/FooterSection';

const SocialFiModule = () => {
  return <Box className={s.container} bgColor={'#f6f6f6'}>
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
  </Box>;
};

export default SocialFiModule;
