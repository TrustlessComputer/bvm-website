'use client';

// import { Box, Flex } from '@chakra-ui/react';
// import s from './styles.module.scss';

// import Section1 from './Section_1';
// import Section2 from './Section_2';
// import Section2 from './Section_2_vs2';
// import BoxContent from '@/layouts/BoxContent';
import Modules from '@/modules/landingV2/Componets/Modules';

const BuildingBlockModule = () => {
  return (
    <div>
      <Modules isFull={true} />
    </div>
    // <Box className={s.container} bgColor={'#F6F6F6'}>
    //   {/*<BoxContent minH={'100dvh'}>*/}
    //   {/*  <Box h={['20px', '140px']} />*/}
    //   {/*  <Section1 />*/}
    //   {/*  <Box h={['20px', '40px']} />*/}
    //   {/*  <Section2 />*/}
    //   {/*  <Box h={['20px', '40px']} />*/}
    //   {/*</BoxContent>*/}
    // </Box>
  );
};

export default BuildingBlockModule;
