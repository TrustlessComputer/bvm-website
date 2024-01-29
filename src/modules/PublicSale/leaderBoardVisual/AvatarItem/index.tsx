import s from './styles.module.scss';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import React, { forwardRef, ReactElement, useState } from 'react';
import Image from 'next/image';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';

interface IProps {
  data: ILeaderBoardPoint
}

const AvatarItem = forwardRef((props: IProps, ref: any) => {
  const { data, ...rest } = props;

  const [error, setError] = useState<boolean>(false);
  const PlaceImage = (): ReactElement => {
    return <Image
      width={120}
      height={120}
      src={'/images/mk-user.jpg'} alt={'user'} />;
  };

  console.log('data', data);

  return (
    <div
      className={`${s.avatarItem} ${data.levelRender !== undefined && 'level-' + data.levelRender} js-avatarItem`} ref={ref} {...rest}>
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
        <p className={s.price}>${formatCurrency(data?.usdt_value, 0, 0, 'BTC', true)}</p>
      </div>
  </div>
  );
});

export default AvatarItem;
