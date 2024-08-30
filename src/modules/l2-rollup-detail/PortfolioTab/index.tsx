/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { formatCurrency } from '@/utils/format';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { ArcElement, Chart, Tooltip } from 'chart.js';
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import Balances from './Balances';
import s from './styles.module.scss';
Chart.register([ArcElement, Tooltip]);

const PortfolioTab = () => {
  const { rollupDetails, rollupL2PorfolioBalances, totalBalanceUsd } =
    useContext(L2RollupDetailContext);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (yDatapoint: any) => {
            return ` $${formatCurrency(yDatapoint.raw, 2, 2, '', true)}`;
          },
        },
      },
    },
  };

  const renderPortfolio = () => {
    return (
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ base: '20px', lg: '60px' }}
        mb="36px"
      >
        {rollupL2PorfolioBalances && (
          <Box maxW={'220px'}>
            <Pie
              options={options}
              data={{
                labels: rollupL2PorfolioBalances.map(
                  (item) => item.rollup?.name || '-',
                ),
                datasets: [
                  {
                    data: rollupL2PorfolioBalances.map((item) => {
                      return item.balanceUsd;
                    }),
                    backgroundColor: rollupL2PorfolioBalances.map(
                      (_, index) => {
                        let n = ((index + 1) * 7 * 0xfffff * 1000000).toString(
                          16,
                        );
                        return '#' + n.slice(0, 6);
                      },
                    ),
                  },
                ],
              }}
            />
          </Box>
        )}
        <Flex
          direction={'column'}
          className={s.chains}
          p={{ base: '12px', lg: '24px' }}
          w="100%"
          gap={'24px'}
          borderRadius={'12px'}
        >
          <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
            <Text fontWeight={'400'} color={'#808080'}>
              Total asset value:
            </Text>
            <Text fontWeight={'600'} fontSize={'18px'}>
              {`$${formatCurrency(totalBalanceUsd, 2, 2)}`}
            </Text>
          </Flex>

          <Grid
            w="100%"
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 230px)',
            }}
            columnGap={{ base: '16px', lg: '24px' }}
            rowGap={'20px'}
          >
            {rollupL2PorfolioBalances.map((detail) => {
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
                        ${formatCurrency(detail?.balanceUsd || '0', 2, 2)}
                      </Text>
                      <Text
                        color={'#808080'}
                        fontSize={'14px'}
                        fontWeight={'400'}
                      >
                        {detail?.percent}%
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </Grid>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box className={s.container}>
      {rollupDetails.length > 0 && renderPortfolio()}
      <Balances />
    </Box>
  );
};

export default PortfolioTab;
