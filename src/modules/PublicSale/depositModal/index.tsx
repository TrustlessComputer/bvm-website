import BaseModal from '@/components/BaseModal';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DepositContent from './deposit.content';
import s from './styles.module.scss';

const DepositModal = ({
  isShow,
  onHide,
  payAmountUsd,
}: any) => {
  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={''}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      // size="small"
    >
      <DepositContent amount_usd={payAmountUsd}/>
    </BaseModal>
  );
};

export default DepositModal;
