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
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';

interface EnterRefferalProps {
  userRefInfo?: IUserReferralInfo;
}

const EnterRefferal = (props: EnterRefferalProps) => {
  const { userRefInfo } = props;
  const dispatch = useDispatch();

  const wallet = useAuthenticatedWallet();
  const addressL2 = wallet?.address;
  const cRewardClaim = useRef(new CReferral()).current;
  const userApi = useRef(new CReferralAPI()).current;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const claimReward = useMemo(() => {
    return userRefInfo?.rewards?.reduce((result, key) => {
      return new BigNumber(result).plus(key.claimed_usd).toString();
    }, "0");
  }, [userRefInfo?.rewards]);

  const unClaimReward = useMemo(() => {
    return userRefInfo?.rewards?.reduce((result, key) => {
      return new BigNumber(result).plus(key.total_usd).minus(key.claimed_usd).toString();
    }, "0");
  }, [userRefInfo?.rewards]);

  const onSubmitClaim = async () => {
    if (!addressL2) return;
    try {
      setIsSubmitting(true);
      // const claimInfo = await userApi.getInfoClaimReward(addressL2);
      // if (claimInfo && claimInfo.token) {
      //   await cRewardClaim.claimReferral({
      //     ...claimInfo,
      //     claim_address: REWARD_CLAIM_ADDRESS,
      //   });
      //   dispatch(requestReload());
      // }
      const origin = window.location.origin;
      const refUrl = origin + `?ref=${userRefInfo?.referral_code}`;
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
          <div className={s.item}>
            <p className={s.item_title}>Your Trading Volume</p>
            <p className={s.item_desc}>
              {formatCurrency(userRefInfo?.trading_volume || '0', MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              USD
            </p>
          </div>
          <div className={s.item}>
            <Box>
              <InfoTooltip
                placement={"top"}
                showIcon
                label={
                  <Box w="200px">
                    {
                      userRefInfo?.rewards?.map(reward => {
                        return <HorizontalItem
                          color={"black"}
                          label={reward.symbol}
                          value={formatCurrency(reward.claimed, MIN_DECIMAL, MAX_DECIMAL, 'BTC', true)}
                        />;
                      })
                    }
                  </Box>
                }
              >
                <p className={s.item_title}>Claimed Rebates</p>
              </InfoTooltip>
            </Box>
            <p className={s.item_desc}>
              {formatCurrency(claimReward || '0', MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              USD
            </p>
          </div>
          <div className={s.item}>
            <Box>
              <InfoTooltip
                placement={"top"}
                showIcon
                label={
                  <Box w="200px">
                    {
                      userRefInfo?.rewards?.map(reward => {
                        return <HorizontalItem
                          color={"black"}
                          label={reward.symbol}
                          value={formatCurrency(new BigNumber(reward.total).minus(reward.claimed).toString(), MIN_DECIMAL, MAX_DECIMAL, 'BTC', true)}
                        />;
                      })
                    }
                  </Box>
                }
              >
                <p className={s.item_title}>Unclaimed Rebates</p>
              </InfoTooltip>
            </Box>
            <p className={s.item_desc}>
              {formatCurrency(unClaimReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}
              {' '}
              USD
            </p>
          </div>
        </div>
        {Number(unClaimReward) > 0 && (
          <ButtonConnected className={cs(s.button)} title={"Connect Naka wallet"}>
            <Button
              type="button"
              onClick={onSubmitClaim}
              isLoading={isSubmitting}
              loadingText={'Submitting...'}
            >
              <p className={s.button_text}>
                CLAIM REBATES
              </p>
            </Button>
          </ButtonConnected>
        )}
      </div>
    </div>
  );
};

export default EnterRefferal;