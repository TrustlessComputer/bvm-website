import React from 'react';
import styles from './styles.module.scss';
import { Box, Flex } from '@chakra-ui/react';
import { StakeV2Role } from '@/contract/stakeV2/types';
import cs from 'classnames';
import BigNumberJS from 'bignumber.js';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import { BVM_TOKEN_SYMBOL } from '@/constants/constants';
import { useAppSelector } from '@/stores/hooks';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { getTarget } from '@/modules/staking/utils';
import { AWARD_LIST, IAward, isSmall } from '@/modules/staking/components/TeamPoints/constants';

const ProcessBar = React.memo(() => {
  const stakeUser = useAppSelector(stakeUserSelector);

  const stakingPercent = React.useMemo(() => {
    const stakedAmount = formatAmountToClient(
      stakeUser?.teamPrincipleBalance || 0,
    );

    const { nextTarget, prevTarget, awardLength } = getTarget({
      teamPrincipleBalance: stakeUser?.teamPrincipleBalance,
    });

    const bonusPercent = new BigNumberJS(stakedAmount)
      .minus(prevTarget.neededAmount)
      .div(
        new BigNumberJS(nextTarget.neededAmount).minus(prevTarget.neededAmount),
      )
      .times(100)
      .div(awardLength);

    const startPercent = bonusPercent.plus(prevTarget.index * 20).toNumber();

    if (startPercent >= 100) {
      return '98%';
    }

    return `calc(${startPercent}% - ${isSmall ? '16px' : '10px'})`;
  }, [stakeUser?.teamPrincipleBalance]);

  const renderAward = (item: IAward, index: number) => {
    const isActive =
      new BigNumberJS(item.neededAmount).lte(
        formatAmountToClient(stakeUser?.teamPrincipleBalance || 0),
      ) && !item.start;

    const isLast = index === AWARD_LIST.length - 1;


    return (
      <Box
        className={`${styles.processBar_award} ${isLast && styles.isLast}`}
        key={`award-${item.neededAmount}`}
        left={item.left !== undefined ? `${item.left}` : 'unset'}
        right={item.right !== undefined ? `${item.right}` : 'unset'}
        alignItems={index === AWARD_LIST.length - 1 ? 'end' : 'center'}
      >
        <p
          className={cs(styles.processBar_award_title, {
            [styles.processBar_award_title__active as string]: isActive,
            [styles.processBar_award_title__inActive as string]: !isActive,
            [styles.processBar_award_title__start as string]: !!item.start,
          })}
        >
          {item?.start
            ? item.start.key
            : `+${
                stakeUser?.teamRole === StakeV2Role.captain
                  ? item.captainPoint
                  : item.memberPoint
              }%`}
        </p>
        <div
          className={cs(styles.dot, {
            [styles.dot__active as string]: isActive,
            [styles.dot__inActive as string]: !isActive,
            [styles.dot__start as string]: !!item.start,
          })}
        ></div>
        <Flex className={styles.processBar_award_valueBox}>
          <p className={cs(styles.processBar_award_value, {
            [styles.processBar_award_value__active as string]: isActive,
            [styles.processBar_award_value__inActive as string]: !isActive,
            [styles.processBar_award_value__start as string]: !!item.start,
          })}>
            {item?.start
              ? item.start.value
              : `${formatCurrency(
                  item.neededAmount,
                  0,
                  0,
                  'BTC',
                  false,
                  50000,
                )} ${isSmall ? '' : BVM_TOKEN_SYMBOL}`}
          </p>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <Box />
      <div className={styles.processBar}>
        <Box
          className={styles.processBar_activeBar}
          width={`${stakingPercent}`}
        />
        {AWARD_LIST.map(renderAward)}
      </div>
      <Box />
    </>
  );
});

ProcessBar.displayName = 'ProcessBar';

export default ProcessBar;
