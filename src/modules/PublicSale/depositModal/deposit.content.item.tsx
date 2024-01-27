import { PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import { Avatar, MenuItem, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { INFO_TOKENS } from './constants';
import s from './styles.module.scss';

interface IDepositContentItem {
  token: PublicSaleWalletTokenDeposit | undefined;
  onSelectToken?: (token: PublicSaleWalletTokenDeposit) => void;
}

const DepositContentItem: React.FC<IDepositContentItem> = ({
  token,
  onSelectToken,
}) => {
  const tokenInfo = useMemo(() => {
    if (token) {
      return (INFO_TOKENS as any)[token.coin];
    }
  }, [token]);
  if (!token) {
    return <MenuItem>{'Select an token'}</MenuItem>;
  }
  return (
    <MenuItem className={s.itemToken} onClick={() => onSelectToken?.(token)}>
      <Avatar width={'24px'} height={'24px'} src={tokenInfo?.icon} />
      <Text>{tokenInfo?.name}</Text>
    </MenuItem>
  );
};

export default DepositContentItem;
