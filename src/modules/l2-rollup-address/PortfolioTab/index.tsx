/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { Box, Grid, Flex, Image, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import s from './styles.module.scss';

const PortfolioTab = () => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);

  const renderChains = () => {
    return (
      <Grid
        w="100%"
        mt="20px"
        gridTemplateColumns={{
          base: 'repeat(auto-fill, 172px)',
        }}
        gap={{ base: '16px', lg: '20px' }}
        p={{ base: '12px', lg: '24px' }}
        borderRadius={'12px'}
        className={s.chains}
      >
        <Flex direction={'row'} alignItems={'center'} gap={'12px'}>
          <Image w={'40px'} h={'40px'} borderRadius={'50%'} />
          <Flex direction={'column'}>
            <Text fontWeight={'400'} color={'#808080'}>
              Ethereum
            </Text>
            <Flex direction={'row'} alignItems={'center'} gap={'8px'}>
              <Text fontWeight={'600'} fontSize={'18px'}>
                $200.78
              </Text>
              <Text color={'#808080'} fontSize={'14px'} fontWeight={'400'}>
                10%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    );
  };

  return <Box className={s.container}>{renderChains()}</Box>;
};

export default PortfolioTab;
