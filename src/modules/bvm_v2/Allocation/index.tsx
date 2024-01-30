import React from 'react';
import s from './Allocation.module.scss';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Vesting from '@/modules/bvm_v2/Vesting';
import BoxContent from '@/layouts/BoxContent';


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
      py={{ base: '40px', md: '100px' }}
      position={'relative'}
    >
      <Box
        bgColor={'#007659'}
        w='100%'
        position={'absolute'}
        top={0}
        left={'calc(-50vw + 50%)'}
        h='100%'
        zIndex={0}
      />
      <Box zIndex={1} position={'relative'}>
        <Text as="h4" className={s.heading}>
          BVM Tokenomics
        </Text>
        <Text className={s.desc}>
          The total supply of BVM is permanently fixed at 100M tokens.
        </Text>
        <Flex w="100%" flex={1} justifyContent="center">
          <BoxContent>
            <Flex
              w="100%"
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "32px", lg: "200px" }}
              mt={{ base: "16px", lg: "60px" }}
            >
              <Flex flex={1}>
                <Image
                  src={'/images/pie-chart-7.png'}
                  alt={'Allocation chart'}
                  flex={1}
                  mx="auto"
                />
              </Flex>
              <Flex flex={1}>
                <Vesting />
              </Flex>
            </Flex>
          </BoxContent>
        </Flex>
      </Box>
    </Box>
  );
};

export default Allocation;
