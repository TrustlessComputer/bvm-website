import React from 'react';
import s from './Allocation.module.scss';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

type Props = {};

const ALLOCATION_DATA = [
  { title: 'Team (20%)', desc: 'For core team and  project copntributors' },
  { title: 'Advisors (5%)', desc: 'For advisors and partners' },
  { title: 'Investor (15%)', desc: 'For private sale and public sale' },
  {
    title: 'Community (60%)',
    desc: 'For builders, partnerships, marketing, liquidity, etc.',
  },
];

const Allocation = (props: Props) => {
  return (
    <Box
      className={s.wrapper}
      py={{ base: '40px', md: '100px' }}
      position={'relative'}
    >
      <Box
        bgColor={'#007659'}
        w="100vw"
        position={'absolute'}
        top={0}
        left={'calc(-50vw + 50%)'}
        h="100%"
        zIndex={0}
      ></Box>
      <Box zIndex={1} position={'relative'}>
        <Text as="h4" className={s.heading}>
          BVM Allocation
        </Text>
        <Text className={s.desc}>
          The total supply of BVM is permanently fixed at 100M tokens.
        </Text>
        <Box className={s.mobile} display={{ base: 'block', sm: 'none' }}>
          <Image
            src={'/images/chart-pie.png'}
            alt={'Allocation chart'}
            maxW={'100%'}
            mx="auto"
          ></Image>
          <Flex flexDir={'column'} gap="24px" alignItems={'center'}>
            {ALLOCATION_DATA.map((item, index) => (
              <Box key={index}>
                <Text fontSize={'18px'} lineHeight={'110%'} mb="8px">
                  {item.title}
                </Text>
                <Text fontSize={'14px'} lineHeight={'20px'}>
                  {item.desc}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <Image
          src={'/images/allocation-chart.png'}
          alt={'Allocation chart'}
          maxW={{ base: '100%', md: '70%' }}
          mx="auto"
          display={{ base: 'none', sm: 'block' }}
        ></Image>
      </Box>
    </Box>
  );
};

export default Allocation;
