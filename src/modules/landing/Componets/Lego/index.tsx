import React from 'react';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';

export default function Lego() {
  return (
    <div className={s.lego}>
      <div className={s.lego_content}>
        <h3 className={s.lego_content_title}>
          Customize your Bitcoin L2 blockchain with the best-of-breed building
          blocks.
        </h3>

        <p className={s.lego_content_description}>
          Choose a rollup method, select a data availability layer, and then
          launch to the world — it’s that easy. You can even install default
          dapps like Uniswap, Compound, and DAO. It’s a new way to build
          blockchain.
        </p>
      </div>
    </div>
  );
}
