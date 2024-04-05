import { Box, Button, Flex, Tooltip } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React, { useContext } from 'react';
import BigNumberJS from 'bignumber.js';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import SvgInset from '@/components/SvgInset';
import useCountdown from '@/hooks/useCountdown';
import moment from 'moment';
import toast from 'react-hot-toast';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
import { INakaConnectContext, NakaConnectContext, STAKING_URL } from '@/Providers/NakaConnectProvider';
import { requestReload } from '@/stores/states/common/reducer';
import { isAmount } from '@utils/number';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { availForRestakeSelector, restakeAmountSelector, stakeUserSelector } from '@/stores/states/stakingV2/selector';
import useNakaAuthen from '@hooks/useRequestNakaAccount';

function convertHoursToWeeksDaysHours(hours: number) {
  if (hours < 0) {
    return 'Invalid input';
  }

  const weeks = Math.floor(hours / 168); // 1 week = 168 hours
  const remainingHours = hours % 168;
  const days = Math.floor(remainingHours / 24); // 1 day = 24 hours
  const remainingDayHours = remainingHours % 24;

  if (weeks === 0) {
    if (days === 0) {
      if (remainingDayHours < 1) {
        const remainingMinutes = Number((remainingDayHours * 60).toFixed(0));
        return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
      }
      return `${remainingDayHours.toFixed(0)} hour${remainingDayHours !== 1 ? 's' : ''}`;
    } else {
      return `${days} day${
        days !== 1 ? 's' : ''
      } and ${remainingDayHours.toFixed(0)} hour${remainingDayHours !== 1 ? 's' : ''}`;
    }
  } else {
    if (days === 0) {
      return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    } else {
      return `${weeks} week${weeks !== 1 ? 's' : ''}, ${days} day${
        days !== 1 ? 's' : ''
      }`;
    }
  }
}

