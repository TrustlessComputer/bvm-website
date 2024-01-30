import BaseModal from '@/components/BaseModal';
import DepositContent from './deposit.content';
import s from './styles.module.scss';

const DepositModal = ({ isShow, onHide, payAmountUsd }: any) => {
  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Deposit'}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      size="custom"
    >
      <DepositContent amount_usd={payAmountUsd} />
    </BaseModal>
  );
};

export default DepositModal;
