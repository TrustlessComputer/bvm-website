import { claimLuckyMoneyShare } from '@/services/public-sale';
import { useAppDispatch } from '@/stores/hooks';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import s from './styles.module.scss';
import { closeModal } from '@/stores/states/modal/reducer';
import SvgInset from '@/components/SvgInset';
import bg from '@/public/images/lucky-money-envelops/lucky-money-background-conffeti.png';
import bgSuccess from '@/public/images/lucky-money-envelops/lucky-money-success.png';
import { formatCurrency } from '@/utils/format';
import { requestReload } from '@/stores/states/common/reducer';

type Props = {
};

export default function LuckyMoneyShareModal({  }: Props) {
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);
  const [reward, setReward] = useState<string>();
  const [subbmited, setSubmitted] = useState(false);

  useEffect(() => {
    handleClaim();
  }, []);

  const handleClaim = async () => {
    try {
      setSubmitting(true);
      const res = await claimLuckyMoneyShare();

      setSubmitted(true);
      setReward(res);
      dispatch(requestReload());
    } catch (e: any) {
      // if (e?.code === -2010) {
      //   toast.error('Already claimed.');
      // } else if (e?.code === 1003) {
      //   toast.error('Something went wrong. Please try again.');
      // }
      // onHide();
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const onHide = () => {
    dispatch(
      closeModal({
        id: 'lucky-money-share-dialog',
      }),
    );
  };

  const renderLoading = () => {
    if (submitting) {
      return (
        <div className={s.waiting}>
          <Loading className={s.loading} />
        </div>
      );
    }
    return <></>;
  };

  const renderSuccess = () => {
    if (subbmited) {
      if (reward) {
        return (
          <div className={s.success}>
            <div className={s.rewardTitle}>You have snatched</div>
            <div className={s.rewardValue}>
              {formatCurrency(reward || 0, 0, 0)}
            </div>
            <div className={s.rewardUnit}>BVM tokens</div>
          </div>
        );
      }
    }

    return <></>;
  };

  return (
    <div className={s.LuckMoneyModal}>
      <button onClick={onHide} className={s.closeBtn}>
        <SvgInset
          className={s.closeIcon}
          svgUrl={`/icons/ic_close_modal.svg`}
        />
      </button>
      <div className={s.background}>
        {subbmited && reward ? (
          <img src={bgSuccess.src} />
        ) : (
          <img src={bg.src} />
        )}
      </div>

      <div className={s.Container}>
        <div className={s.ContainerBody}>
          {renderLoading()}
          {renderSuccess()}
        </div>
      </div>
    </div>
  );
}
