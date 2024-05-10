import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';
import React from 'react';
import { formatCurrency, formatString } from '@/utils/format';
import { isAddress } from '@ethersproject/address';
import { validate } from 'bitcoin-address-validation';
import BigNumberJS from 'bignumber.js';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import { useSelector } from 'react-redux';
import { userSelector } from '@/stores/states/user/selector';
import { isAmount } from '@/utils/number';

interface IProps {
  data?: ILeaderBoardEAI;
  isEnd?: boolean;
}

const ContributorInfo = ({ data, isEnd }: IProps) => {
  const user = useSelector(userSelector);
  const isEVM = isAddress(user?.twitter_id || '');
  const isBTC = validate(user?.twitter_id || '');

  const lockedAmount = React.useMemo(() => {
    return new BigNumberJS(data?.usdt_value || 0).minus(data?.hard_cap || 0);
  }, [data?.usdt_value, data?.hard_cap]);

  const claimableAmount = React.useMemo(() => {
    if (lockedAmount.gt(0)) {
      return new BigNumberJS(data?.usdt_value || 0).minus(lockedAmount);
    }
    return new BigNumberJS(data?.usdt_value || 0);
  }, [data?.usdt_value, data?.hard_cap, lockedAmount]);

  return (
    <Flex direction={'column'} w={'100%'} gap={3} className={s.container}>
      {!!user && (isEVM || isBTC) ? (
        <HorizontalItem
          className={s.rowData}
          color={'#000000'}
          label="Address"
          value={formatString(user?.twitter_id, isEVM ? 6 : 8, '')}
        />
      ) : (
        <HorizontalItem
          className={s.rowData}
          color={'#000000'}
          label={'User'}
          value={formatString(data?.twitter_name, 16)}
        />
      )}
      <HorizontalItem
        className={s.rowData}
        color={'#000000'}
        label={'Rank'}
        value={formatCurrency(data?.ranking, 0, 0, 'BTC', true)}
      />
      <HorizontalItem
        className={s.rowData}
        color={'#000000'}
        label={
          'Your contribution' +
          (Number(data?.view_boost || 0) ? ` (boost applied)` : '')
        }
        value={`$${formatCurrency(data?.usdt_value, 0, 3, 'BTC', false)}`}
      />
      {!!data?.hard_cap && !!isAmount(data?.usdt_value) && (
        <HorizontalItem
          className={s.rowData}
          color={'#000000'}
          label={'Claimable at TGE'}
          value={
            isEnd
              ? `${formatCurrency(
                  new BigNumberJS(data?.token_balance || 0)
                    .minus(data?.vesting_token_balance || 0)
                    .toString(),
                  0,
                  3,
                  'BTC',
                  false,
                )} EAI`
              : `$${formatCurrency(
                  claimableAmount.toString(),
                  0,
                  3,
                  'BTC',
                  false,
                )}`
          }
        />
      )}
      {lockedAmount.gt(0) && (
        <HorizontalItem
          className={s.rowData}
          color={'#000000'}
          label={'6M cliff & 12M vesting'}
          value={
            isEnd
              ? `${formatCurrency(
                  data?.vesting_token_balance,
                  0,
                  3,
                  'BTC',
                  false,
                )} EAI`
              : `$${formatCurrency(
                  lockedAmount.toString(),
                  0,
                  3,
                  'BTC',
                  false,
                )}`
          }
        />
      )}
    </Flex>
  );
};

export default ContributorInfo;
