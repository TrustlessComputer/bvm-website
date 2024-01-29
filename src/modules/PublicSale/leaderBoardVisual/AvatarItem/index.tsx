import s from './styles.module.scss';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import React, { forwardRef, ReactElement, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';
import { DotLottiePlayer } from '@dotlottie/react-player';
import {gsap} from 'gsap';

interface IProps {
  data: ILeaderBoardPoint,
  isShowName?: boolean
  isYou?: boolean
  isUpMoney?: boolean
  newMoney?: number
}

const AvatarItem = forwardRef((props: IProps, ref: any) => {
  const { data, isUpMoney, newMoney, isShowName, isYou, ...rest } = props;
  const lottieRef = useRef<any>();
  const refMoney = useRef({ value: data?.usdt_value });
  const refInertMoney = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const fa = { value: data.usdt_value };

    if (!refInertMoney.current) return;
    if (newMoney && refMoney.current.value !== newMoney) {
      gsap.to(refMoney.current, {
        value: newMoney, ease: 'power3.inOut', duration: 1, onUpdate: () => {
          if (refInertMoney.current) {
            refInertMoney.current.innerHTML = `$${formatCurrency(refMoney.current.value, 0, 0, '', true)}`;
          }
        },
      });
    } else {
      refInertMoney.current.innerHTML = `$${formatCurrency(refMoney.current.value, 0, 0, '', true)}`;
    }
  }, [newMoney]);

  const [error, setError] = useState<boolean>(false);
  const PlaceImage = (): ReactElement => {
    return <Image
      width={120}
      height={120}
      src={'/images/mk-user.jpg'} alt={'user'} style={{ cursor: 'pointer' }} />;
  };

  useEffect(() => {
    if (isUpMoney) {
      lottieRef.current.setLoop(true);
      lottieRef.current.play();

    } else {
      lottieRef.current.stop();
    }
  }, [isUpMoney]);

  return (
    <div
      className={`${s.avatarItem} ${isYou && s.isYou} ${data.levelRender !== undefined && 'level-' + data.levelRender} js-avatarItem`}
      ref={ref} {...rest}>
      <div className={s.avatarItem_inner}>
        <div
          className={s.avatarItem_avatar}
          onClick={() => {
            window.open(`https://twitter.com/${data?.twitter_username}`);
          }}
        >
          {
            error && <PlaceImage />
          }
          {!error && <Image
            width={120}
            height={120}
            onError={(e) => {
              setError(true);
            }}
            src={getUrlAvatarTwitter(
              data?.twitter_avatar as string,
              'medium',
            ) || ''} alt={'medium'} />}
        </div>
        <div className={s.meta}>
          {
            isShowName && !isYou && <p className={s.name}>{data.twitter_username}</p>
          }
          {
            isYou && <p className={s.name}>You</p>
          }
          <p className={s.price} ref={refInertMoney}></p>
        </div>
      </div>
      <DotLottiePlayer
        className={s.lottie}
        lottieRef={lottieRef}
        src='/presale-up-2.lottie'
      />
    </div>
  );
});

export default AvatarItem;
