import { Button, Flex } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { KEY_TWITTER_USERNAME, KEY_VC_TYPE, KEY_WALLET_ID } from '@/constants/storage-key';
import CookieUtil from '@/utils/cookie';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import QRCode from 'react-qr-code';
import LocalStorageUtil from '@/utils/localstorage';
import { getVCWalletInfo } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';

interface FormValues {
  username: string;
}

const JoinAllowList = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);
  const walletId = LocalStorageUtil.get(KEY_WALLET_ID) || '';
  const [vcInfo, setVCInfo] = useState<VCInfo>();

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
      // const result = await addAllowList(formValues.username);
      // CookieUtil.set(KEY_TWITTER_USERNAME, formValues.username);
      // router.push(ALLOW_LIST_URL);
      handleGetDepositAddress();
    } catch (error) {
      toast.error('Can not verify the post.');
    } finally {
      setIsCreating(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { username: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const onChangeText = (e: any) => {
    formik.setValues((values: any) => ({
      ...values,
      username: e.target.value,
    }));
  };

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
              id="username"
              value={formValues.username}
              placeholder="Enter amount you want to buy"
              className={s.input}
              onChange={onChangeText}
            />
          </div>
          <Fade delay={.8}>
            <Button
              type='submit'
              isDisabled={isCreating || !formValues.username}
              isLoading={isCreating}
              loadingText={'Submitting...'}
              className={s.button}
            >
              Buy now
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
                Total BTC <span>{formatCurrency(vcInfo?.btc_balance)} BTC</span>
              </Chars>
            </div>
            <div className={s.desc}>
              <Chars delay={.7}>
                Total ETH <span>{formatCurrency(vcInfo?.eth_balance)} ETH</span>
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
