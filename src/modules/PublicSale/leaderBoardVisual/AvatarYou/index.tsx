import s from './styles.module.scss';

import { getUrlAvatarTwitter } from '@/utils/twitter';
import React, { forwardRef, ReactElement, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';

const AvatarYou = forwardRef((props: any, ref: any) => {
  const { ...rest } = props;
  const [error, setError] = useState<boolean>(false);
  const user = useAppSelector(userSelector);
  const PlaceImage = (): ReactElement => {
    return <Image
      width={120}
      height={120}
      src={'/images/mk-your-avatar.jpg'} alt={'mk-your-avatar'} />;
  };
  return (
    <div
      className={`${s.avatarItem}`} ref={ref} {...rest}>
      <div className={s.avatarItem_inner}>
        <div
          className={s.avatarItem_avatar}
          onClick={() => {
            window.open(`https://twitter.com/${user?.twitter_username}`);
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
              user?.twitter_avatar as string,
              'medium',
            ) || ''} alt={'medium'} />}
        </div>
        <div>
          <p className={s.name}>You</p>
          <p className={s.price}>$1100,000</p>
        </div>
      </div>
    </div>
  );
});

export default AvatarYou;
