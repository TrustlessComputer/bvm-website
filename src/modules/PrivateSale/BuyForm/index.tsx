import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { toast } from 'react-hot-toast';
import { KEY_VC_TYPE, KEY_WALLET_ID } from '@/constants/storage-key';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import LocalStorageUtil from '@/utils/localstorage';
import { getVCWalletInfo } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { commonSelector } from '@/stores/states/common/selector';
import { useSelector } from 'react-redux';
import { MAX_DECIMAL } from '@/constants/constants';
import { QRCode } from 'react-qrcode-logo';
import Countdown from '@/components/Countdown';
import dayjs from 'dayjs';

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
  };

  useEffect(() => {
    if (vcType) {
      getVentureInfo();
    }
  }, [vcType, walletId]);

  const getVentureInfo = async () => {
    const result = await getVCWalletInfo({ vc_type: vcType, wallet_id: walletId });
    setVCInfo(result);
    LocalStorageUtil.set(KEY_WALLET_ID, result.wallet_id);
  };

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
          <Text className={s.price}>1 BVM = 11$</Text>
          <Text className={s.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          <Text className={s.launchText}>Private Sale End in</Text>
          <Box mb={"80px"}>
            <Countdown className={s.textCountdown} expiredTime={dayjs.utc('2024-01-26', 'YYYY-MM-DD').toString()} hideIcon={true}/>
          </Box>
          <Flex gap={8} direction={'column'} width={"100%"}>
            <div className={s.inputContainer}>
              <input
                type={'number'}
                id='tokenAmount'
                value={formValues.tokenAmount}
                placeholder='Enter number of token'
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
                <Flex gap={6} mt={4} w={"100%"} justifyContent={"space-between"}>
                  <Flex direction={"column"} alignItems={"center"} gap={3} >
                    <QRCode
                      size={150}
                      value={vcInfo?.btc_address || ''}
                      logoImage={'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png'}
                    />
                    <Text className={s.depositValue}>{formatCurrency(vcInfo?.btc_balance, 4, 4)} BTC</Text>
                  </Flex>

                  <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <QRCode
                      size={150}
                      value={vcInfo?.eth_balance || ''}
                      logoImage={'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}
                    />
                    <Text className={s.depositValue}>{formatCurrency(vcInfo?.eth_balance, 4, 4)} ETH</Text>
                  </Flex>
                </Flex>
              )
            }
          </Flex>
        </div>
      </form>
    </div>
  );
};

export default JoinAllowList;
