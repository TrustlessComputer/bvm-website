import { Button, Flex, Text } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import {
  getPublicSaleSummary,
  getPublicsaleWalletInfo,
  postPublicsaleWalletInfo,
  postPublicsaleWalletInfoManualCheck,
} from '@/services/public-sale';
import { IPublicSaleDepositInfo, PublicSaleWalletInfo, VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import { QRCode } from 'react-qrcode-logo';
import Lines from '@/interactive/Lines';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-30 08:00:00';

interface FormValues {
  tokenAmount: string;
}

const DELAY = 2;

const Column = ({ value, title }: { value: any, title: string }) => {
  return (
    <Flex direction={'column'} justifyContent={'center'} flex={1}>
      <Text fontSize={'14px'} fontWeight={400}>{title}</Text>
      <Text fontSize={'24px'} fontWeight={500}>{value}</Text>
    </Flex>
  );
};

const PrivateSaleForm = ({ vcInfo }: { vcInfo?: VCInfo }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [saleWalletInfo, setSaleWalletInfo] = useState<PublicSaleWalletInfo>();
  const user = useAppSelector(userSelector);
  const [contributeInfo, setContributeInfo] = useState<IPublicSaleDepositInfo>();
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format())
  );

  console.log('contributeInfo', contributeInfo);

  useEffect(() => {
    getContributeInfo();

    if (user?.twitter_id) {
      getVentureInfo();
    }
  }, [user?.twitter_id]);

  const getContributeInfo = async () => {
    const res = await getPublicSaleSummary();
    setContributeInfo(res);
  }

  const getVentureInfo = async () => {
    const result = await getPublicsaleWalletInfo();
    setSaleWalletInfo(result);
    if(result) {
      setShowQrCode(true);
    }
  };

  const handleRecheckDeposit = async () => {
    await postPublicsaleWalletInfoManualCheck();
    toast.success('Recheck deposit amount successfully!');
    getVentureInfo();
  }

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
          <Text className={s.title}><Lines delay={DELAY + .2}>TOTAL FUNDED</Lines></Text>
          <Text className={s.fundValue}><Lines delay={DELAY + .2}>$9,233,476</Lines></Text>
          <Flex className={s.boxInfo} gap={4} mt={'40px'} mb={'40px'} width={'100%'}>
            <Column value={formatCurrency(contributeInfo?.total_user, 0, 0, 'BTC', true)} title={'CONTRIBUTORS'} />
            <Column value={
              <Flex>
                <Text>$100,000</Text>
                <Text>(30%)</Text>
              </Flex>
            } title={'YOUR CONTRIBUTION'} />
            <Column value={
              <Countdown
                className={s.time}
                expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
              />
            } title={'ENDS IN'} />
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
                    Buy $BVM
                  </Button>
                </Fade>
              )
            }
            {
              showQrCode && (
                <Flex width={"100%"} direction={"column"}>
                  <Fade delay={DELAY + 1}>
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
                    <Text
                      cursor={"pointer"}
                      fontSize={"16px"}
                      fontWeight={400}
                      color={"#FFFFFF"}
                      textDecoration={"underline"}
                      onClick={handleRecheckDeposit}
                      mt={2}
                      textAlign={"center"}
                    >
                      Recheck deposit amount
                    </Text>
                  </Fade>
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
