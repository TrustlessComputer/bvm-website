import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react';
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
import HorizontalItem from '@/components/HorizontalItem';
import ContributorsModal from '@/modules/PublicSale/contributorModal';

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-30 08:00:00';

interface FormValues {
  tokenAmount: string;
}

const DELAY = 2;

interface IColumnProps {
  value: any;
  title: any;
}

const Column = forwardRef((props: IColumnProps, ref: any) => {
  const { value, title, ...rest } = props;
  return (
    <Flex ref={ref} {...rest} direction={'column'} justifyContent={'flex-start'} flex={1}>
      <Text fontSize={'12px'} fontWeight={400}>{title}</Text>
      <Text fontSize={'22px'} fontWeight={500} color={'#FFFFFF'}>{value}</Text>
    </Flex>
  );
});

const PrivateSaleForm = ({ vcInfo }: { vcInfo?: VCInfo }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [saleWalletInfo, setSaleWalletInfo] = useState<PublicSaleWalletInfo>();
  const user = useAppSelector(userSelector);
  const [contributeInfo, setContributeInfo] = useState<IPublicSaleDepositInfo>();
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
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
  };

  const getVentureInfo = async () => {
    const result = await getPublicsaleWalletInfo();
    setSaleWalletInfo(result);
  };

  const handleRecheckDeposit = async () => {
    await postPublicsaleWalletInfoManualCheck();
    toast.success('Recheck deposit amount successfully!');
    getVentureInfo();
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

  const ContributorInfo = () => {
    return (
      <Flex direction={'column'} w={'284px'} gap={4} className={s.contributorInfo}>
        <HorizontalItem className={s.rowData} label={'USER'} value={'clinkzchan'} />
        <HorizontalItem className={s.rowData} label={'RANK'} value={'1,000'} />
        <HorizontalItem className={s.rowData} label={'CONTRIBUTION'} value={'$120,000'} />
        <HorizontalItem className={s.rowData} label={'ALLOCATION'} value={<Text color={'#FF5312'}>15 BVM</Text>} />
        <HorizontalItem className={s.rowData} label={'BOOST'} value={
          <Flex gap={1} alignItems={'center'}>
            <svg width='14' height='20' viewBox='0 0 14 20' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.6663 8.18093H8.21179L9.42391 0.908203L0.333008 11.8173H5.78755L4.57543 19.09L13.6663 8.18093Z'
                fill='url(#paint0_linear_29823_6261)' />
              <defs>
                <linearGradient id='paint0_linear_29823_6261' x1='0.333008' y1='9.99911' x2='13.6663'
                                y2='9.99911' gradientUnits='userSpaceOnUse'>
                  <stop stop-color='#007659' />
                  <stop offset='1' stop-color='#35CCA6' />
                </linearGradient>
              </defs>
            </svg>
            <Text fontSize={'16px'} fontWeight={'500'} className={s.boostLight}>10%</Text>
          </Flex>
        } />
      </Flex>
    )
  }

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.content}>
          <Text className={s.title}><Lines delay={DELAY + .2}>Total Funded</Lines></Text>
          <Text className={s.fundValue}><Lines delay={DELAY + .2}>$9,233,476</Lines></Text>
          <Flex className={s.boxInfo} gap={4} width={'100%'}>
            <Column value={
              <Flex direction={'column'}>
                <Text>{formatCurrency(contributeInfo?.total_user, 0, 0, 'BTC', true)}</Text>
                <Text fontSize={'12px'} fontWeight={'400'} color={'#FA4E0E'} textDecoration={"underline"}>View all</Text>
              </Flex>
            } title={'Contributors'} />
            <Tooltip minW='220px'
                     bg='white'
                     boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
                     borderRadius='4px'
                     padding='16px'
                     hasArrow
                     label={
                       <ContributorInfo />
                     }
            >
              <Column value={
                <Flex direction={'column'}>
                  <Flex gap={1} alignItems={'center'}>
                    <Text>$100,000</Text>
                  </Flex>
                  <Flex gap={1} w={'fit-content'} p={'5px 8px'} alignItems={'center'}
                        bg={'linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)'}>
                    <Text fontSize={'10px'} fontWeight={'400'} color={'#FFFFFF'}>YOU GET</Text>
                    <Text fontSize={'12px'} fontWeight={'600'} className={s.youGet}>$100,000</Text>
                  </Flex>
                </Flex>
              } title={
                <Flex justifyContent={'space-between'}>
                  <Text>Your contribution</Text>
                  <Flex gap={1} alignItems={'center'}>
                    <svg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8.66699 5.18883H5.39426L6.12154 0.825195L0.666992 7.37065H3.93972L3.21245 11.7343L8.66699 5.18883Z'
                        fill='url(#paint0_linear_29800_7703)' />
                      <defs>
                        <linearGradient id='paint0_linear_29800_7703' x1='0.666992' y1='6.27974' x2='8.66699'
                                        y2='6.27974' gradientUnits='userSpaceOnUse'>
                          <stop stop-color='white' />
                          <stop offset='1' stop-color='#35CCA6' />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Text fontSize={'12px'} fontWeight={'500'} color={'rgba(255, 255, 255, 0.7)'}
                          className={s.boost}>20%</Text>
                  </Flex>
                </Flex>
              } />
            </Tooltip>

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
          <ContributorsModal />
        </div>
      </form>
    </div>
  );
};

export default PrivateSaleForm;