const MiningBox = () => {
  const { buttonText, requestAccount, isAuthen, loading: isLoading } = useNakaAuthen();
  const cStake = new CStakeV2();
  const stakeUser = useAppSelector(stakeUserSelector);
  const restakeAmount = useAppSelector(restakeAmountSelector);
  const availForRestake = useAppSelector(availForRestakeSelector);
  const { getConnector } = useContext(NakaConnectContext) as INakaConnectContext;

  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const onRestake = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const connector = getConnector();
      const calldata = cStake.createRestake();
      await connector.requestSign({
        calldata,
        target: '_blank',
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Restake',
      });
      toast.success('Re-Stake successfully.');
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      dispatch(requestReload());
    }
  };

  const dayLeft = React.useMemo(() => {
    const stakeAmount = formatAmountToClient(stakeUser?.principleBalance || 0);
    const shardMined = formatAmountToClient(stakeUser?.multiplierPoint || 0);
    if (!isAmount(stakeAmount)) return undefined;
    // 50000 (stake) => 365
    // 1 => time
    // const neededGems = new BigNumberJS(stakeAmount).gt(100) ? 1 : 0.1;
    const neededGems = 1;
    const timeHoursBN = new BigNumberJS(neededGems)
      .times(365)
      .div(stakeAmount)
      .times(24);

    // 1 SHARD => timeHours
    // shardMinedPerTimeHours => 
    const shardMinedPer1Shard = Number(shardMined) % 1;
    const timeMinedHours = new BigNumberJS(shardMinedPer1Shard).times(timeHoursBN);
    const timeLeftHours = new BigNumberJS(timeHoursBN).minus(timeMinedHours).toNumber();

    return {
      neededGems,
      times: convertHoursToWeeksDaysHours(
        new BigNumberJS(timeHoursBN).toNumber(),
      ),
      nextMinedTime: moment().add(new BigNumberJS(timeLeftHours).toNumber(), 'hour').toISOString(),
    };

    // if (!isAmount(point)) return '';
    // const nextTargets = GEMS_TARGETS.filter((target) =>
    //   new BigNumberJS(target.amount).gt(point),
    // ) as IGemTarget[];
    // let target: IGemTarget | undefined = undefined;
    // if (nextTargets.length > 0) {
    //   target = nextTargets[0];
    // }
    // if (!target) return undefined;
    // const neededGems = new BigNumberJS(target.amount).minus(point);
    // const neededDays = new BigNumberJS(neededGems)
    //   .minus(point)
    //   .div(stakeAmount)
    //   .times(365)
    //   .toFixed(0, BigNumberJS.ROUND_CEIL);
    // return {
    //   neededGems: neededGems.toFixed(2, BigNumberJS.ROUND_CEIL),
    //   times: convertDaysToWeeksAndDays(neededDays),
    // };
  }, [stakeUser?.principleBalance]);

  const {
    asDays = 0,
    days = 0,
    hours,
    minutes,
    seconds,
    ended,
  } = useCountdown(dayLeft?.nextMinedTime || moment().toLocaleString());

  const nextTimeMinedLeft = React.useMemo(() => {
    if (dayLeft?.nextMinedTime) {
      if (ended) {
        return '';
      }
      const arrTime = [`${seconds}s`, `${minutes}m`];
      if (days !== null && days !== 0) {
        arrTime.push(`${hours}h`);
        arrTime.push(`${(Number(asDays) > 30 ? (asDays - Number(days)) : days).toFixed(0)}d`);
      } else if (hours !== '00') {
        arrTime.push(`${hours}h`);
      }

      return `${arrTime.reverse().join(' : ')}`;
    }
    return '-- : -- : --';
  }, [dayLeft, ended, days, hours, minutes, seconds]);

  const isAvailRestake = !!availForRestake.length;

  const miningTextHeight = document.getElementById('mining-text')?.offsetHeight;

  return (
    <Flex flexDirection='column' gap='24px'>
      <Flex flexDirection='column' gap='12px'>
        <p className={styles.headerText}>SHARD MINING</p>
        <p className={styles.headerDesc}>
          The more you stake, the longer you hold, the more SHARD you’ll mine. SHARD is the governance token of the BVM
          ecosystem. <a target='_blank' href='https://bvm.network/shard'>{`Learn more `}&#8594;</a>
        </p>
      </Flex>
      <Box className={styles.container}>
        <Flex className={styles.mining}
              style={{ backgroundImage: `url(/icons/staking/${isAvailRestake ? 'bg_mining' : 'bg-mining'}.png)` }}>
          <div className={styles.tag}>SHARD Mining</div>
          <Flex flexDirection="column">
            {!!dayLeft && (
              <p id='mining-text' className={styles.mining_text}>
                Your mining rate is <span>{dayLeft.neededGems} SHARD</span> every {dayLeft.times}. The
                next <span>SHARD</span> will be mined in <span>{nextTimeMinedLeft}</span>.
              </p>
            )}
            <Button
              padding='14px 48p !important'
              backgroundColor='#10C800'
              fontSize='16px'
              fontWeight='700'
              mt='16px'
              height='50px'
              width={isAvailRestake ? '100%' : 'fit-content'}
              isDisabled={loading}
              isLoading={isLoading}
              onClick={() => {
                if (isAuthen) {
                  return window.open(STAKING_URL, '_blank');
                }
                return requestAccount();
              }}
            >
              Stake more BVM to mine more SHARD
            </Button>
          </Flex>
        </Flex>

        {isAvailRestake && (<Flex className={styles.restakeBox}>
          <p className={styles.mining_text} style={{ height: miningTextHeight }}>
            <span>{formatCurrency(new BigNumberJS(restakeAmount)
              .div(formatAmountToClient(stakeUser?.principleBalance || 0)).toString(), 0, 3, 'BTC', false, 1000)} SHARD </span>
            are being burnt as you unstake <span>{formatCurrency(restakeAmount, 0, 3, 'BTC', false, 1000)} BVM</span>.
          </p>
          {isAvailRestake && (
            <Tooltip
              label={`If you are waiting for the 21-day unbonding period to complete, click "Re-stake" to continue your stake without forfeiting any benefits.`}
              minWidth='200px'
              padding='8px'
              backgroundColor='white'
              borderRadius='8px'
            >
              <Button
                backgroundColor='#10C800'
                borderRadius='100px'
                color='#ffffff'
                fontSize='16px'
                fontWeight='700'
                padding='12px 48p !important'
                mt='16px'
                height='50px'
                onClick={onRestake}
                isLoading={loading}
                isDisabled={loading}
                justifyContent='center'
                alignItems='center'
                gap='5px'
              >
                Restake
                <SvgInset svgUrl={'/icons/staking/info-circle.svg'} />
              </Button>
            </Tooltip>
          )}
          <div className={styles.tagBurn}>SHARD Burning</div>
        </Flex>)}
      </Box>
    </Flex>
  );
};

export default MiningBox;
