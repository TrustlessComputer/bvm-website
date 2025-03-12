import React from 'react';
import {
  BridgeToken,
  IDepositQRCode,
  IFormValues,
} from '@/modules/Bridges/types';
import DepositQRCodeBox from '@/modules/Bridges/components/DepositQRCode/DepositQRCodeBox';
import { useFormikContext } from 'formik';
import axios from 'axios';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import BaseModal from '@components/BaseModal';
import s from './styles.module.scss';

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  disableClose?: boolean;
};

const DepositQRCodeModal = React.memo((props: IProps) => {
  const { isOpen, onClose } = props;
  const { values } = useFormikContext();
  const { toToken, fromToken } = values as IFormValues;
  const [loading, setLoading] = React.useState(false);
  const [depositQRCode, setDepositQRCode] = React.useState<
    IDepositQRCode | undefined
  >(undefined);
  const { latestAddress } = useWagmiContext();

  const getDepositQRCode = async () => {
    setLoading(true);
    try {
      const deposit = (
        await axios.post(
          'https://l2aas-bridges-api.newbitcoincity.com/api/generate-deposit-address',
          {
            tcAddress: latestAddress,
            tcTokenID: toToken.address,
            toChainID: Number(toToken.network.chainId),
            fromChainID: Number(fromToken.network.chainId),
          },
        )
      )?.data?.data as IDepositQRCode;

      setDepositQRCode(deposit);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getDepositQRCode();
  }, []);

  return (
    <BaseModal
      isShow={isOpen}
      onHide={onClose}
      title={`Deposit ${fromToken.name}`}
      theme="light"
      icCloseUrl="/icons/ic_close_modal_black.svg"
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
    >
      <DepositQRCodeBox
        depositQRCode={depositQRCode}
        fromToken={fromToken}
        toToken={toToken}
        loading={loading}
      />
    </BaseModal>
  );
});

export default DepositQRCodeModal;
