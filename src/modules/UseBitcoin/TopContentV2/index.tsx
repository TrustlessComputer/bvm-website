import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link';

function TopContentV2() {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <p className={s.label}>Welcome to the future of Bitcoin</p>
        <p className={s.heading}>Experience Bitcoin like never before</p>
        <p className={s.description}>
          BVM is the Bitcoin L2 factory that has all the best-of-breed
          blockchain modules for builders to easily set up their own powerful
          Bitcoin L2s, customized for any purpose, from DeFi, GameFi, RWA, DePIN
          to AI.
        </p>
        <Link href={'/rollups/customize'} className={s.link}>
          Launch your Bitcoin L2
        </Link>
      </div>
    </div>
  );
}

export default TopContentV2;
