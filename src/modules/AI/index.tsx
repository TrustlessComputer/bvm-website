'use client';

import { Box } from '@chakra-ui/react';
import s from '@/modules/gamefi/styles.module.scss';
import BoxContent from '@/layouts/BoxContent';
import HeroAI from '@/modules/AI/HeroAI';
import CategoryAI from '@/modules/AI/CategoryAI';
import FooterAI from '@/modules/AI/FooterAI';

const AIPage = () => {
  return (
    <Box className={s.container} bgColor={'#f6f6f6'}>
      <Box h={['20px', '80px']} />
      <div className={s.heroSection}>
        <BoxContent>
          <HeroAI />
        </BoxContent>
      </div>
      <div className={s.categorySection}>
        <BoxContent pt={['80px']}>
          <CategoryAI />
        </BoxContent>
      </div>
      <FooterAI />
    </Box>
  )
}

export default AIPage
