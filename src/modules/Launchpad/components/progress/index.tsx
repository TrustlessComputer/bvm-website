import { Box, Flex, Progress, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BigNumer from 'bignumber.js';
import { formatCurrency } from '@/utils/format';
import { commonSelector } from '@/stores/states/common/selector';
import { launchpadSelector } from '../../store/reducer';

const LaunchpadProgress = ({
  goal,
  commited,
}: {
  goal: string;
  commited?: string;
}) => {
  const coinPrices = useSelector(commonSelector).coinPrices;
  const { countTotalTickets } = useSelector(launchpadSelector);
  const priceBVM = useMemo(() => {
    return coinPrices['BVM'] || '0';
  }, [coinPrices]);

  const idoValue = useMemo(() => {
    return (
      commited ||
      new BigNumer(countTotalTickets)
        .multipliedBy(200)
        .multipliedBy(priceBVM)
        .toString()
    );
  }, [priceBVM, countTotalTickets, commited]);

  return (
    <Flex className={s.container} direction={'column'} w={'100%'}>
      <Flex justifyContent={'space-between'}>
        <Text>Raised / Goal</Text>
        <Flex gap={'8px'} alignItems={'center'} color={'#000'}>
          <Text fontWeight={600}>
            ${formatCurrency(idoValue, 0, 2, 'BTC', true)}
          </Text>
          /<Text>${formatCurrency(goal, 0, 2, 'BTC', true)}</Text>
        </Flex>
        {/*<Column
          title={"Tickets"}
          value={
          <Flex gap={"8px"}>
            <Text>
              <NumberScale
                label={''}
                couters={countTotalTickets}
                maximumFractionDigits={0}
                minimumFractionDigits={0}
                defaultFrom={String(oldCountTotalTickets)}
              />
            </Text>
            <Text>105,068</Text>
          </Flex>
          }
        />
        <Column
          title={<Text textAlign={"right"}>Raised</Text>}
          value={
          <Flex gap={"8px"} alignItems={"center"}>
            <Text fontWeight={600}>{formatCurrency(idoValue, 0, 2, 'BTC', true)}</Text>/
            <Text>10,000 USD</Text>
          </Flex>
          }
        />*/}
      </Flex>
      <Box className={s.progressBar}>
        <Progress size="sm" value={100} hasStripe />
      </Box>
    </Flex>
  );
};

export default LaunchpadProgress;
