import React from 'react';
import s from './style.module.scss'

function BVMUtilities() {
  return (
    <div className={s.wrapper}>
      <div className={'containerV3'}>
        <p className={s.title}>BVM Utilities</p>
        <div className={s.inner}>
          <div className={s.card}>
            <p className={s.card_title}>Network fees</p>
            <p className={s.card_desc}>$BVM is the lifeblood of the BVM network. When you send BVM, use a dapp, or
              perform a rollup, you’ll pay fees in BVM.</p>
          </div>
          <div className={s.card}>
            <p className={s.card_title}>Governance</p>
            <p className={s.card_desc}>The community treasury consists of 50% of the BVM supply. This treasury will governed by BVM stakers once the network has become sufficiently decentralized.</p>
          </div>
          <div className={s.card}>
            <p className={s.card_title}>Payments</p>
            <p className={s.card_desc}>Along with BTC and developers’ tokens, BVM is a popular currency accepted within many dapps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BVMUtilities;
