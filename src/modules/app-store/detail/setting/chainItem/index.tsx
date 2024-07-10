import React from 'react';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import cx from 'clsx';
import {
  PRICING_PACKGE,
  PRICING_PACKGE_MAP,
} from '@/modules/PricingV2/constants';
import { IDAppDetails, IUserPackage } from '@/services/api/DAServices/types';

const ChainItem: React.FC<any> = ({
  data,
  onSelectChain,
  isButton,
  packageSelected,
  user_package,
}: {
  data: OrderItem;
  onSelectChain: any;
  isButton: boolean;
  packageSelected: IDAppDetails;
  user_package: IUserPackage[];
}) => {
  if (!data) {
    return (
      <MenuItem className={s.container}>
        <Text className={s.titleSelect}>Choose the chain</Text>
      </MenuItem>
    );
  }

  const getStatusStr = () => {
    if (data?.isNeedTopup) {
      return 'Waiting for payment';
    }

    if (!user_package || user_package.length < 1) {
      return 'Basic';
    }

    if (user_package) {
      const userPackageFinded = user_package.find(
        (item) =>
          Number(item.app_store_detail_id) === Number(packageSelected?.id),
      );
      if (userPackageFinded) {
        return `${userPackageFinded.status} - ${userPackageFinded.app_store_detail.package}`;
        // return `${userPackageFinded.status} - Basic`;
      }
    }
  };

  if (isButton) {
    return (
      <MenuItem className={s.container} w={'98%'}>
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
          <Text className={s.titleSelect}>
            {data?.chainName} -{' '}
            {PRICING_PACKGE_MAP[data?.package as PRICING_PACKGE]}
          </Text>
          <Text
            className={cx(s.package, data?.isNeedTopup ? s.needTopup : '')}
            textTransform={'capitalize'}
          >
            {getStatusStr()}
          </Text>
        </Flex>
      </MenuItem>
    );
  }

  return (
    <MenuItem
      className={cx(s.container, s.item)}
      onClick={() => onSelectChain?.(data)}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
        <Flex gap={'20px'} alignItems={'center'}>
          <Avatar width={'48px'} height={'48px'} src={data?.logoURL} />
          <Flex direction={'column'} gap={'8px'}>
            <Text className={s.title}>{data?.chainName}</Text>
            <Flex alignItems={'center'} gap={'12px'}>
              <Text className={s.chain_package}>
                {PRICING_PACKGE_MAP[data?.package as PRICING_PACKGE]}
              </Text>
              <Text className={s.price}>
                ${data?.packagePriceUSD} per rollup/month
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Text
          className={cx(s.package, data?.isNeedTopup ? s.needTopup : '')}
          textTransform={'capitalize'}
        >
          {getStatusStr()}
        </Text>
      </Flex>
    </MenuItem>
  );
};

export default ChainItem;
