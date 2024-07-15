'use client';

import {
  PRICING_PACKGE,
  PRICING_PACKGE_MAP,
} from '@/modules/PricingV2/constants';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import s from '../styleFont.module.scss';
import BigNumber from 'bignumber.js';

type Props = {
  item: OrderItem;
};

const PackageSection = (props: Props) => {
  const { item } = props;
  const totalCost = useMemo(() => {
    if (!item || !item.selectedOptions) return 0;

    let totalCost = 0;
    item.selectedOptions.map((legoModule) => {
      let totolCostOption = 0;

      legoModule.options?.map((option) => {
        totolCostOption = totolCostOption + option.priceUSD;
      });

      totalCost = totalCost + Number(totolCostOption || 0);
    });

    return totalCost;
  }, [item]);

  return (
    <Flex
      bgColor={'#F6F6F6'}
      p="20px"
      borderRadius={'8px'}
      align={'center'}
      justify={'space-between'}
    >
      <Text
        fontSize={['16px', '18px', '20px']}
        fontWeight={600}
        className={s.fontSFProDisplay}
        bgGradient={`linear(to-r, #8AABF9, #627EEA)`}
        bgClip={'text'}
      >
        {`Cost`}
      </Text>
      <Text
        fontSize={['16px', '18px', '20px']}
        fontWeight={500}
        className={s.fontSFProDisplay}
        bgGradient={`linear(to-r, #8AABF9, #627EEA)`}
        bgClip={'text'}
      >
        {new BigNumber(totalCost || 0).isZero()
          ? '--/month'
          : `$${new BigNumber(totalCost).decimalPlaces(2).toString()}/month`}
      </Text>
    </Flex>
  );
};

export default PackageSection;
