import {
  Box,
  Button,
  Flex,
  FocusLock,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import {
  getPublicSaleLeaderBoards,
  getPublicSaleSummary,
  postPublicsaleWalletInfoManualCheck,
} from '@/services/public-sale';
import { defaultSummary, IPublicSaleDepositInfo, VCInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import DepositModal from '@/modules/PublicSale/depositModal';
import ContributorsModal from '@/modules/PublicSale/contributorModal';
import AuthForBuy from '../AuthForBuy';
import { MIN_DECIMAL } from '@/constants/constants';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import ContributorInfo from '@/modules/PublicSale/components/contributorInfo';
import cx from 'classnames';
import AuthenStorage from '@/utils/storage/authen.storage';
import { PUBLIC_SALE_END } from '@/modules/Whitelist';
import NumberScale from '@/components/NumberScale';
import { GuestCodeHere } from '../depositModal/deposit.guest.code';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import IcHelp from '@/components/InfoTooltip/IcHelp';
import AuthForBuyV2 from '@/modules/PublicSale/AuthForBuyV2';
import UserLoggedAvatar from '@/modules/PublicSale/BuyForm/UserLoggedAvatar';
import { useDispatch } from 'react-redux';
import { setPublicSaleSummary, setUserContributeInfo } from '@/stores/states/common/reducer';

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
  const cachedTotalUSD =
    window.localStorage.getItem('LAST_TOTAL_USDT_NON_BOOST') || '0';

  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const publicSaleSummary = useAppSelector(commonSelector).publicSaleSummary as IPublicSaleDepositInfo;
  const [contributeInfo, setContributeInfo] = useState<IPublicSaleDepositInfo>({
    ...publicSaleSummary,
    total_usdt_value_not_boost: cachedTotalUSD,
  });
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const [showContributorModal, setShowContributorModal] = useState(false);
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const remainDay = useMemo(() => {
    return dayjs(PUBLIC_SALE_END).diff(dayjs(), 'day');
  }, []);

  const timeIntervalSummary = useRef<any>(undefined);
  const { needReload, userContributeInfo } = useAppSelector(commonSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getContributeInfo();

    timeIntervalSummary.current = setInterval(() => {
      getContributeInfo();
    }, 10000);

    if (token) {
      getUserContributeInfo();
    }
    return () => {
      clearInterval(timeIntervalSummary.current);
    };
  }, [token, needReload]);

  const getContributeInfo = async () => {
    const res = await getPublicSaleSummary();
    window.localStorage.setItem(
      'LAST_TOTAL_USDT_NON_BOOST',
      res.total_usdt_value_not_boost || '0',
    );
    setContributeInfo(res);
    dispatch(setPublicSaleSummary(res));
  };

  const getUserContributeInfo = async () => {
    const { data } = await getPublicSaleLeaderBoards({
      page: 1,
      limit: 0,
    });

    if (data[0]?.need_active) {
      dispatch(setUserContributeInfo(data[0]));
    }
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
      <div>
        <div
          className={s.tValue}
          gap={'5px'}
          alignItems={'center'}
          ref={ref}
          {...rest}
          cursor={token ? 'pointer' : 'auto'}
        >
          <Flex
            className={s.tLabel}
            fontSize={20}
            lineHeight={1}
            fontWeight={400}
            color="rgba(0,0,0,0.7)"
            gap={1}
            alignItems="center"
          >
            <UserLoggedAvatar />
            Your contribution
            <AuthForBuyV2
              renderWithoutLogin={(onClick: any) => (
                <Flex bg="#FA4E0E" borderRadius={12} mt="-2px" ml="4px" cursor="pointer" onClick={onClick}>
                  <IcHelp />
                </Flex>
              )}>
            </AuthForBuyV2>

            {/*<LoginTooltip onClose={() => {*/}

            {/*}}/>*/}
          </Flex>
          <Flex gap={1} alignItems={"center"}>
            <Text fontSize={20} lineHeight={1} fontWeight={400} color={'#000'}>
              {token
                ? `$${formatCurrency(
                    userContributeInfo?.usdt_value,
                    MIN_DECIMAL,
                    MIN_DECIMAL,
                    'BTC',
                    true,
                  )}`
                : '$0'}
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
            {Boolean(userContributeInfo?.view_boost) && (
              <Flex
                gap={'2px'}
                alignItems={'center'}
                bg={
                  'linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)'
                }
                borderRadius={'100px'}
                p={'4px 8px'}
                width={'fit-content'}
              >
                <Text
                  fontSize={'14'}
                  fontWeight={'500'}
                  className={s.boost}
                  color={'#000'}
                >
                  {token
                    ? `+${formatCurrency(
                        userContributeInfo?.view_boost,
                        0,
                        0,
                        'BTC',
                        true,
                      )}% boost`
                    : '-'}
                </Text>
              </Flex>
            )
            }
          </Flex>
        </div>
      </div>
    );
  });

  const firstFieldRef = React.useRef(null);
  const {
    onClose: onClose,
    onOpen: onOpen,
    isOpen: isOpen,
  } = useDisclosure();


  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div>
          <Flex justify="space-between" gap="24px" flexDir={{ base: "column", lg: 'row' }} position="relative">
            <Flex flex={1} flexDir="column">
              <Text
                fontSize={14}
                lineHeight={1}
                fontWeight={400}
                color={'black'}
                mb={'12px'}
              >
                BVM Public Sale
              </Text>
              <Flex alignItems="start" gap="12px">
                <Text className={s.fundValue}>
                  <NumberScale
                    label={'$'}
                    couters={Number(contributeInfo?.total_usdt_value_not_boost)}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                    defaultFrom={cachedTotalUSD}
                  />
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box mt={'24px'} />
          <div className={s.grid}>
            <div className={s.grid_item}>
              <div
                className={s.backer}
                // onClick={() => setShowContributorModal(true)}
              >
                <Text
                  className={s.tLabel}
                  fontSize={20}
                  lineHeight={1}
                  fontWeight={400}
                  color={'rgba(0,0,0,0.7)'}
                >
                  {'Backers'}
                </Text>
                <Text
                  className={s.tValue}
                  fontSize={20}
                  lineHeight={1}
                  fontWeight={400}
                  color={'#000'}
                  // _hover={{
                  //   color: '#FA4E0E',
                  // }}
                >
                  <NumberScale
                    label={''}
                    couters={Number(contributeInfo?.total_user)}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                  />
                </Text>
              </div>
            </div>
            <div className={s.grid_item}>
              <Text
                fontSize={20}
                lineHeight={1}
                fontWeight={400}
                className={s.tLabel}
                color={'rgba(0,0,0,0.7)'}
              >
                Ends in
                {/*Day{remainDay !== 1 && 's'} to go*/}
              </Text>

              <Countdown
                className={s.tValue}
                expiredTime={dayjs
                  .utc(PUBLIC_SALE_END, 'YYYY-MM-DD')
                  .toString()}
                hideIcon={true}
                isHideSecond={true}
                onRefreshEnd={() => setIsEnd(true)}
              />

              {/*{remainDay === 0 ? (*/}
              {/*  <Countdown*/}
              {/*    className={s.time}*/}
              {/*    expiredTime={dayjs*/}
              {/*      .utc(PUBLIC_SALE_END, 'YYYY-MM-DD')*/}
              {/*      .toString()}*/}
              {/*    hideIcon={true}*/}
              {/*    onRefreshEnd={() => setIsEnd(true)}*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <div>*/}
              {/*    <Text*/}
              {/*      className={s.tValue}*/}
              {/*      fontSize={20}*/}
              {/*      lineHeight={1}*/}
              {/*      fontWeight={400}*/}
              {/*      color={'rgba(0,0,0,1)'}*/}
              {/*    >*/}
              {/*      {' '}*/}
              {/*      {remainDay}{' '}*/}
              {/*    </Text>{' '}*/}

              {/*  </div>*/}
              {/*)}*/}
            </div>
            <div className={s.grid_item}>
              {
                token ? (
                  <Popover
                    isOpen={isOpen}
                    initialFocusRef={firstFieldRef}
                    onOpen={onOpen}
                    onClose={onClose}
                    closeOnBlur={true}
                    placement="top-end"
                  >
                    <PopoverTrigger>
                      <Flex cursor="pointer">
                        <ContributorBlock
                          className={cx(s.contributorBlock, s.blockItem)}
                        />
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent padding="12px 12px 12px 16px" bg="white" border="1px solid rgba(1, 1, 1, 0.3)">
                      <FocusLock persistentFocus={false}>
                        <PopoverArrow opacity={0}/>
                        <PopoverCloseButton color='black' />
                        <Box height="24px"/>
                        <ContributorInfo data={userContributeInfo} />
                      </FocusLock>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <ContributorBlock className={s.blockItem} />
                )
              }
            </div>
          </div>

          <Box mt={'32px'} />
          <Flex gap={6} direction={'column'} width={'100%'}>
            <AuthForBuy>
              <Button
                type="submit"
                isDisabled={isCreating}
                isLoading={isCreating}
                // loadingText={'Submitting...'}
                className={s.button}
              >
                Back our mission
              </Button>
            </AuthForBuy>
          </Flex>
          {parseFloat(userContributeInfo?.usdt_value || '0') > 0 && (
            <GuestCodeHere theme="light" />
          )}

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
