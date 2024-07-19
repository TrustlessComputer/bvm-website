import React, { useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IUserReferralInfo } from '@/interfaces/referral';
import { formatCurrency } from '@/utils/format';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { MIN_DECIMAL } from '@/constants/constants';
import cs from 'classnames';
import ButtonConnected from '@/components/ButtonConnected/v2';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import ClaimModal, { ClaimModalID } from '@/modules/Referrals/ClaimModal';

interface EnterRefferalProps {
  userRefInfo?: IUserReferralInfo;
}

const EnterRefferal = (props: EnterRefferalProps) => {
  const { userRefInfo } = props;
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const unClaimReward = useMemo(() => {
    return Number(userRefInfo?.referral_reward_total || '0') - Number(userRefInfo?.referral_reward_claimed || '0');
  }, [userRefInfo]);

  const showClaimModal = () => {
    const onClose = () => dispatch(closeModal({ id: ClaimModalID }));
    dispatch(
      openModal({
        id: ClaimModalID,
        title: `Claim referral reward`,
        className: s.modalContent,
        modalProps: {
          size: 'lg',
        },
        render: () => <ClaimModal userRefInfo={userRefInfo} onClose={onClose}/>,
      }),
    );
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
              onClick={showClaimModal}
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
