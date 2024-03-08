'use client';

// import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

// import BoxContent from '@/layouts/BoxContent';
// import Section1 from './Section_1';
// import Section2 from './Section_2';
import React from 'react';
import Section3 from '@/modules/roadmap/Section_3';

const RoadmapModule = () => {
  // return (
  //   <Box className={s.container}>
  //     {/*<BoxContent>*/}
  //       {/*<Box h={['20px', '140px']} />*/}
  //       {/*<Section1 />*/}
  //       {/*<Box h={['20px', '80px', '140px']} />*/}
  //       {/*<Section2 />*/}
  //       {/*<Box h={['20px', '40px']} />*/}
  //     {/*</BoxContent>*/}
  //   </Box>
  // );

  return (
    <div className={`${s.container}`}>
      <div className={`${s.wrapperSection}`}>
        <Section3 />
      </div>
    </div>

  )
};

export default RoadmapModule;
