/* eslint-disable import/no-anonymous-default-export */
import common from '@/stores/states/common/reducer';
import modal from '@/stores/states/modal/reducer';
import user from '@/stores/states/user/reducer';
import activities from '@/stores/states/activities/reducer';
import airdrop from '@/stores/states/airdrop/reducer';
import luckyMoney from '@/stores/states/luckyMoney/reducer';
import auth from '@/stores/states/auth/reducer';
import stakingV2 from '@/stores/states/stakingV2/reducer';
import l2Services from '@/stores/states/l2services/reducer';
import launchpad from '@/modules/Launchpad/store/reducer';
import lpEAIPayment from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import referrals from '@/stores/states/referrals/reducer';
import createToken from '@/modules/apps/CreateToken/states/reducer';

export default {
  common,
  modal,
  user,
  activities,
  airdrop,
  luckyMoney,
  auth,
  stakingV2,
  l2Services,
  launchpad,
  lpEAIPayment,
  referrals,
  createToken
};
