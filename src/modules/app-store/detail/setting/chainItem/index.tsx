import React from 'react';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import cx from 'clsx';
import {
  PRICING_PACKGE,
  PRICING_PACKGE_MAP,
} from '@/modules/PricingV2/constants';
import {
  IDApp,
  IDAppDetails,
  IUserPackage,
} from '@/services/api/DAServices/types';
import { checkDAInstallHelper } from '../../helper';

const ChainItem: React.FC<any> = ({
  dApp,
  data,
  onSelectChain,
  isButton,
  packageSelected,
  user_package,
}: {
  dApp: IDApp;
  data: OrderItem;
  onSelectChain: any;
  isButton: boolean;
  packageSelected: IDAppDetails;
  user_package: IUserPackage[];
}) => {
  const { statusStr, statusColor } = checkDAInstallHelper(data, dApp, packageSelected);
  if (!data) {
    return (
      <MenuItem className={s.container}>
        <Text className={s.titleSelect}>Choose the chain</Text>
      </MenuItem>
    );
  }

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
            {statusStr}
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
          className={cx(s.package)}
          textTransform={'capitalize'}
          color={statusColor}
        >
          {statusStr}
        </Text>
      </Flex>
    </MenuItem>
  );
};

export default ChainItem;
