import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';
import React from 'react';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';

const ContributorInfo = ({data}: {data?: ILeaderBoardPoint}) => {
  return (
    <Flex direction={'column'} w={'284px'} gap={3} className={s.container}>
      <HorizontalItem className={s.rowData} color={"#000000"} label={'USER'} value={data?.twitter_name} />
      <HorizontalItem className={s.rowData} color={"#000000"} label={'RANK'} value={formatCurrency(data?.ranking, 0, 0, 'BTC', true)} />
      {/*<HorizontalItem className={s.rowData} label={'CONTRIBUTION'} value={`$${formatCurrency(data?.usdt_value, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}`} />*/}
      <HorizontalItem className={s.rowData} color={"#000000"} label={'ALLOCATION'} value={
        <Flex gap={1}>
          <Text color={'#FF5312'}>{formatCurrency(data?.bvm_balance, MIN_DECIMAL, MAX_DECIMAL)} BVM</Text>
          <Text color={'#000000'}>({formatCurrency(data?.bvm_percent, MIN_DECIMAL, MIN_DECIMAL)}%)</Text>
        </Flex>
      } />
      {/*<HorizontalItem className={s.rowData} label={'BOOST'} value={
        <Flex gap={1} alignItems={'center'}>
          <svg width='14' height='20' viewBox='0 0 14 20' fill='none'
               xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M13.6663 8.18093H8.21179L9.42391 0.908203L0.333008 11.8173H5.78755L4.57543 19.09L13.6663 8.18093Z'
              fill='url(#paint0_linear_29823_6261)' />
            <defs>
              <linearGradient id='paint0_linear_29823_6261' x1='0.333008' y1='9.99911' x2='13.6663'
                              y2='9.99911' gradientUnits='userSpaceOnUse'>
                <stop stop-color='#007659' />
                <stop offset='1' stop-color='#35CCA6' />
              </linearGradient>
            </defs>
          </svg>
          <Text fontSize={'16px'} fontWeight={'500'} className={s.boost}>{`${formatCurrency(data?.boost, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}%`}</Text>
        </Flex>
      } />*/}
    </Flex>
  );
};

export default ContributorInfo;
