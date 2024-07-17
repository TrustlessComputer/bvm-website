import React, { useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import { IUserReferralInfo } from '@/interfaces/referral';
import { requestReload } from '@/stores/states/common/reducer';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { Box, Button } from '@chakra-ui/react';
import { getErrorMessage } from '@/utils/errorV2';
import { useDispatch } from 'react-redux';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { showError } from '@/components/toast';
import { REFERRAL_REWARD_ADMIN_ADDRESS } from '@/contract/referrals/configs';
import CReferral from 'src/contract/referrals';
import CReferralAPI from 'src/services/api/referrals';
import cs from 'classnames';
import ButtonConnected from '@/components/ButtonConnected/v2';
import InfoTooltip from '@/components/InfoTooltip';
import HorizontalItem from '@/components/HorizontalItem';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

interface EnterRefferalProps {
  userRefInfo?: IUserReferralInfo;
}

const EnterRefferal = (props: EnterRefferalProps) => {
  const { userRefInfo } = props;
  const dispatch = useDispatch();

  const { accountInforL2Service } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const addressL2 = accountInforL2Service?.tcAddress;
  const cRewardClaim = useRef(new CReferral()).current;
  const userApi = useRef(new CReferralAPI()).current;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const unClaimReward = useMemo(() => {
    return Number(userRefInfo?.referral_reward_total || '0') - Number(userRefInfo?.referral_reward_claimed || '0');
  }, [userRefInfo]);

  const onSubmitClaim = async () => {
    if (!addressL2) return;
    try {
      setIsSubmitting(true);
      const origin = window.location.origin;
      const refUrl = origin + `?r=${userRefInfo?.referral_code}`;
      const content = `I just received $${formatCurrency(unClaimReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)} after trading on @RuneChain_L2\n\nTrade Unlimited Bitcoin Permissionlessly Now\n\n${refUrl}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        "_blank"
      );

      const claimInfo = await userApi.getSignatureForClaim();
      await cRewardClaim.claimReferralTradingReward({
        signatures: claimInfo,
        claim_address: REFERRAL_REWARD_ADMIN_ADDRESS,
      });
      dispatch(requestReload());
    } catch (error) {
      const { message } = getErrorMessage(error);
      showError({message: message});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.grid}>
          {/*<div className={s.item}>
            <p className={s.item_title}>Your Trading Volume</p>
            <p className={s.item_desc}>
              {formatCurrency(userRefInfo?.trading_volume || '0', MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              USD
            </p>
          </div>*/}
          <div className={s.item}>
            <p className={s.item_title}>Claimed Rebates</p>
            <p className={s.item_desc}>
              {formatCurrency(userRefInfo?.referral_reward_claimed || '0', MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              BVM
            </p>
          </div>
          <div className={s.item}>
            <p className={s.item_title}>Unclaimed Rebates</p>
            <p className={s.item_desc}>
              {formatCurrency(unClaimReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              BVM
            </p>
          </div>
        </div>
        {Number(unClaimReward) > 0 && (
          <ButtonConnected className={cs(s.button)} title={"Connect account"}>
            <Button
              type="button"
              onClick={onSubmitClaim}
              isLoading={isSubmitting}
              loadingText={'Submitting...'}
              className={cs(s.button)}
            >
              <p className={s.button_text}>
                Claim
              </p>
            </Button>
          </ButtonConnected>
        )}
      </div>
    </div>
  );
};

export default EnterRefferal;
