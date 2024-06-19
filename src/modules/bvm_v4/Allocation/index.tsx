import React from 'react';
import s from './Allocation.module.scss';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Vesting from '@/modules/bvm_v3/Vesting';
import BoxContent from '@/layouts/BoxContent';
import ImagePlaceholder from '@components/ImagePlaceholder';


const ALLOCATION_DATA = [
  { title: 'Team (20%)', desc: 'For core team and  project copntributors' },
  { title: 'Advisors (5%)', desc: 'For advisors and partners' },
  { title: 'Investor (15%)', desc: 'For private sale and public sale' },
  {
    title: 'Community (60%)',
    desc: 'For builders, partnerships, marketing, liquidity, etc.',
  },
];

const Allocation = () => {
  return (
    <Box
      className={s.wrapper}
      bgColor={'#004B0C'}
      py={{ base: '40px', md: '80px' }}
    >
      <Box zIndex={1} position={'relative'}>
        <Text as="h4" className={s.heading}>
          BVM Tokenomics
        </Text>
        <Text className={s.desc}>
          The total supply of BVM is permanently fixed at 100M tokens.
        </Text>
        <Flex
          w="100%"
          flexDir={{ base: "column", md: 'column', lg: "row" }}
          justifyContent={'space-between'}
          gap={{ base: "32px", md: '60px', lg: "120px" }}
          alignItems={'center'}
          px={{base: '15px' , md: '60px' ,lg: '77px'}}
        >
          <div className={s.chart}>
            <ImagePlaceholder
              width={573}
              height={365}
              src={'/images/pie-chart-7.png'}
              alt={'Allocation chart'}
            />
          </div>
          <Vesting />
        </Flex>
      </Box>
    </Box>
  );
};

export default Allocation;
