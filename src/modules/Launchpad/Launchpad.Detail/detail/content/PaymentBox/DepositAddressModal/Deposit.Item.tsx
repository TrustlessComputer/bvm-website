import { INFO_TOKENS } from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/DepositAddressModal/tokens';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';

interface IDepositContentItem {
  token: WalletTokenDeposit | undefined;
  onSelectToken?: (token: WalletTokenDeposit) => void;
  isActive?: boolean;
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

export const DepositContentItem2: React.FC<IDepositContentItem> = ({
  token,
  onSelectToken,
  isActive,
}) => {
  console.log('DepositContentItem2', token);

  const tokenInfo = useMemo(() => {
    if (token) {
      return (INFO_TOKENS as any)[token.symbol];
    }
  }, [token]);
  if (!token) {
    return null;
  }
  return (
    <Flex
      className={cs(s.itemToken2, isActive && s.active)}
      onClick={() => onSelectToken?.(token)}
    >
      <Avatar width={'24px'} height={'24px'} src={tokenInfo?.icon} />
      <Text>{tokenInfo?.symbol}</Text>
    </Flex>
  );
};

export default DepositContentItem;
