import BoxContent from '@/layouts/BoxContent';
import { apiClient } from '@/services/index';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React, { useEffect, useMemo, useState } from 'react';
import { useHover, useLayer, useMousePositionAsTrigger } from 'react-laag';
import { PieChart } from 'react-minimal-pie-chart';
import s from './Tokens.module.scss';

function makeTooltipContent(entry: any) {
  return `${entry.value}% in ${entry.title}`;
}

const Tokens = () => {
  const [isOver, hoverProps] = useHover();
  const { handleMouseEvent, trigger, parentRef } = useMousePositionAsTrigger({
    enabled: isOver,
  });

  const { renderLayer, layerProps } = useLayer({
    isOpen: isOver,
    trigger,
  });

  const [hovered, setHovered] = useState<number | null>(null);

  const [report, setReport] = useState<any>();

  const _data = useMemo(() => {
    const liquidityPercent = 10;
    const stakedPercent = (
      (Number(report?.stake_balance) / Number(report?.circulating_supply)) *
      25
    ).toFixed(0);
    const notStakedPercent =
      25 - (Number(liquidityPercent) + Number(stakedPercent));
    return [
      {
        title: 'not staked',
        value: notStakedPercent,
        color: '#FF5717',
      },
      {
        title: 'staked',
        value: Number(stakedPercent),
        color: '#B77AE1',
      },
      {
        title: 'liquidity',
        value: Number(liquidityPercent),
        color: '#0B99FF',
      },
      {
        title: 'is locked. Vesting in 5 years.',
        value: 75,
        color: '#99D95F',
      },
    ];
  }, [report]);

  const data = _data.map(({ title, ...entry }) => {
    return {
      ...entry,
      tooltip: title,
    };
  });

  useEffect(() => {
    onGetReport();
  }, []);

  const onGetReport = async () => {
    try {
      const result = await apiClient.get(
        `https://api.nakachain.xyz/api/bvm/report`,
      );
      setReport(result);
    } catch (error) {}
  };

  return (
    <Box
      className={s.wrapper}
      py={{ base: '60px', md: '120px' }}
      position={'relative'}
    >
      <Box
        maxW={{ base: '100vw', lg: 1500 }}
        w="100%"
        px={'24px'}
        position={'relative'}
      >
        <Text
          fontSize={['28px', '40px']}
          lineHeight={{ base: '140%', md: '120%' }}
          fontWeight={400}
          textAlign={'center'}
          mb={{ base: '24px', md: '40px' }}
        >
          Overview
        </Text>
        <Flex direction="column" className={s.content}>
          <Flex w="100%" flex={1} justifyContent="center">
            <BoxContent>
              <Flex
                w="100%"
                flexDir={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'flex-start', lg: 'center' }}
                gap={{ base: '32px' }}
                p={'20px'}
              >
                <Flex
                  flex={{ base: 1, lg: 0.5 }}
                  w="100%"
                  maxW="500px"
                  direction="column"
                  gap="8px"
                  ml={{ base: '0px', lg: '16px' }}
                >
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Price</Text>
                    <Text className={s.priceValue}>
                      ${formatCurrency(report?.bvm_price)}
                    </Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Total supply</Text>
                    <Text className={s.priceValue}>100,000,000 BVM</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Circulating supply</Text>
                    <Text className={s.priceValue}>25,000,000 BVM</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Total staking value</Text>
                    <Tooltip
                      minH="40px"
                      bg="#ffffff"
                      boxShadow="0px 0px 24px 0px #00000014"
                      borderRadius="8px"
                      label={
                        <Flex
                          minH="40px"
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          color="#000"
                        >
                          <p>
                            <span style={{ color: '#6C6F93' }}>
                              Total staking amount
                            </span>{' '}
                            {formatCurrency(
                              report?.stake_balance,
                              0,
                              0,
                              '',
                              true,
                            )}{' '}
                            BVM
                          </p>
                        </Flex>
                      }
                    >
                      <Text
                        cursor="help"
                        textDecoration="underline"
                        className={s.priceValue}
                      >
                        $
                        {formatCurrency(
                          new BigNumber(report?.stake_balance).multipliedBy(
                            Number(report?.bvm_price).toString(),
                          ),
                          0,
                          0,
                          '',
                          true,
                        )}
                      </Text>
                    </Tooltip>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Market cap</Text>
                    <Text className={s.priceValue}>
                      $
                      {formatCurrency(
                        new BigNumber('25000000').multipliedBy(
                          Number(report?.bvm_price).toString(),
                        ),
                        0,
                        0,
                        '',
                        true,
                      )}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  flex={0.5}
                  alignItems="center"
                  justifyContent="flex-end"
                  ref={parentRef}
                >
                  <Box
                    position="relative"
                    className={s.pieChart}
                    {...hoverProps}
                    onMouseMove={handleMouseEvent}
                  >
                    <PieChart
                      data={data}
                      lineWidth={40}
                      onMouseOver={(_, index) => {
                        setHovered(index);
                      }}
                      totalValue={100}
                    />
                    <Box
                      position="absolute"
                      left="23%"
                      top="23%"
                      w="54%"
                      h="54%"
                      borderRadius="50%"
                      onMouseEnter={() => setHovered(null)}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        h="100%"
                      >
                        <Text color="#FF6126" fontSize="24px" fontWeight="500">
                          $BVM
                        </Text>
                      </Box>
                    </Box>
                    {isOver &&
                      renderLayer(
                        <div className={s.tooltip} {...layerProps}>
                          {typeof hovered === 'number' && (
                            <p>{makeTooltipContent(_data[hovered])}</p>
                          )}
                        </div>,
                      )}
                  </Box>
                </Flex>
              </Flex>
            </BoxContent>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Tokens;
