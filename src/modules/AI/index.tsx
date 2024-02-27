'use client';

import { Box } from '@chakra-ui/react';
import s from '@/modules/gamefi/styles.module.scss';
import HeroAI from '@/modules/AI/HeroAI';
import CategoryAI from '@/modules/AI/CategoryAI';
import FooterAI from '@/modules/AI/FooterAI';

const AIPage = () => {
  return (
    <Box className={s.container} bgColor={'#f6f6f6'}>
      <div className={s.heroSection}>
          <HeroAI />
      </div>
      <div className={s.categorySection}>
          <CategoryAI />
      </div>
      <FooterAI />
    </Box>
  )
}

export default AIPage
