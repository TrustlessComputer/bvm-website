'use client';

// import s from '@/modules/gamefi/styles.module.scss';
import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import MainLayout from '@layouts/MainLayout';
import Actions from '../bvm_v3/Actions';
import Category from './section/Category';
import Hero from './section/Hero';

const ShardModuleV2 = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        colorLogo: 'black',
      }}
    >
      <div className={`${s.wrapper}  `}>
        {/*<div className={s.topHero}>*/}
        {/*  <Box h={['80px', '140px']} />*/}
        {/*  <RetroHero />*/}
        {/*</div>*/}
        <div className={`${s.inner}  containerV3`}>
          <Actions />

          <div className={s.section}>
            <Box className={s.container} bgColor={'#f6f6f6'}>
              <div className={s.heroSection}>
                <Hero />
              </div>
              <div className={s.categorySection}>
                <Category />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShardModuleV2;
