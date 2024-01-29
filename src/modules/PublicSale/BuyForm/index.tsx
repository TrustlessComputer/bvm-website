import { Button, Flex, Grid, GridItem, Text, Tooltip } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react';
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

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-30 18:00:00';

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
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [userContributeInfo, setUserContributeInfo] =
    useState<ILeaderBoardPoint>();
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

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
      <Column
        className={className}
        ref={ref}
        {...rest}
        value={
          <Flex direction={'column'}>
            <Flex gap={1} alignItems={'center'}>
              <Text>
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
              <Text color={"rgba(255, 255, 255, 0.7)"} fontSize={"12px"} fontWeight={"500"}>
                {token
                  ? `(${formatCurrency(
                      userContributeInfo?.bvm_balance_not_boost,
                      MIN_DECIMAL,
                      MAX_DECIMAL,
                      'BTC',
                      false,
                    )} BVM)`
                  : '-'}
              </Text>
            </Flex>
            <Flex
              gap={1}
              w={'fit-content'}
              // p={'3px 8px'}
              alignItems={'center'}
              // bg={
              //   'linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)'
              // }
            >
              <Text fontSize={'12px'} fontWeight={'500'} color={'#FFFFFF'}>
                GET
              </Text>
              <Text fontSize={'12px'} fontWeight={'500'} className={s.youGet}>
                {token
                  ? formatCurrency(
                      userContributeInfo?.bvm_balance,
                      MIN_DECIMAL,
                      MAX_DECIMAL,
                    )
                  : '-'}{' '}
                BVM
              </Text>
              <Flex
                gap={1}
                alignItems={'center'}
                bg={"linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)"}
                borderRadius={"100px"}
                p={"2px 6px"}
              >
                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.66601 5.18883H5.39329L6.12056 0.825195L0.666016 7.37065H3.93874L3.21147 11.7343L8.66601 5.18883Z" fill="url(#paint0_linear_30246_12163)"/>
                  <defs>
                    <linearGradient id="paint0_linear_30246_12163" x1="0.666016" y1="6.27974" x2="8.66601" y2="6.27974" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#00F5A0"/>
                      <stop offset="1" stop-color="#00D9F5"/>
                    </linearGradient>
                  </defs>
                </svg>
                <Text
                  fontSize={'12px'}
                  fontWeight={'500'}
                  className={s.boost}
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
          </Flex>
        }
        title={
          <Flex justifyContent={'space-between'}>
            <Text>Your contribution</Text>
          </Flex>
        }
      />
    );
  });

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.content}>
          <Text className={s.title}>Total Funded</Text>
          <Text className={s.fundValue}>
            $
            {formatCurrency(
              contributeInfo?.total_usdt_value,
              0,
              0,
              'BTC',
              true,
            )}
          </Text>
          <Grid className={s.boxInfo} width={'100%'}>
            <GridItem>
              <Flex alignItems={'center'} gap={'16px'} direction={["column", "row"]}>
                <Column
                  className={s.blockItem}
                  value={
                    <Flex direction={'column'}>
                      <Text>
                        {formatCurrency(
                          contributeInfo?.total_user,
                          0,
                          0,
                          'BTC',
                          true,
                        )}
                      </Text>
                      <Text
                        fontSize={'12px'}
                        fontWeight={'400'}
                        color={'#FA4E0E'}
                        textDecoration={'underline'}
                        onClick={() => setShowContributorModal(true)}
                        cursor={'pointer'}
                        lineHeight={"22px"}
                      >
                        View all
                      </Text>
                    </Flex>
                  }
                  title={'Contributors'}
                />
                {token ? (
                  <Tooltip
                    minW="220px"
                    bg="white"
                    boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    borderRadius="4px"
                    padding="16px"
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
              </Flex>
            </GridItem>

            <GridItem>
              <Column
                className={s.blockItem}
                value={
                  <Flex direction={'column'}>
                    <Countdown
                      className={s.time}
                      expiredTime={dayjs
                        .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
                        .toString()}
                      hideIcon={true}
                      onRefreshEnd={() => setIsEnd(true)}
                    />
                    <Text
                      fontSize={'12px'}
                      fontWeight={'400'}
                      color={'rgba(255,255,255, 0.7)'}
                      lineHeight={"22px"}
                    >
                      {dayjs(PUBLIC_SALE_END).format('MMM D, YYYY h:mm A')}
                    </Text>
                  </Flex>

                }
                title={'Ends in'}
              />
            </GridItem>
          </Grid>
          <Flex gap={6} direction={'column'} width={'100%'}>
            <AuthForBuy>
              <Button
                type="submit"
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
