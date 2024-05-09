import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { formatCurrency } from '@/utils/format';
import { Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import useERC20Balance from './useERC20Balance';
import { IToken } from './types';

export interface ItemBalanceProps {
  token?: IToken | undefined;
  onBalanceChange?: (_amount: string | undefined) => void;
}

const ERC20Balance = (props: ItemBalanceProps) => {
  const { token, onBalanceChange } = props;

  const { balance, loading } = useERC20Balance({ token, onBalanceChange });

  return (
    <Skeleton isLoaded={!loading && Boolean(token)}>
      <Text color="white" fontSize="14px">
        {formatCurrency(balance, MIN_DECIMAL, MAX_DECIMAL)}
      </Text>
    </Skeleton>
  );
};

export default ERC20Balance;
