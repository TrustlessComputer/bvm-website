import s from './styles.module.scss';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import React, { forwardRef, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { gsap } from 'gsap';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';

interface IProps {
  data: ILeaderBoardPoint,
  isShowName?: boolean
  isYou?: boolean
  onCompleted?: ()=>void
}

const AvatarItem = forwardRef((props: IProps, ref: any) => {
  const { data, isShowName, isYou, onCompleted, ...rest } = props;
  const lottieRef = useRef<any>();
  const refMoney = useRef<{ value: number }>({ value: Number(data?.usdt_value) || 0 });
  const refInertMoney = useRef<HTMLParagraphElement>(null);
  const [isLoopDone, setIsLoopDone] = useState(true);
  const refTime = useRef<NodeJS.Timeout>();
  const needCheckDeposit = useAppSelector(commonSelector).needCheckDeposit;
  const animatedLatestContributors = useAppSelector(commonSelector).animatedLatestContributors;

  const newTotalMoney = useMemo(():number => {
    if (needCheckDeposit) {
      const add = animatedLatestContributors?.find(c => c.twitter_id === data.twitter_id);

      if(add) {
        return refMoney.current.value + Number(add.usdt_value);
      } else {
        return refMoney.current.value;
      }
    } else {
      return refMoney.current.value;
    }
  }, [needCheckDeposit, JSON.stringify(animatedLatestContributors)]);

  useEffect(() => {

    if (!refInertMoney.current) return;
    if (newTotalMoney && refMoney.current.value !== newTotalMoney) {
      const numberLoop = 5;
      const duration = 19/24;
      gsap.to(refMoney.current, {
        value: newTotalMoney, ease: 'power3.inOut', duration: numberLoop * duration, onUpdate: () => {
          if (refInertMoney.current) {
            refInertMoney.current.innerHTML = `$${formatCurrency(refMoney.current.value, 0, 0, '', true)}`;
          }
        },
      });
      if (!lottieRef.current) return;

      lottieRef.current.setLoop(numberLoop);
      lottieRef.current.play();

      setIsLoopDone(false);
      if(refTime.current) {
        clearTimeout(refTime.current);
      }
      refTime.current = setTimeout(() => {
        setIsLoopDone(true);
        onCompleted && onCompleted();
      }, duration * numberLoop * 1000);
    } else {
      refInertMoney.current.innerHTML = `$${formatCurrency(refMoney.current.value, 0, 0, '', true)}`;
    }

    return () => {
      if(refTime.current) {
        clearTimeout(refTime.current);
      }
    }
  }, [newTotalMoney]);

  const [error, setError] = useState<boolean>(false);
  const PlaceImage = (): ReactElement => {
    return <Image
      width={120}
      height={120}
      src={'/images/mk-user.jpg'} alt={'user'} style={{ cursor: 'pointer' }} />;
  };

  return (
    <div
      className={`${s.avatarItem} ${isYou && s.isYou} ${data.levelRender !== undefined && 'level-' + data.levelRender} js-avatarItem`}
      ref={ref} {...rest}>
      <div className={s.avatarItem_inner}>
        {
          data.levelRender === 0 && <Image className={s.king} src={'/public-sale/king.png'} width={60} height={60} alt={'king'} />
        }
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
          <p className={s.price} ref={refInertMoney}></p>
          {
            isShowName && data.levelRender === 0 && !isYou && <p className={s.name}>{data.twitter_username}</p>
          }
          {
            isYou && <p className={s.name}>You</p>
          }
        </div>
      </div>
      {
        <div className={`${s.lt} ${!isLoopDone ? s.isRun : ''}`}>
          <DotLottiePlayer
            className={s.lottie}
            lottieRef={lottieRef}
            src='/presale-up-2.lottie'
          />
        </div>
      }
    </div>
  );
});

export default AvatarItem;
