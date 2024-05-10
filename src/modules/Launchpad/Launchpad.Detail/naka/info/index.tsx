import {
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { formatCurrency } from '@/utils/format';
import { useDispatch, useSelector } from 'react-redux';
import NumberScale from '@/components/NumberScale';
import Countdown from '@/components/Countdown';
import cs from 'classnames';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { ILaunchpad } from '@/modules/Launchpad/services/launchpad.interfaces';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { requestReload } from '@/stores/states/common/reducer';

const Column = forwardRef((props: IColumnProps, ref: any) => {
  const { value, title, className, ...rest } = props;
  return (
    <Flex
      className={className}
      ref={ref}
      {...rest}
      direction={'column'}
      justifyContent={'flex-start'}
      // bg={'#FAFAFA'}
      // border={'1px solid #CECECE'}
      // borderRadius={'8px'}
      p={'12px 16px'}
    >
      <Text fontSize={'12px'} fontWeight={400} whiteSpace={'nowrap'}>
        {title}
      </Text>
      <Text fontSize={'20px'} fontWeight={500} color={'#00000'}>
        {value}
      </Text>
    </Flex>
  );
});

interface IColumnProps {
  value: any;
  title: any;
  className?: any;
}

const LaunchpadInfo = ({
  launchpadDetail,
}: {
  launchpadDetail: ILaunchpad;
}) => {
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const [launchpadSummary, setLaunchpadSummary] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    getLaunchpadSummaryInfo();
  }, [launchpadDetail?.id]);

  const getLaunchpadSummaryInfo = async () => {
    const res = await launchpadApi.getLaunchpadEternalAiSummary();
    setLaunchpadSummary(res);
  };

  const { oldBlockScout, blockScout } = useSelector(launchpadSelector);

  const endDate = useMemo(() => {
    return launchpadDetail?.status === 'prelaunch'
      ? launchpadDetail?.pre_launch_end_date
      : launchpadDetail?.status === 'ido'
      ? launchpadDetail?.end_ido_date
      : launchpadDetail?.end_date;
  }, [launchpadDetail]);

  const renderContent = useCallback(() => {
    if (launchpadDetail?.id === 1) {
      return (
        <Flex
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          gap={'12px'}
          className={s.content}
        >
          <Column
            title={'TRANSACTIONS'}
            value={
              <NumberScale
                label={''}
                couters={blockScout.total_transactions}
                maximumFractionDigits={0}
                minimumFractionDigits={0}
                defaultFrom={String(oldBlockScout.total_transactions)}
              />
            }
          />
          <Column
            title={'ACTIVE WALLETS'}
            value={
              <NumberScale
                label={''}
                couters={blockScout.address}
                maximumFractionDigits={0}
                minimumFractionDigits={0}
                defaultFrom={String(oldBlockScout.address)}
              />
            }
          />
          <Column
            title={'TVL'}
            value={
              <NumberScale
                label={'$'}
                couters={Number(blockScout.tvl)}
                maximumFractionDigits={0}
                minimumFractionDigits={0}
                defaultFrom={oldBlockScout.tvl}
              />
            }
          />
          <Column
            title={'LAUNCHPAD ALLOCATION'}
            value={formatCurrency(
              launchpadDetail?.launchpad_allocation,
              0,
              0,
              'BTC',
              true,
            )}
          />
          <Column
            className={s.boxFocus}
            title={
              <Flex gap={'8px'}>
                <Text fontSize={'12px'}>LAUNCHPAD FDV</Text>
                <Tooltip
                  minW="300px"
                  bg="#000000"
                  label={
                    <SimpleGrid
                      color={'white'}
                      p={'4px'}
                      columns={2}
                      gridTemplateColumns={'110px 1fr'}
                      whiteSpace={'nowrap'}
                      w={'fit-content'}
                    >
                      <GridItem>Launchpad FDV</GridItem>
                      <GridItem>
                        =&nbsp;&nbsp;Token price * Total Supply
                      </GridItem>
                      <GridItem></GridItem>
                      <GridItem>
                        =&nbsp;&nbsp;0.0004762 * 2,100,000,000
                      </GridItem>
                      <GridItem></GridItem>
                      <GridItem>=&nbsp;&nbsp;1,000,000</GridItem>
                    </SimpleGrid>
                  }
                >
                  {/*<img
                className={s.tooltipIcon}
                src={`${CDN_URL_ICONS}/ic-information-wh.svg`}
              />*/}
                  <Box className={s.tooltipIcon}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9992 15.9992V22.3992M15.9992 11.2555V11.1992M3.19922 15.9992C3.19922 8.92997 8.92997 3.19922 15.9992 3.19922C23.0685 3.19922 28.7992 8.92997 28.7992 15.9992C28.7992 23.0685 23.0685 28.7992 15.9992 28.7992C8.92997 28.7992 3.19922 23.0685 3.19922 15.9992Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Box>
                </Tooltip>
              </Flex>
            }
            value={
              <Text fontSize={'20px'} fontWeight={500}>
                $
                {formatCurrency(
                  launchpadDetail?.project_valuation,
                  0,
                  2,
                  'BTC',
                  true,
                )}
              </Text>
            }
          />
          <Column
            title={'TOKEN AMOUNT PER WINNING TICKET'}
            value={`${formatCurrency(
              launchpadDetail?.token_per_ticket,
              0,
              2,
              'BTC',
              true,
            )}`}
          />
          {/*<Column title={'TOTAL SUPPLY'} value={formatCurrency(launchpadDetail?.total_supply, 0, 0, 'BTC', true)}/>*/}
          {/*<Column title={'BLOCKCHAIN'} value={launchpadDetail?.blockchain}/>*/}
          {/*<Column title={'TOTAL PARTICIPANTS'} value={formatCurrency(launchpadSummary?.total_user, 0, 0, 'BTC', true)}/>*/}
          {/*<Column title={'TOTAL TICKETS'} value={formatCurrency(launchpadDetail?.allocation_ticket, 0, 0, 'BTC', true)}/>*/}
        </Flex>
      );
    } else if (launchpadDetail?.id === 2) {
      return (
        <Flex
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          gap={'12px'}
          className={s.content}
        >
          <Column
            title={'ACTIVE USERS '}
            value={formatCurrency(
              launchpadSummary?.user_count,
              0,
              0,
              'BTC',
              true,
            )}
          />
          <Column
            title={'PUBLISHED AI'}
            value={formatCurrency(
              launchpadSummary?.model_count,
              0,
              0,
              'BTC',
              true,
            )}
          />
          <Column
            title={'AI INTERACTIONS'}
            value={formatCurrency(
              launchpadSummary?.predict_count,
              0,
              0,
              'BTC',
              true,
            )}
          />
          <Column
            title={'IDO STARTS IN'}
            value={
              <Text whiteSpace={'nowrap'} minW={'200px'}>
                <Countdown
                  className={cs(s.countdownTime, s.highLight)}
                  expiredTime={endDate as string}
                  onRefreshEnd={() => dispatch(requestReload())}
                  hideIcon={true}
                  showDay={true}
                />
              </Text>
            }
          />
        </Flex>
      );
    } else {
      return null;
    }
  }, [launchpadDetail?.id, JSON.stringify(launchpadSummary)]);

  return (
    <Flex direction={'column'} gap={'18px'} className={s.container} mt={'16px'}>
      {renderContent()}
    </Flex>
  );
};

export default LaunchpadInfo;
