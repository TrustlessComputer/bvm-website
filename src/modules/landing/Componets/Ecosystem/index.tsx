import React from 'react';
import s from './styles.module.scss';

export default function Ecosystem() {
  return (
    <div className={s.ecosystem}>
      <div className="container">
        <div className={s.ecosystem_heading}>
          <h3 className={s.ecosystem_heading_title}>
            Why launch your own <span>Bitcoin L2 blockchain?</span>
          </h3>
          <p className={s.ecosystem_heading_description}>
            Whatever your vision — a dapp, a fully onchain game, a DEX, or an
            ecosystem — there are many benefits of running your own Bitcoin L2
            blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}
