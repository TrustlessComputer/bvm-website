import BigNumberJS from 'bignumber.js';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import { useAppSelector } from '@/stores/hooks';
import { membersSelector, stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import { getTarget } from '@/modules/staking/utils';

const useShareStakeOnX = () => {
  const stakeUser = useAppSelector(stakeUserSelector);
  const { memberCount } = useAppSelector(membersSelector);

  const onShare = () => {
    const { nextTarget } = getTarget({
      teamPrincipleBalance: stakeUser?.teamPrincipleBalance,
    });
    const neededAmount = new BigNumberJS(nextTarget.neededAmount)
      .minus(formatAmountToClient(stakeUser?.principleBalance))
      .toString();

    const content = `🚀 Join our staking crew 🚀\n\nTogether with ${memberCount} others, we're staking ${formatCurrency(
      formatAmountToClient(stakeUser?.teamPrincipleBalance || 0),
      0,
      STAKE_MAX_DECIMAL,
    )} $BVM at ${new BigNumberJS(25)
      .plus(
        new BigNumberJS(
          formatAmountToClient(
            stakeUser?.teamRewardRatio?.memberRewardRatio || 0,
          ),
        ).times(100),
      )
      .toNumber()}% interest.\n\nJust ${formatCurrency(
      neededAmount,
      0,
      3,
    )} more $BVM is needed to hit ${new BigNumberJS(25)
      .plus(nextTarget.memberPoint)
      .toNumber()}% interest.\n\nLet's grow together! Use this code (${stakeUser?.userTeamCode}) to join:\n\nnakachain.xyz/staking\n\n#bvmstaking`;
    return window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  };

  return {
    onShareStakeOnX: onShare,
  };
};

export default useShareStakeOnX;
