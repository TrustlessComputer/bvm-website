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
import Lines from '@/interactive/Lines';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import DepositModal from '@/modules/PublicSale/depositModal';

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-30 08:00:00';

interface FormValues {
  tokenAmount: string;
}

const DELAY = 2;

const Column = ({ value, title }: { value: any, title: any }) => {
  return (
    <Flex direction={'column'} justifyContent={'flex-start'} flex={1}>
      <Text fontSize={'12px'} fontWeight={400}>{title}</Text>
      <Text fontSize={'22px'} fontWeight={500} color={'#FFFFFF'}>{value}</Text>
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
          <Text className={s.title}><Lines delay={DELAY + .2}>Total Funded</Lines></Text>
          <Text className={s.fundValue}><Lines delay={DELAY + .2}>$9,233,476</Lines></Text>
          <Flex className={s.boxInfo} gap={4} mt={'40px'} mb={'40px'} width={'100%'}>
            <Column value={
              <Flex direction={"column"}>
                <Text>{formatCurrency(contributeInfo?.total_user, 0, 0, 'BTC', true)}</Text>
                <Text fontSize={'12px'} fontWeight={"400"} color={'#FA4E0E'}>View more</Text>
              </Flex>
            } title={'Contributors'} />
            <Column value={
              <Flex direction={"column"}>
                <Flex gap={1} alignItems={"center"}>
                  <Text>$100,000</Text>
                </Flex>
                <Flex gap={1} w={"fit-content"} p={"5px 8px"} alignItems={"center"} bg={"linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)"}>
                  <Text fontSize={'10px'} fontWeight={"400"} color={'#FFFFFF'}>YOU GET</Text>
                  <Text fontSize={'12px'} fontWeight={"600"} className={s.youGet}>$100,000</Text>
                </Flex>
              </Flex>
            } title={
              <Flex justifyContent={"space-between"}>
                <Text>Your contribution</Text>
                <Flex gap={1} alignItems={"center"}>
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.66699 5.18883H5.39426L6.12154 0.825195L0.666992 7.37065H3.93972L3.21245 11.7343L8.66699 5.18883Z" fill="url(#paint0_linear_29800_7703)"/>
                    <defs>
                      <linearGradient id="paint0_linear_29800_7703" x1="0.666992" y1="6.27974" x2="8.66699" y2="6.27974" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"/>
                        <stop offset="1" stop-color="#35CCA6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <Text fontSize={'12px'} fontWeight={"500"} color={'rgba(255, 255, 255, 0.7)'} className={s.boost}>20%</Text>
                </Flex>
              </Flex>
            } />
            <Column value={
              <Countdown
                className={s.time}
                expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
              />
            } title={'Ends in'} />
          </Flex>
          <Flex gap={6} direction={'column'} width={'100%'}>
            <Fade delay={DELAY + 1}>
              <Button
                type='submit'
                isDisabled={isCreating}
                isLoading={isCreating}
                // loadingText={'Submitting...'}
                className={s.button}
              >
                {user?.twitter_id ? 'Buy $BVM' : 'Tweet to buy'}
              </Button>
            </Fade>
          </Flex>
          <DepositModal
            isShow={showQrCode}
            onHide={() => setShowQrCode(false)}
            saleWalletInfo={saleWalletInfo}
          />
        </div>
      </form>
    </div>
  );
};

export default PrivateSaleForm;
