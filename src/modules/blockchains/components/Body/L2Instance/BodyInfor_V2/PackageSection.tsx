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
  const mapper = useOrderMapper(item);
  const { package: packageValue, packagePrice, packagePriceUSD } = item;

  const getColors = useMemo(() => {
    switch (item.package) {
      case PRICING_PACKGE.Hacker:
        return ['#8AABF9', '#627EEA'];

      case PRICING_PACKGE.Growth:
        return ['#FFE259', '#FFA751'];

      case PRICING_PACKGE.Secure:
        return ['#FF9776', '#E04300'];

      case PRICING_PACKGE.Enterprise:
        return ['#1DDEA4', '#3AB09B'];

      default:
        return ['#000', '#000'];
    }
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
        bgGradient={`linear(to-r, ${getColors[0]}, ${getColors[1]})`}
        bgClip={'text'}
      >
        {`${
          (packageValue !== undefined &&
            PRICING_PACKGE_MAP[packageValue as PRICING_PACKGE]) ||
          '--'
        }`}
      </Text>
      <Text
        fontSize={['16px', '18px', '20px']}
        fontWeight={500}
        className={s.fontSFProDisplay}
        bgGradient={`linear(to-r, ${getColors[0]}, ${getColors[1]})`}
        bgClip={'text'}
      >
        {`$${new BigNumber(packagePriceUSD || 0)
          .decimalPlaces(2)
          .toString()}/month`}
      </Text>
    </Flex>
  );
};

export default PackageSection;
