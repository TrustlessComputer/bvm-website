import BaseModal from '@/components/BaseModal';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

import QRCode from 'react-qr-code';
import s from './styles.module.scss';
import Header from './Header';
import BalanceInfor from './BalanceInfor';
import History from './History';
import { OrderItem } from '@/stores/states/l2services/types';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { fetchL2ServiceHistory } from '@/stores/states/l2services/actions';
import WarningMessageView from './WarningMessageView';

interface IProps {
  show: boolean;
  item?: OrderItem;
  onClose?: (() => void) | any;
  onSuccess: () => void;
  viewPaymentOnClick?: () => void;
}

const TIMER_INTERVAL = 10000; //10s

const BillingModal = (props: IProps) => {
  const { show, onClose, onSuccess, item, viewPaymentOnClick } = props;

  const timerRef = useRef<any>();
  const dispatch = useAppDispatch();

  const fetchHistory = async () => {
    dispatch(fetchL2ServiceHistory());
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

  if (!item) return null;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
    >
      <Flex
        mt={'-20px'}
        display={'flex'}
        flexDir={'column'}
        w={'100%'}
        bgColor={'#fff'}
        borderRadius={'10px'}
        p={'10px'}
      >
        <Header item={item} viewPaymentOnClick={viewPaymentOnClick} />
        <BalanceInfor item={item} />
        <WarningMessageView />
        <History />
      </Flex>
    </BaseModal>
  );
};

export default BillingModal;
