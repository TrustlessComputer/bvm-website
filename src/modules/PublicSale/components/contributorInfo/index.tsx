import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';
import React from 'react';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { ellipsisCenter, formatCurrency, formatString } from '@/utils/format';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { isAddress } from '@ethersproject/address';
import { validate } from 'bitcoin-address-validation';

const ContributorInfo = ({ data }: {data?: ILeaderBoardPoint}) => {
  const user = useAppSelector(userSelector)
  const isEVM = isAddress(user?.twitter_id || "");
  const isBTC = validate(user?.twitter_id || "");

  return (
    <Flex direction={'column'} w={'284px'} gap={3} className={s.container}>
      {!!user && (isEVM || isBTC) ? (
        <HorizontalItem className={s.rowData} color={"#000000"} label="ADDRESS" value={ellipsisCenter({ str: user?.twitter_id, limit: 6 })} />
      ) : (
        <HorizontalItem className={s.rowData} color={"#000000"} label={'USER'} value={formatString(data?.twitter_name, 16)} />
      )}
      <HorizontalItem className={s.rowData} color={"#000000"} label={'RANK'} value={formatCurrency(data?.ranking, 0, 0, 'BTC', true)} />
      {/*<HorizontalItem className={s.rowData} color={"#000000"} label={'ALLOCATION'} value={*/}
      {/*  <Flex gap={1} flexDirection="column">*/}
      {/*    <Text color={'#FF5312'}>{formatCurrency(data?.bvm_balance, MIN_DECIMAL, MAX_DECIMAL)} BVM</Text>*/}
      {/*    <Text color={'#000000'}>({formatCurrency(data?.bvm_percent, MIN_DECIMAL, MIN_DECIMAL)}%)</Text>*/}
      {/*  </Flex>*/}
      {/*}/>*/}
    </Flex>
  );
};

export default ContributorInfo;
