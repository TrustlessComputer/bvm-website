import React from 'react';
import s from './Allocation.module.scss';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Vesting from '@/modules/bvm_v2/Vesting';
import BoxContent from '@/layouts/BoxContent';

const Allocation = () => {
  return (
    <Box
      className={s.wrapper}
      py={{ base: '30px', md: '80px' }}
      position={'relative'}
    >
      <Box maxW={{ base: '100vw', lg: 1500 }} px={'24px'} position={'relative'}>
        <Text as="h4" className={s.heading}>
          Vesting
        </Text>
        <Text className={s.desc}>Platform, ...</Text>
        <Flex direction="column" className={s.content}>
          <Flex
            className={s.wContent}
            direction="row"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text className={s.title}>BVM Unlock Schedule</Text>
            <a className={s.link}>Smart contract ↗</a>
          </Flex>
          <Flex w="100%" flex={1} justifyContent="center">
            <BoxContent>
              <Flex
                w="100%"
                flexDir={{ base: 'column', lg: 'row' }}
                alignItems="center"
                gap={{ base: '32px' }}
                px={'20px'}
              >
                <Flex flex={1}>
                  <Image
                    src={'/images/vesting-chart-1.png'}
                    alt={'Allocation chart'}
                    flex={1}
                    mx="auto"
                  />
                </Flex>
                <Flex maxW={{ base: '80vw', lg: 'auto' }} flex={1}>
                  <Vesting />
                </Flex>
              </Flex>
            </BoxContent>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Allocation;
