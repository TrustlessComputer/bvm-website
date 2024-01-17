import { Button, Flex } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { toast } from 'react-hot-toast';
import { KEY_VC_TYPE, KEY_WALLET_ID } from '@/constants/storage-key';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import QRCode from 'react-qr-code';
import LocalStorageUtil from '@/utils/localstorage';
import { getVCWalletInfo } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { commonSelector } from '@/stores/states/common/selector';
import { useSelector } from 'react-redux';
import { MAX_DECIMAL } from '@/constants/constants';

interface FormValues {
  tokenAmount: string;
}

const JoinAllowList = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);
  const walletId = LocalStorageUtil.get(KEY_WALLET_ID) || '';
  const [vcInfo, setVCInfo] = useState<VCInfo>();
  const tokenPrice = 0.00123;
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const ethPrice = useMemo(() => coinPrices?.['ETH'] || '0', [coinPrices]);

  const handleGetDepositAddress = () => {
    setShowQrCode(true);
  }

  useEffect(() => {
    if (vcType) {
      getVentureInfo();
    }
  }, [vcType, walletId]);

  const getVentureInfo = async () => {
    const result = await getVCWalletInfo({vc_type: vcType, wallet_id: walletId});
    setVCInfo(result);
    LocalStorageUtil.set(KEY_WALLET_ID, result.wallet_id);
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setIsCreating(true);
      handleGetDepositAddress();
    } catch (error) {
      toast.error('Can not verify the post.');
    } finally {
      setIsCreating(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { tokenAmount: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const onChangeText = (e: any) => {
    formik.setValues((values: any) => ({
      ...values,
      tokenAmount: e.target.value,
    }));
  };

  const payAmountUsd = useMemo(() => {
    return new BigNumber(tokenPrice).multipliedBy(formValues.tokenAmount).toString();
  }, [formValues.tokenAmount]);

  const payAmountBtc = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(btcPrice).toString();
  }, [payAmountUsd, btcPrice]);

  const payAmountEth = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(ethPrice).toString();
  }, [payAmountUsd, ethPrice]);

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
      <div className={s.content}>
        <Fade delay={.6}>
          <div className={s.titleWrapper}>
            <div className={s.title}>BVM PUBLIC SALE</div>
          </div>
        </Fade>
        <div className={s.desc}>
          <Chars delay={.7}>
            Be the first to know. Allowlisters get up to <span>30% extra tokens</span>.
          </Chars>
        </div>

        <Flex gap={3} direction={'column'}>
          <div className={s.inputContainer}>
            <input
              type={"number"}
              id="tokenAmount"
              value={formValues.tokenAmount}
              placeholder="Enter amount you want to buy"
              className={s.input}
              onChange={onChangeText}
            />
          </div>
          <Fade delay={.8}>
            <Button
              type='submit'
              isDisabled={isCreating || !formValues.tokenAmount}
              isLoading={isCreating}
              loadingText={'Submitting...'}
              className={s.button}
            >
              {Number(formValues.tokenAmount) > 0 ? `Pay ${formatCurrency(payAmountBtc, MAX_DECIMAL, MAX_DECIMAL, 'BTC', true)} BTC / ${formatCurrency(payAmountEth, MAX_DECIMAL, MAX_DECIMAL, 'BTC', true)} ETH` : 'Buy now'}
            </Button>
          </Fade>
          {
            showQrCode && (
              <Flex gap={6} p={4}>
                <QRCode className={s.qrCode} size={150} value={vcInfo?.btc_address || ''} />
                <QRCode className={s.qrCode} size={150} value={vcInfo?.eth_address || ''} />
              </Flex>
            )
          }
          <Flex justifyContent={"space-between"}>
            <div className={s.desc}>
              <Chars delay={.7}>
                Total BTC <span>{formatCurrency(vcInfo?.btc_balance, 4, 4)} BTC</span>
              </Chars>
            </div>
            <div className={s.desc}>
              <Chars delay={.7}>
                Total ETH <span>{formatCurrency(vcInfo?.eth_balance, 4, 4)} ETH</span>
              </Chars>
            </div>
          </Flex>
        </Flex>
      </div>
      </form>
    </div>
  );
};

export default JoinAllowList;
