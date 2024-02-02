import s from './styles.module.scss';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getLuckyMoneyLastWinner, LuckyMoneyWinner } from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import background from '@/public/images/lucky-money-envelops/lucky-money-winner-background.png';
import Avatar from '@/components/Avatar';
import relativeTime from 'dayjs/plugin/relativeTime';
import { settingMomentFromNow } from '@/utils/helpers';

dayjs.extend(relativeTime);

settingMomentFromNow();

const LuckyMoneyWinner = () => {
  const currentLuckyMoney = useAppSelector(commonSelector).currentLuckyMoney;
  const [winner, setWinner] = useState<LuckyMoneyWinner>();

  useEffect(() => {
    setWinner(undefined);

    getLuckyMoneyLastWinner().then((res) => {
      setWinner(res);
    });
  }, [currentLuckyMoney?.id]);

  const renderWinner = () => {
    return (
      <div
        className={s.winner}
        onClick={() => {
          if (winner) {
            window.open(
              `https://twitter.com/${winner.user.twitter_username}`,
              '_blank',
            );
          }
        }}
      >
        <div className={s.avatar}>
          <Avatar width={40} url={winner?.user?.twitter_avatar} />
        </div>
        <div>
          <div className={s.textMessage}>
            <strong>{winner?.user.twitter_name || '---'}</strong> just snatched
            a red packet successfully and{' '}
            <strong>got {winner?.bvm_amount} BVM</strong>.
          </div>
          <div className={s.time}>
            {winner?.updated_at
              ? `${dayjs(winner?.updated_at).fromNow(true)} ago`
              : '--:--'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <img src={background.src} />
      <div className={s.overlay}>
        <div className={s.body}>{renderWinner()}</div>
      </div>
    </div>
  );
};

export default LuckyMoneyWinner;
