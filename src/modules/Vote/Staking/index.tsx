import NumberScale from '@/components/NumberScale';
import { CDN_URL_ICONS } from '@/config';
import { MIN_DECIMAL, MULTIPLE_POINT_SYMBOL } from '@/constants/constants';
import { STAKING_URL } from '@/constants/route-path';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import useFetchStakingData from '@/modules/staking/hooks/useFetchStakingData';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import {
  stakeUserSelector,
  isFetchedStakeUserSelector,
} from '@/stores/states/stakingV2/selector';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import { isAmount } from '@/utils/number';
import sleep from '@/utils/sleep';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styles from './styles.module.scss';

const LOGO_SIZE = 28;
const MAX_DECIMAL = 3;

const StakingVote = () => {
  useFetchStakingData();

  const router = useRouter();
  const stakeUser = useAppSelector(stakeUserSelector);
  const dispatch = useAppDispatch();
  const { getConnector } = useContext(NakaConnectContext);

  const address = useAppSelector(nakaAddressSelector);
  const isFetched = useAppSelector(isFetchedStakeUserSelector) || !address;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [bonusReward, setBonusReward] = React.useState<{
    newBonus: number;
    cachedBonus: number;
  }>({ newBonus: 0, cachedBonus: 0 });

  React.useEffect(() => {
    setBonusReward(({ newBonus }) => {
      // (1000 * 0.25 * 600) / (24 * 3600 * 365);
      return {
        newBonus: new BigNumberJS(stakeUser?.principleBalance || 0)
          .times(0.25)
          .div(100)
          .times(600)
          .div(new BigNumberJS(24).times(3600).times(365))
          .plus(newBonus)
          .toNumber(),
        cachedBonus: newBonus,
      };
    });
  }, [stakeUser?.teamPrincipleBalance]);

  const counterBonus = React.useMemo(() => {
    const formatAmount = (_amount?: string) => {
      return formatCurrency(
        formatAmountToClient(new BigNumberJS(_amount || '0').toFixed(0)),
        MAX_DECIMAL,
        MAX_DECIMAL,
        'BTC',
        false,
      );
    };
    return {
      to: formatAmount(
        new BigNumberJS(stakeUser?.rewardAmount || 0)
          .plus(bonusReward.newBonus)
          .toString(),
      ),
      from: formatAmount(
        new BigNumberJS(stakeUser?.rewardAmount || 0)
          .plus(bonusReward.cachedBonus)
          .toString(),
      ),
    };
  }, [stakeUser?.rewardAmount, stakeUser?.teamPrincipleBalance, bonusReward]);

  const isLoadingReward = !isFetched || isLoading;
  const isDisableReward =
    isLoadingReward ||
    !isAmount(stakeUser?.rewardAmount || 0) ||
    new BigNumberJS(formatAmountToClient(stakeUser?.rewardAmount || 0)).lt(
      0.000001,
    );

  const cStake = new CStakeV2();

  const onClaimReward = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const connector = getConnector();
      const calldata = cStake.createClaimRewardCallData();
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Claim Reward',
        chainType: 'NAKA',
      });
      dispatch(requestReload());
      await sleep(2);
      toast.success('Successfully.');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [cStake]);

  const renderItem = (
    title: string,
    icon: string,
    value: any,
    subElement?: any,
  ) => {
    return (
      <Flex className={styles.item}>
        <Image
          src={icon}
          alt={title}
          // width={'28px'}
          height={'28px'}
          borderRadius="50%"
        />
        <p className={styles.box_amount}>{value}</p>
        <p className={styles.box_desc}>{title}</p>
        {subElement && subElement}
      </Flex>
    );
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Box className={styles.box}>
          <Flex className={styles.item}>
            <Jazzicon
              diameter={LOGO_SIZE}
              seed={jsNumberForAddress(address || '')}
            />
            <p className={styles.box_amount}>{!!address ? 'You' : '-'}</p>
          </Flex>
          {renderItem(
            'Staked',
            `${CDN_URL_ICONS}/ic-bvm.svg`,
            `${formatCurrency(
              formatAmountToClient(stakeUser?.principleBalance || '0'),
              MIN_DECIMAL,
              STAKE_MAX_DECIMAL,
              'BTC',
              false,
              10000,
            )} BVM`,
            <Button
              height="32px"
              fontSize="12px"
              width={{ lg: 'max-content', base: '100px' }}
              color="#000"
              background="#ffffff !important"
              fontWeight="600"
              borderRadius="100px"
              onClick={() => {
                router.push(STAKING_URL);
              }}
            >
              Stake more
            </Button>,
          )}
          {renderItem(
            '',
            '/icons/staking/bvm_shard.svg',
            <Flex
              direction="row"
              alignItems="center"
              gap="4px"
              style={{ color: '#6FFE43' }}
            >
              <NumberScale
                label={'+'}
                couters={new BigNumberJS(
                  Number(counterBonus.to).toFixed(3),
                ).toNumber()}
                maximumFractionDigits={1}
                minimumFractionDigits={1}
                defaultFrom={new BigNumberJS(
                  Number(counterBonus.from).toFixed(3),
                ).toString()}
                subLabel={` BVM`}
              />
              ,
              <NumberScale
                label={'+'}
                couters={new BigNumberJS(
                  Number(
                    formatAmountToClient(stakeUser?.shardMining || '0'),
                  ).toFixed(3),
                ).toNumber()}
                maximumFractionDigits={1}
                minimumFractionDigits={1}
                subLabel={` SHARD`}
              />
            </Flex>,
            <>
              {stakeUser?.isStaked && (
                <Button
                  height="32px"
                  fontSize="12px"
                  width={{ lg: 'max-content', base: '100px' }}
                  color="#000"
                  background="#ffffff !important"
                  fontWeight="600"
                  borderRadius="100px"
                  onClick={onClaimReward}
                  isLoading={isLoadingReward}
                  isDisabled={isDisableReward}
                >
                  Claim
                </Button>
              )}
            </>,
          )}
          {renderItem(
            'Mined',
            '/icons/staking/gem-icon.png',
            <p>
              {isAmount(stakeUser?.multiplierPoint)
                ? `${formatCurrency(
                    formatAmountToClient(stakeUser?.shardMined || '0'),
                    0,
                    1,
                    'TC',
                  )}`
                : '0'}{' '}
              {MULTIPLE_POINT_SYMBOL}
            </p>,
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StakingVote;
