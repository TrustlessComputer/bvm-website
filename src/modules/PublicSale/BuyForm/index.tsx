import { Box, Button, Flex, Grid, GridItem, Text, Tooltip } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import {
  getPublicSaleLeaderBoards,
  getPublicSaleSummary,
  postPublicsaleWalletInfoManualCheck,
} from '@/services/public-sale';
import { IPublicSaleDepositInfo, VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import DepositModal from '@/modules/PublicSale/depositModal';
import ContributorsModal from '@/modules/PublicSale/contributorModal';
import AuthForBuy from '../AuthForBuy';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import ContributorInfo from '@/modules/PublicSale/components/contributorInfo';
import cx from 'classnames';
import AuthenStorage from '@/utils/storage/authen.storage';
import { PUBLIC_SALE_END } from '@/modules/Whitelist';

interface FormValues {
  tokenAmount: string;
}

interface IColumnProps {
  value: any;
  title: any;
  className?: any;
}

const Column = forwardRef((props: IColumnProps, ref: any) => {
  const { value, title, className, ...rest } = props;
  return (
    <Flex
      className={className}
      ref={ref}
      {...rest}
      direction={'column'}
      justifyContent={'flex-start'}
      flex={1}
      gap={1}
    >
      <Text fontSize={'14px'} fontWeight={400}>
        {title}
      </Text>
      <Text fontSize={'24px'} fontWeight={400} color={'#FFFFFF'}>
        {value}
      </Text>
    </Flex>
  );
});

const PrivateSaleForm = ({ vcInfo }: { vcInfo?: VCInfo }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [contributeInfo, setContributeInfo] =
    useState<IPublicSaleDepositInfo>();
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [userContributeInfo, setUserContributeInfo] =
    useState<ILeaderBoardPoint>();
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const remainDay = useMemo(() => {
    return dayjs(PUBLIC_SALE_END).diff(dayjs(), 'day', );
  }, []);

  useEffect(() => {
    getContributeInfo();

    if (token) {
      getUserContributeInfo();
    }
  }, [token]);

  const getContributeInfo = async () => {
    const res = await getPublicSaleSummary();
    setContributeInfo(res);
  };

  const getUserContributeInfo = async () => {
    const { data } = await getPublicSaleLeaderBoards({
      page: 1,
      limit: 0,
    });

    setUserContributeInfo(data[0]);
  };

  const handleRecheckDeposit = async () => {
    await postPublicsaleWalletInfoManualCheck();
    toast.success('Recheck deposit amount successfully!');
  };

  const onSubmit = async (values: FormValues) => {
    setShowQrCode(true);
    // try {
    //   setIsCreating(true);
    //   const result = await postPublicsaleWalletInfo();
    //   setSaleWalletInfo(result);
    //   setShowQrCode(true);
    // } catch (error) {
    //   toast.error('Can not verify the post.');
    // } finally {
    //   setIsCreating(false);
    // }
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

  const ContributorBlock = forwardRef((props: any, ref: any) => {
    const { className, ...rest } = props;
    return (
      <Flex gap={'5px'} alignItems={'center'}>

        <Text fontSize={20} lineHeight={1} fontWeight={400} color={'#000'}>
          {token
            ? `$${formatCurrency(
              userContributeInfo?.usdt_value,
              MIN_DECIMAL,
              MIN_DECIMAL,
              'BTC',
              true,
            )}`
            : '-'}
        </Text>
        {/*<Text color={'rgba(255, 255, 255, 0.7)'} fontSize={'12px'} fontWeight={'500'}>*/}
        {/*  {token*/}
        {/*    ? `(${formatCurrency(*/}
        {/*      userContributeInfo?.bvm_balance_not_boost,*/}
        {/*      MIN_DECIMAL,*/}
        {/*      MAX_DECIMAL,*/}
        {/*      'BTC',*/}
        {/*      false,*/}
        {/*    )} BVM)`*/}
        {/*    : '-'}*/}
        {/*</Text>*/}

        <Text fontSize={20} lineHeight={1} fontWeight={400} color={'rgba(0,0,0,0.7)'}>
          your contribution
        </Text>
        {/*<Text fontSize={'12px'} fontWeight={'500'} color={'#FFFFFF'}>*/}
        {/*  GET*/}
        {/*</Text>*/}
        {/*<Text fontSize={'12px'} fontWeight={'500'} className={s.youGet}>*/}
        {/*  {token*/}
        {/*    ? formatCurrency(*/}
        {/*      userContributeInfo?.bvm_balance,*/}
        {/*      MIN_DECIMAL,*/}
        {/*      MAX_DECIMAL,*/}
        {/*    )*/}
        {/*    : '-'}{' '}*/}
        {/*  BVM*/}
        {/*</Text>*/}
        <Flex
          gap={1}
          alignItems={'center'}
          bg={'linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)'}
          borderRadius={'100px'}
          p={'2px 6px'}
        >
          <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M13.3334 7.04474H8.96978L9.93947 1.22656L2.66675 9.95383H7.03038L6.06069 15.772L13.3334 7.04474Z'
                  fill='url(#paint0_linear_30263_14863)' />
            <defs>
              <linearGradient id='paint0_linear_30263_14863' x1='2.66675' y1='8.49929' x2='13.3334' y2='8.49929'
                              gradientUnits='userSpaceOnUse'>
                <stop stop-color='#007659' />
                <stop offset='1' stop-color='#35CCA6' />
              </linearGradient>
            </defs>
          </svg>

          <Text
            fontSize={'14'}
            fontWeight={'500'}
            className={s.boost}
            color={'#000'}
          >
            {token
              ? `${formatCurrency(
                userContributeInfo?.view_boost,
                MIN_DECIMAL,
                MIN_DECIMAL,
                'BTC',
                true,
              )}%`
              : '-'}
          </Text>
        </Flex>
      </Flex>
    );
  });

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.content}>
          <Text className={s.fundValue} fontSize={20} lineHeight={1} fontWeight={400} color={'#000'}>
            $
            {formatCurrency(
              contributeInfo?.total_usdt_value,
              0,
              0,
              'BTC',
              true,
            )}
          </Text>
          <Box mt={'40px'} />

          <div>

            <Flex gap={'6px'} onClick={() => setShowContributorModal(true)}>
              <Text fontSize={20} lineHeight={1} fontWeight={400} color={'#000'}>
                {formatCurrency(
                  contributeInfo?.total_user,
                  0,
                  0,
                  'BTC',
                  true,
                )}

              </Text>
              <Text fontSize={20} lineHeight={1} fontWeight={400} color={'rgba(0,0,0,0.7)'}>
                {' backers'}
              </Text>
            </Flex>
          </div>

          <Box mt={'24px'} />
          <Flex gap={6} direction={'column'} width={'100%'}>
            {
              remainDay === 0 ?  (
                <Countdown
                  className={s.time}
                  expiredTime={dayjs
                    .utc(PUBLIC_SALE_END, 'YYYY-MM-DD')
                    .toString()}
                  hideIcon={true}
                  onRefreshEnd={() => setIsEnd(true)}
                />
              ) : (
                <Flex className={s.time}>
                  <Text>{remainDay} day{remainDay !== 1 && 's'} to go</Text>
                </Flex>
              )
            }
          </Flex>
          <Box mt={'24px'} />
          {token ? (
            <Tooltip
              minW='220px'
              bg='white'
              boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
              borderRadius='4px'
              padding='16px'
              hasArrow
              label={<ContributorInfo data={userContributeInfo} />}
            >
              <ContributorBlock
                className={cx(s.contributorBlock, s.blockItem)}
              />
            </Tooltip>
          ) : (
            <ContributorBlock className={s.blockItem} />
          )}
          <Box mt={'40px'} />
          <Flex gap={6} direction={'column'} width={'100%'}>
            <AuthForBuy>
              <Button
                type='submit'
                isDisabled={isCreating}
                isLoading={isCreating}
                // loadingText={'Submitting...'}
                className={s.button}
              >
                Buy $BVM
              </Button>
            </AuthForBuy>
          </Flex>
          <DepositModal
            isShow={showQrCode}
            onHide={() => setShowQrCode(false)}
          />
          <ContributorsModal
            isShow={showContributorModal}
            onHide={() => setShowContributorModal(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default PrivateSaleForm;
