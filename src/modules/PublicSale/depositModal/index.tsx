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
  saleWalletInfo,
  payAmountUsd,
}: any) => {
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const ethPrice = useMemo(() => coinPrices?.['ETH'] || '0', [coinPrices]);

  const payAmountBtc = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(btcPrice).toString();
  }, [payAmountUsd, btcPrice]);

  const payAmountEth = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(ethPrice).toString();
  }, [payAmountUsd, ethPrice]);

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={''}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      size="small"
    >
      <DepositContent />
    </BaseModal>
  );
};

export default DepositModal;
