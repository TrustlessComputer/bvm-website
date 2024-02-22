import React from 'react';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import Image from 'next/image';
import cn from 'classnames';

export default function Connect() {
  return (
    <div className={s.wrapper}>
      <div className={cn(s.connect, 'container')}>
        <div className={s.inner}>
          <div className={s.heading}>
            <Chars>
              <h3 className={s.heading_title}>
                Connect with crypto-native investors
              </h3>
            </Chars>
            <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.2}>
              <p className={s.heading_desc}>
                BVM will help you connect with 20+ Crypto VCs and angel
                investors looking to deploy millions into potential Bitcoin L2s.
              </p>
            </Fade>
          </div>
        </div>

        <Fade delay={0.4}>
          <Image
            quality={100}
            alt="background"
            src={'/builder/background_connect.png'}
            width={1170}
            height={537}
            className={s.connect_bg}
          />
        </Fade>
      </div>
    </div>
  );
}
