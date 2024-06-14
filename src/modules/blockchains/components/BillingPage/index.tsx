import { Flex, Text, Image } from '@chakra-ui/react';

import AccountInfor from './AccountInfor';
import History from './History';
import s from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchL2ServiceHistory } from '@/stores/states/l2services/actions';
import { historyInfoSelector } from '@/stores/states/l2services/selector';

interface IProps {}

const TIMER_INTERVAL = 10000; //10s

interface IProps {
  viewPaymentOnClick: () => void;
}

const BillingPage = (props: IProps) => {
  const { viewPaymentOnClick } = props;
  const { historyList } = useAppSelector(historyInfoSelector);
  const timerRef = useRef<any>();
  const dispatch = useAppDispatch();

  const fetchHistory = async () => {
    dispatch(fetchL2ServiceHistory());
  };

  const renderDataEmptyView = () => {
    return (
      <Flex
        flexDir={'column'}
        height={'300px'}
        w={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Image
          src={'/blockchains/customize/ic-empty.svg'}
          w={'150px'}
          h={'auto'}
          objectFit={'contain'}
          alignSelf={'center'}
          style={{ filter: 'invert(100%)' }}
        />
      </Flex>
    );
  };

  useEffect(() => {
    fetchHistory();
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        fetchHistory();
      }, TIMER_INTERVAL);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, []);

  return (
    <Flex
      className={s.container}
      display={'flex'}
      flexDir={'column'}
      w={'100%'}
      bgColor={'transparent'}
      p={'10px'}
      gap={'32px'}
    >
      <AccountInfor viewPaymentOnClick={viewPaymentOnClick} />

      <Flex
        display={'flex'}
        flexDir={'column'}
        height={'100%'}
        w={'100%'}
        borderRadius={'16px'}
        p="24px"
        gap={'24px'}
        bgColor={'#fff'}
      >
        <Text
          className={s.font3}
          fontSize={'24px'}
          fontWeight={500}
          lineHeight={'33px'}
          color={'#000'}
        >
          History billing
        </Text>

        {!historyList || historyList.length < 1 ? (
          renderDataEmptyView()
        ) : (
          <History />
        )}
      </Flex>
    </Flex>
  );
};

export default BillingPage;
