import React from 'react';
import s from './PricingV5.module.scss';
import useAvailableListTemplate from '../blockchains/Buy/studio/useAvailableListTemplate';
import enhance from './enhance';
import { usePricingTemplate } from './usePricingTemplate';

type Props = {};

const Pricing = (props: Props) => {
  const { dataList } = usePricingTemplate();

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

export default enhance(Pricing);
