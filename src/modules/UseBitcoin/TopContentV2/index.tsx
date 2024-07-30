import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link';

function TopContentV2() {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        {/*<p className={s.label}>Explore success stories</p>*/}
        <p className={s.heading}>Explore success stories</p>
        <p className={s.description}>
          See how our customers build different use cases for Bitcoin and collectively upgrade Bitcoin beyond just a currency.
        </p>
        {/*<Link href={'/rollups/customize'} className={s.link}>*/}
        {/*  Launch your Bitcoin L2*/}
        {/*</Link>*/}
      </div>
    </div>
  );
}

export default TopContentV2;
