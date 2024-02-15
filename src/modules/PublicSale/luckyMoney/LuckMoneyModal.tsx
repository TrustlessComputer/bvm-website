import {
  claimPublicSaleLuckyMoney,
  getPublicSaleSummary,
  IPublicSaleLuckyMoney,
} from '@/services/public-sale';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  requestReload,
  setCurrentLuckyMoney,
} from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Flex, Text } from '@chakra-ui/react';
import Loading from '@/components/Loading';
import s from './styles.module.scss';
import { closeModal } from '@/stores/states/modal/reducer';
import SvgInset from '@/components/SvgInset';
import bg from '@/public/images/lucky-money-envelops/lucky-money-background-conffeti.png';
import bgSuccess from '@/public/images/lucky-money-envelops/lucky-money-success.png';
import { formatAmount, formatCurrency } from '@/utils/format';
import { userSelector } from '@/stores/states/user/selector';
import { PUBLIC_SALE_END } from '@/modules/Whitelist';
import { labelAmountOrNumberAdds } from '@/utils/string';
import { shareLuckyPackage } from '@/utils/twitter';

type Props = {
  envelopSrc: string;
};

export default function LuckyMoneyModal({ envelopSrc }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const needReload = useAppSelector(commonSelector).needReload;
  const luckyMoneyList = useAppSelector(commonSelector).luckyMoneyList;
  const currentLuckyMoney = useAppSelector(commonSelector).currentLuckyMoney;

  const [submitting, setSubmitting] = useState(false);
  const [reward, setReward] = useState<IPublicSaleLuckyMoney>();
  const [subbmited, setSubmitted] = useState(false);

  useEffect(() => {
    handleClaim();
  }, []);

  const getLatestCurrentLuckyMoney = () => {
    if (luckyMoneyList) {
      for (let i = 0, k; i < luckyMoneyList.length; i++) {
        const lm = luckyMoneyList[i];

        if (dayjs().utc().isBefore(dayjs(lm.created_at))) {
          dispatch(setCurrentLuckyMoney(lm));
          break;
        }
      }
    }
  };

  const handleClaim = async () => {
    try {
      setSubmitting(true);
      // const res = await claimPublicSaleLuckyMoney(4072);

      const res = await claimPublicSaleLuckyMoney(
        currentLuckyMoney?.id as number,
      );

      setSubmitted(true);
      setReward(res);

      // if (res) {
      //   toast.success(
      //     `Claim successfully! You received ${currentLuckyMoney?.bvm_amount} BVM`,
      //   );
      // } else {
      //   toast.success('Better luck next time!');
      // }

      const index = luckyMoneyList.indexOf(
        currentLuckyMoney as IPublicSaleLuckyMoney,
      );

      if (index > 7) {
        dispatch(requestReload());
      } else {
        getLatestCurrentLuckyMoney();
      }
    } catch (e: any) {
      // if (e?.code === -2010) {
      //   toast.error('Already claimed.');
      // } else if (e?.code === 1003) {
      //   toast.error('Something went wrong. Please try again.');
      // }
      getLatestCurrentLuckyMoney();
      // onHide();
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const onHide = () => {
    dispatch(
      closeModal({
        id: 'lucky-money-dialog',
      }),
    );
  };

  const handleShareTw = async () => {
    await shareLuckyPackage({ code: user?.referral_code, amount: reward?.bvm_amount || 0 })
    // window.open('https://twitter.com', '_blank');
    //
    // const shareUrl = !user?.referral_code
    //   ? 'bvm.network/public-sale'
    //   : `bvm.network/public-sale?refer=${user?.referral_code}`;
    //
    // const saleSummary = await getPublicSaleSummary();
    //
    // const endHours = dayjs.utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss').diff(dayjs.utc(), 'hours')
    // const endMins = dayjs.utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss').diff(dayjs.utc(), 'minutes') || 1
    //
    // // const content = `Just got ${
    // //   reward?.bvm_amount || 0
    // // } $BVM from the Red Packet giveaway at BVM public sale 🧧\n\n@BVMnetwork is the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s!\n\nJoin me and the ${
    // //   saleSummary.total_user || '0'
    // // } early contributors to build the Bitcoin's future with $BVM\n\n`;
    //
    // const content = `The $BVM public sale is ending in ${endHours ? `${endHours} hour${labelAmountOrNumberAdds(endHours)}` : ''}${!endHours ? `${endMins} minute${labelAmountOrNumberAdds(endMins)}` : ''}\n\nSo far:\n\n🚀: $${formatCurrency(saleSummary.total_usdt_value_not_boost, 0, 2)} raised\n💪: ${formatCurrency(saleSummary.total_user, 0, 0)} backers\n💪: ${shareUrl}\n\n@BVMnetwork is the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s\nNo doubt BVM will be the leader of the Bitcoin L2 meta`
    //
    // setTimeout(() => {
    //   return window.open(
    //     `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
    //       content,
    //     )}`,
    //     '_blank',
    //   );
    // }, 300);
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
              {formatCurrency(reward?.bvm_amount || 0, 0, 0)}
            </div>
            <div className={s.rewardUnit}>BVM tokens</div>

            <div className={s.btnShare} onClick={handleShareTw}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" rx="8" fill="black" />
                <path
                  d="M10.875 3.46875H12.4087L9.05875 7.3075L13 12.5313H9.91437L7.4975 9.3625L4.73187 12.5313H3.1975L6.78062 8.425L3 3.46875H6.16438L8.34875 6.36438L10.875 3.46875ZM10.3375 11.6113H11.1875L5.70187 4.34063H4.79062L10.3375 11.6113Z"
                  fill="white"
                />
              </svg>
              <span>Share to claim</span>
            </div>
          </div>
        );
      }
    }

    return <></>;
  };

  const renderFailed = () => {
    if (subbmited) {
      if (!reward) {
        return (
          <div className={s.failed}>
            <div className={s.betterTitle}>Better luck next time!</div>
            <div className={s.betterDesc}>
              We are still dropping tons of Lucky Red Packets for early $BVM
              contributors until the end of the public sale
            </div>
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
          {renderFailed()}
        </div>
      </div>
    </div>
  );
}
