import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';
import React from 'react';
import { formatCurrency, formatString } from '@/utils/format';
import { isAddress } from '@ethersproject/address';
import { validate } from 'bitcoin-address-validation';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import { userSelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';

interface IProps {
  data?: ILeaderBoardEAI;
  isEnd?: boolean;
}

const ContributorInfo = ({ data }: IProps) => {
  const user = useSelector(userSelector);
  const isEVM = isAddress(user?.twitter_id || '');
  const isBTC = validate(user?.twitter_id || '');

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
    </Flex>
  );
};

export default ContributorInfo;
