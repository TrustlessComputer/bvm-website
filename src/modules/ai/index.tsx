'use client';

import { Box } from '@chakra-ui/react';
import s from '@/modules/gamefi/styles.module.scss';
import HeroAI from '@/modules/ai/HeroAI';
import CategoryAI from '@/modules/ai/CategoryAI';
import FooterAI from '@/modules/ai/FooterAI';

const AIModule = () => {
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

export default AIModule
