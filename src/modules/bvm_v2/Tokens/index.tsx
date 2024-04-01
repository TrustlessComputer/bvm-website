import BoxContent from '@/layouts/BoxContent';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
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

  const _data = [
    { title: 'liquidity', value: 10, color: '#99D95F' },
    { title: 'staked', value: 15, color: '#FF5717' },
    { title: 'not staked', value: 20, color: '#0B99FF' },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const data = _data.map(({ title, ...entry }) => {
    return {
      ...entry,
      tooltip: title,
    };
  });

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
        <Text className={s.desc}>Platform, ...</Text>
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
                  flex={{ base: 1, lg: 0.7 }}
                  w="100%"
                  direction="column"
                  gap="8px"
                  ml={{ base: '0px', lg: '16px' }}
                >
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Price</Text>
                    <a className={s.link}>Extra link ↗</a>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Supply</Text>
                    <Text className={s.priceValue}>$675,774,146</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Total Staked</Text>
                    <Text className={s.priceValue}>$675,774,146</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Market Cap</Text>
                    <Text className={s.priceValue}>$675,774,146</Text>
                  </Flex>
                  <Flex className={s.priceItem}>
                    <Text className={s.price}> • Vesting</Text>
                    <Text className={s.priceValue}>$675,774,146</Text>
                  </Flex>
                </Flex>
                <Flex flex={0.3} justifyContent="center" ref={parentRef}>
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
                        <Text color="#FF6126" fontWeight="500">
                          $BVM
                        </Text>
                      </Box>
                    </Box>
                    {isOver &&
                      renderLayer(
                        <div className={s.tooltip} {...layerProps}>
                          {typeof hovered === 'number'
                            ? makeTooltipContent(_data[hovered])
                            : null}
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
