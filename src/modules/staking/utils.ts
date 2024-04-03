import { formatAmountToClient } from '@utils/format';
import { AWARD_LIST, IAward } from '@/modules/staking/components/TeamPoints/constants';
import BigNumberJS from 'bignumber.js';

const getTarget = (params: {
  teamPrincipleBalance: string | undefined;
  list?: IAward[];
}) => {
  const stakedAmount = formatAmountToClient(params?.teamPrincipleBalance || 0);

  const awards = params.list || AWARD_LIST;
  const awardLength = awards.length - 1;
  const lastAward = awards[awardLength] as IAward;

  let nextTarget = awards.find((item) => {
    return new BigNumberJS(item.neededAmount).gte(stakedAmount);
  }) as IAward;

  if (
    !nextTarget &&
    new BigNumberJS(stakedAmount).gte(lastAward.neededAmount)
  ) {
    nextTarget = lastAward;
  }

  let prevTarget = awards.find((item) => {
    return item.index === nextTarget.index - 1;
  }) as IAward;

  if (!prevTarget) {
    prevTarget = awards[0] as any;
  }

  return {
    prevTarget: prevTarget as IAward,
    nextTarget: nextTarget as IAward,
    awardLength,
  };
};

export {
  getTarget
}
