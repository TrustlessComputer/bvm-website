import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import { getPublicsaleWalletInfo, postPublicsaleWalletInfo } from '@/services/player-share';
import { PublicSaleWalletInfo, VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import { QRCode } from 'react-qrcode-logo';
import Lines from '@/interactive/Lines';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { toast } from 'react-hot-toast';

interface FormValues {
  tokenAmount: string;
}

const DELAY = 2;

const Column = ({ value, title }: { value: string, title: string }) => {
  return (
    <Flex direction={'column'} justifyContent={'center'} flex={1} textAlign={'center'}>
      <Text fontSize={'32px'} fontWeight={700}>{value}</Text>
      <Text fontSize={'14px'} fontWeight={400}>{title}</Text>
    </Flex>
  );
};

const PrivateSaleForm = ({ vcInfo }: { vcInfo?: VCInfo }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [saleWalletInfo, setSaleWalletInfo] = useState<PublicSaleWalletInfo>();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    if (user?.twitter_id) {
      getVentureInfo();
    }
  }, [user?.twitter_id]);

  const getVentureInfo = async () => {
    const result = await getPublicsaleWalletInfo();
    setSaleWalletInfo(result);
    if(result) {
      setShowQrCode(true);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsCreating(true);
      const result = await postPublicsaleWalletInfo();
      setSaleWalletInfo(result);
      setShowQrCode(true);
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

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.content}>
          <Text className={s.title}><Lines delay={DELAY + .2}>PUBLIC TOKEN ROUND</Lines></Text>
          <Flex className={s.boxInfo} direction={'column'} gap={4} mt={'40px'} mb={'40px'} width={'100%'}>
            <Fade delay={DELAY + 0.2}>
              <Column value={formatCurrency(vcInfo?.total_tokens, 0, 0, 'BTC', true)} title={'TOTAL TOKENS'} />
            </Fade>
            <Divider />
            <Fade delay={DELAY + 0.4}>
              <Column value={`${vcInfo?.available_tokens}%`} title={'AVAILABLE TOKEN FOR PRIVATE SALE'} />
            </Fade>
            <Divider />
            <Fade delay={DELAY + 0.6}>
              <Flex>
                <Column value={`$${formatCurrency(vcInfo?.token_price, 0, 0)}`} title={'TOKEN PRICE'} />
                <Column value={`$${formatCurrency(vcInfo?.fdv, 0, 0, 'BTC')}`} title={'FDV'} />
              </Flex>
            </Fade>
            <Divider />
            <Fade delay={DELAY + 0.8}>
              <Flex>
                <Column value={`$${formatCurrency(vcInfo?.fundraising_goal, 0, 0, 'BTC')}`}
                        title={'FUNDRAISING GOAL'} />
                <Column value={`$${formatCurrency(vcInfo?.min_personal_cap, 0, 0, 'BTC', true)}`}
                        title={'MIN PERSONAL CAP'} />
              </Flex>
            </Fade>
          </Flex>
          <Flex gap={6} direction={'column'} width={'100%'}>
            {
              user?.twitter_id && !saleWalletInfo?.btc_address && (
                <Fade delay={DELAY + 1}>
                  <Button
                    type='submit'
                    isDisabled={isCreating}
                    isLoading={isCreating}
                    // loadingText={'Submitting...'}
                    className={s.button}
                  >
                    Deposit
                  </Button>
                </Fade>
              )
            }
            {
              showQrCode && (
                <Flex gap={6} mt={4} w={'100%'} justifyContent={'space-between'}>
                  <Flex direction={'column'} alignItems={'center'} gap={3}>
                    <QRCode
                      size={130}
                      value={saleWalletInfo?.btc_address || ''}
                      logoImage={'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png'}
                    />
                    <Text className={s.depositValue}>{formatCurrency(saleWalletInfo?.btc_balance, 4, 4)} BTC</Text>
                  </Flex>
                  <Flex direction={'column'} alignItems={'center'} gap={3}>
                    <QRCode
                      size={130}
                      value={saleWalletInfo?.eth_address || ''}
                      logoImage={'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}
                    />
                    <Text className={s.depositValue}>{formatCurrency(saleWalletInfo?.eth_balance, 4, 4)} ETH</Text>
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

export default PrivateSaleForm;
