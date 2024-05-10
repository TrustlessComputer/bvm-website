import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link';

function TopContentV2() {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <p className={s.label}>Bitcoin L2 for DeFi</p>
        <p className={s.heading}>Experience Bitcoin like never before.</p>
        <p className={s.description}>Hop from one Bitcoin L2 to another to play on-chain games, trade BRC-20 futures, run for charity, learn about modular architecture, and more.</p>
        <Link href={''} className={s.link}>Launch your Bitcoin L2</Link>
      </div>
    </div>
  );
}

export default TopContentV2;
