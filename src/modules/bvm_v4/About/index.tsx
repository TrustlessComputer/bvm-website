import React from 'react';
import s from './style.module.scss'


const About = (): React.JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={`${s.container} containerV3`}>
        <div className={s.content}>
          <h2 className={s.title}>About</h2>
          <p className={s.desc}>
            BVM is the scalable infrastructure to make Bitcoin as generalized as possible — usable for far more than just a currency. Powered by BVM, developers can now build all kinds of infrastructures, like Bitcoin L2s and Bitcoin L3s, and decentralized applications on Bitcoin — DeFi, GameFi, Payments, AI, and more.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
