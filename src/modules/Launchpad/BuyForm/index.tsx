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
import { getBlockReward, getPublicSaleLeaderBoards, getPublicSaleSummary } from '@/services/public-sale';
import { IPublicSaleDepositInfo } from '@/interfaces/vc';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import DepositModal from '@/modules/PublicSale/depositModal';
import ContributorsModal from '@/modules/PublicSale/contributorModal';
import { MIN_DECIMAL } from '@/constants/constants';
import cx from 'classnames';
import AuthenStorage from '@/utils/storage/authen.storage';
import NumberScale from '@/components/NumberScale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import IcHelp from '@/components/InfoTooltip/IcHelp';
import UserLoggedAvatar from '@/modules/PublicSale/BuyForm/UserLoggedAvatar';
import { useDispatch } from 'react-redux';
import { checkIsEndPublicSale } from '@/modules/Whitelist/utils';
import BigNumber from 'bignumber.js';
import { clearPublicSaleLeaderBoard } from '@/stores/states/user/reducer';
import { GuestCodeHere } from '@/modules/PublicSale/depositModal/deposit.guest.code';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import ContributorInfo from '../components/contributorInfo';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';
import AuthForBuy from '@/modules/Launchpad/AuthForBuy';
import AuthForBuyV2 from '@/modules/Launchpad/AuthForBuyV2';

interface FormValues {
  tokenAmount: string;
}

