import React from 'react';
import s from './PricingV5.module.scss';

type Props = {};

const Pricing = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <div>
        <div className={s.heading}>
          <h3>Let’s build on Bitcoin.</h3>
          <p>Pricing for crypto teams of all sizes.</p>
        </div>
        <div className={s.price_list}></div>
      </div>
    </div>
  );
};

export default Pricing;
