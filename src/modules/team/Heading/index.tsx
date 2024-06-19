import React from 'react';
import s from './styles.module.scss';

export default function Heading() {
  return (
    <div className={`containerV3`}>
      <div className={s.headingWrapper}>
        <h1 className={s.headingWrapper_title}>TEAM</h1>
        <p className={s.headingWrapper_decs}>
          BVM is a crypto research and development team. Our mission is to
          upgrade Bitcoin beyond just a currency.
        </p>
      </div>
    </div>
  );
}