const LaunchpadBuyForm = () => {
  const [blockReward, setBlockReward] = React.useState(undefined)

  const [isCreating, setIsCreating] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const {
    launchpadDetail,
    launchpadSummary,
    userContributeInfo,
    setCurrentLaunchpadSummary,
    setCurrentUserContributeInfo
  } = useLaunchpadContext();
  const [contributeInfo, setContributeInfo] = useState<IPublicSaleDepositInfo>({
    ...(launchpadSummary as IPublicSaleDepositInfo),
  });
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(launchpadDetail?.end_date, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const [showContributorModal, setShowContributorModal] = useState(false);
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const remainHour = useMemo(() => {
    return dayjs(launchpadDetail?.end_date).diff(dayjs(), 'hour');
  }, [launchpadDetail?.end_date]);

  const isEnded = React.useMemo(() => checkIsEndPublicSale(launchpadDetail?.end_date), [launchpadDetail?.end_date]);

  const timeIntervalSummary = useRef<any>(undefined);
  const { needReload } = useAppSelector(commonSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    getContributeInfo();
    getBlockRewardInfo();

    timeIntervalSummary.current = setInterval(() => {
      getContributeInfo();
      getBlockRewardInfo();
    }, 10000);

    if (token) {
      getUserContributeInfo();
    }
    return () => {
      clearInterval(timeIntervalSummary.current);
    };
  }, [token, needReload]);

  const currentFDV = useMemo(() => {
    if(launchpadSummary?.total_usdt_value_not_boost) {
      return new BigNumber(launchpadSummary?.total_usdt_value_not_boost).multipliedBy(100).dividedBy(15).toString();
    }

    return "0";
  }, [launchpadSummary?.total_usdt_value_not_boost]);

  const getBlockRewardInfo = async () => {
    const data = await getBlockReward();
    setBlockReward(data)
  }

  const getContributeInfo = async () => {
    const res = await getPublicSaleSummary();
    setContributeInfo(res);
    setCurrentLaunchpadSummary(res);
  };

  const getUserContributeInfo = async () => {
    const { data } = await getPublicSaleLeaderBoards({
      page: 1,
      limit: 0,
    });

    if (data[0]?.need_active) {
      setCurrentUserContributeInfo(data[0]);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setShowQrCode(true);
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { tokenAmount: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const ContributorBlock = forwardRef((props: any, ref: any) => {
    const { className, ...rest } = props;
    return (
      <Box onMouseEnter={onOpen}>
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
            fontSize={"14px"}
            lineHeight={"14px"}
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
            {Boolean(userContributeInfo?.view_boost) && !!Number(userContributeInfo?.view_boost || 0) && (
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
                  color={'#000'}
                  className={s.boost}
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
      </Box>
    );
  });

  const firstFieldRef = React.useRef(null);
  const {
    onClose: onClose,
    onOpen: onOpen,
    isOpen: isOpen,
  } = useDisclosure();
  const { isOpen: isOpenFDV, onToggle: onToggleFDV, onClose: onCloseFDV, onOpen: onOpenFDV } = useDisclosure();


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
                {launchpadDetail?.token?.symbol} Public Sale
              </Text>
              <Flex alignItems="start" gap="12px">
                <Text className={s.fundValue}>
                  <NumberScale
                    label={'$'}
                    couters={Number(contributeInfo?.total_usdt_value_not_boost)}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                    defaultFrom={launchpadSummary?.total_usdt_value_not_boost}
                  />
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box mt={'24px'} />
          <div className={s.grid}>
            <div className={s.grid_item}>
              <div
                className={cx(s.backer, {[s.backer__ended]: isEnded})}
                onClick={() => {
                  dispatch(clearPublicSaleLeaderBoard())
                  if (!isEnded) return;
                  setShowContributorModal(true)
                }}
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
                className={cx(s.tValue, remainHour < 2 ? s.blink_me : '')}
                expiredTime={dayjs
                  .utc(launchpadDetail?.end_date, 'YYYY-MM-DD')
                  .toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
                hideZeroHour={true}
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
            {/*<div className={s.grid_item}>
              <Tooltip
                minW="220px"
                bg="#007659"
                isOpen={isOpenFDV}
                // boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                borderRadius="4px"
                padding="16px"
                label={
                  <Flex direction="column" color="white" gap={"4px"}>
                    <Text>Fully Diluted Valuation (FDV) is the market cap if the maximum supply is in circulation.</Text>
                    <Text>The BVM public sale allocation is 15% (15M). The BVM max supply is 100M.</Text>
                    <Text>Price = Total Public Sale / 15,000,000</Text>
                    <Text>FDV = Price x 100,000,000</Text>
                  </Flex>
                }
              >
                <Text
                  fontSize={20}
                  lineHeight={1}
                  fontWeight={400}
                  className={s.tLabel}
                  color={'rgba(0,0,0,0.7)'}
                  onClick={onToggleFDV}
                  onMouseEnter={onOpenFDV}
                  onMouseLeave={onCloseFDV}
                >
                  <Flex alignItems="center">
                    Current FDV
                    <Flex ml="4px" w={"14px"} h={"14px"} mt="-2px">
                      <svg width="14px" height="14px" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 0.333984C2.98667 0.333984 0 3.32065 0 7.00065C0 10.6807 2.98667 13.6673 6.66667 13.6673C10.3467 13.6673 13.3333 10.6807 13.3333 7.00065C13.3333 3.32065 10.3467 0.333984 6.66667 0.333984ZM7.33333 10.334H6V6.33398H7.33333V10.334ZM7.33333 5.00065H6V3.66732H7.33333V5.00065Z" fill="#007659"/>
                      </svg>
                    </Flex>
                  </Flex>
                </Text>
              </Tooltip>

              <Text
                className={s.tValue}
                fontSize={20}
                lineHeight={1}
                fontWeight={400}
                color={'#000'}
              >
                ${formatCurrency(currentFDV, 0, 0, 'BTC', false)}
              </Text>

            </div>*/}
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
                        <ContributorInfo launchpadDetail={launchpadDetail as ILaunchpadDetail} data={userContributeInfo} blockReward={blockReward} />
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
          {isEnded ? (
            <Flex gap="12px" direction={'column'} width={'100%'}>
              <AuthForBuyV2 renderWithoutLogin={(onClick: any) => (
                <Button
                  type="button"
                  onClick={onClick}
                  isDisabled={isCreating}
                  isLoading={isCreating}
                  className={s.button}
                >
                  Connect with BVM to view your allocation
                </Button>
              )}>
              </AuthForBuyV2>
              <Box className={s.endBanner}>
                <p className={s.endBanner_endMessage}>
                  Thank you for your contribution! You will be able to claim your $BVM allocation at TGE in March 2024. Stay tuned for more updates. Together we build the future of Bitcoin!                </p>
              </Box>
            </Flex>
          ) : (
            <Flex gap={6} direction={'column'} width={'100%'}>
              <AuthForBuy launchpadDetail={launchpadDetail}/>
            </Flex>
          )}
          {parseFloat(userContributeInfo?.usdt_value || '0') > 0 && (
            <GuestCodeHere theme="light" />
          )}
          <ContributorsModal
            isShow={showContributorModal}
            onHide={() => setShowContributorModal(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default LaunchpadBuyForm;
