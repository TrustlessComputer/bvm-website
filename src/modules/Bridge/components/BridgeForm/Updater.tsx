import { IFormValues, TokenType } from '@/modules/Bridge/types';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import { CHAIN_TYPE } from '@/constants/chains';
import useToggleDeposit from '@/modules/Bridge/components/DepositQRCode/useToggleDeposit';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import useERC20Balance from '@hooks/useERC20BalanceVer2';
import BigNumberJS from 'bignumber.js';
import {
  DOGE_DOGECOIN,
  DOGE_NETWORK,
  DOGE_TC_DOGECOIN,
  RIIPLE_NETWORK,
  TC_DOGE_NETWORK,
  TC_RIPPLE_NETWORK,
  XRP_RIPPLE,
  XRP_TC_RIPPLE,
} from '../../constant';

const Updater = () => {
  const formik = useFormikContext();
  const { values, setFieldValue } = useFormikContext();
  const needReload = useAppSelector(commonSelector)?.needReload;
  const { fromToken, fromNetwork, toNetwork, toToken, isQRCode } =
    formik.values as IFormValues;

  useEffect(() => {
    if (fromNetwork.name === CHAIN_TYPE.RIPPLE) {
      setFieldValue('fromToken', XRP_RIPPLE);
      setFieldValue('toNetwork', TC_RIPPLE_NETWORK);
      setFieldValue('toToken', XRP_TC_RIPPLE);
    } else if (fromNetwork.name === CHAIN_TYPE.TC_RIPPLE) {
      setFieldValue('fromToken', XRP_TC_RIPPLE);
      setFieldValue('toNetwork', RIIPLE_NETWORK);
      setFieldValue('toToken', XRP_RIPPLE);
    } else if (fromNetwork.name === CHAIN_TYPE.DOGE) {
      setFieldValue('fromToken', DOGE_DOGECOIN);
      setFieldValue('toNetwork', TC_DOGE_NETWORK);
      setFieldValue('toToken', DOGE_TC_DOGECOIN);
    } else if (fromNetwork.name === CHAIN_TYPE.TC_DOGE) {
      setFieldValue('fromToken', DOGE_TC_DOGECOIN);
      setFieldValue('toNetwork', DOGE_NETWORK);
      setFieldValue('toToken', DOGE_DOGECOIN);
    }
  }, [fromNetwork, setFieldValue]);

  useEffect(() => {
    const isDeposit =
      (fromToken.tokenType === TokenType.RIPPLE ||
        fromToken.tokenType === TokenType.DOGE) &&
      toToken.tokenType === TokenType.EVM;
    const isQRCode = isDeposit;
    setFieldValue('isQRCode', isQRCode);
  }, [fromToken?.chainId, toToken?.chainId]);

  useEffect(() => {
    if (toToken.tokenType === TokenType.EVM) {
      setFieldValue('recipient', '');
    }
  }, [toToken?.tokenType]);

  return null;
};

export default Updater;
