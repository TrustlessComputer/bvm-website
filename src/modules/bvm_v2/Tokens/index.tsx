import BoxContent from '@/layouts/BoxContent';
import { apiClient } from '@/services/index';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
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
    const liquidityPercent =
      (Number(report?.liquidity) / Number(report?.circulating_supply)) * 100;
    const stakedPercent =
      (Number(report?.stake_balance) / Number(report?.circulating_supply)) *
      100;
    const notStakedPercent = 100 - (liquidityPercent + stakedPercent);
    return [
      {
        title: 'not staked',
        value: Number(notStakedPercent.toFixed(0)),
        color: '#FF5717',
      },
      {
        title: 'liquidity',
        value: Number(liquidityPercent.toFixed(0)),
        color: '#0B99FF',
      },
      {
        title: 'staked',
        value: Number(stakedPercent.toFixed(0)),
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
      py={{ base: '20px', md: '40px' }}
      position={'relative'}
    >
      <Box
        maxW={{ base: '100vw', lg: 1500 }}
        w="100%"
        px={'24px'}
        position={'relative'}
      >
        <Text as="h4" className={s.heading}>
          Tokens
        </Text>
        <Text className={s.desc}></Text>
        <Flex direction="column" className={s.content}>
          <Flex
            className={s.wContent}
            direction="row"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text className={s.title}>$BVM</Text>
          </Flex>
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
                    <Text className={s.price}> • Supply</Text>
                    <Text className={s.priceValue}>100,000,000 BVM</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Total Staked</Text>
                    <Text className={s.priceValue}>
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
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Market Cap</Text>
                    <Text className={s.priceValue}>
                      $
                      {formatCurrency(
                        new BigNumber(report?.market_cap).multipliedBy(
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
                <Flex flex={0.5} justifyContent="center" ref={parentRef}>
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
                        <Text color="#FF6126" fontSize="18px" fontWeight="500">
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
