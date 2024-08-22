/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { formatCurrency } from '@/utils/format';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import React, { useContext } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import Balances from './Balances';

const PortfolioTab = () => {
  const { rollupDetails, rollupTokensRate, totalBalanceUsd } = useContext(
    L2RollupDetailContext,
  );

  const renderChains = () => {
    return (
      <Grid
        w="100%"
        mt="20px"
        gridTemplateColumns={{
          base: 'repeat(auto-fill, 200px)',
        }}
        gap={{ base: '16px', lg: '20px' }}
        p={{ base: '12px', lg: '24px' }}
        borderRadius={'12px'}
        className={s.chains}
      >
        {rollupDetails.length > 0 &&
          rollupDetails.map((detail) => {
            if (!detail.rollup) return;

            const totalUsd = detail.balances?.reduce((accum, item) => {
              if (!rollupTokensRate) return accum;
              const tokenRateUsd = rollupTokensRate[item.token_name];
              if (!tokenRateUsd) return accum;
              return (
                accum +
                new BigNumber(item.value)
                  .multipliedBy(new BigNumber(tokenRateUsd))
                  .toNumber()
              );
            }, 0);

            return (
              <Flex direction={'row'} alignItems={'center'} gap={'12px'}>
                <Image
                  src={detail.rollup?.icon}
                  w={'40px'}
                  h={'40px'}
                  borderRadius={'50%'}
                />
                <Flex direction={'column'}>
                  <Text fontWeight={'400'} color={'#808080'}>
                    {detail.rollup?.name}
                  </Text>
                  <Flex direction={'row'} alignItems={'center'} gap={'8px'}>
                    <Text fontWeight={'600'} fontSize={'18px'}>
                      ${formatCurrency(totalUsd, 2, 2)}
                    </Text>
                    <Text
                      color={'#808080'}
                      fontSize={'14px'}
                      fontWeight={'400'}
                    >
                      {totalUsd
                        ? ((totalUsd / totalBalanceUsd) * 100).toFixed(0)
                        : 0}
                      %
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
      </Grid>
    );
  };

  return (
    <Box className={s.container}>
      {renderChains()}
      <Balances />
    </Box>
  );
};

export default PortfolioTab;
