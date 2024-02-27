import s from './styles.module.scss';
import PriceCard from '@/modules/price/price-card';
import { Tooltip } from 'react-tooltip';
import React, { ReactElement } from 'react';

const PriceModule = () => {

  return (
    <div className={s.price}>
      <div className={s.price_top}>
        <span>Plans built for every team</span>
        <h1>Developer-first pricing</h1>
      </div>
      <div className={s.price_inner}>
        <div className={`${s.price_container} container`}>
          <PriceCard
            isPlaceholder={true}
            network={'Network'}
            portocol={'Rollup Protocol'}
            layer={'Data Availability Layer'}
            time={'Block Time'}
            support={'Support'}
          />
          <PriceCard
            label={'Free'}
            packageX={'isFree'}
            network={'Bitcoin testnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin (Regtest) or Ethereum (Goerli)'}
            time={'2s, 5s, 10s'}
            support={'Discord support'}
            titleAction={'Get started'}
            action={'/blockchains/customize'}
          >
            <h1>7-day free trial</h1>
          </PriceCard>
          <PriceCard
            iseSelected={true}
            label={'Growth'}
            packageX={'isEss'}
            subtitle={'(Setup cost: 6 BVM)'}
            network={'Bitcoin testnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin + Polygon'}
            time={'2s, 5s, 10s'}
            support={'Discord support'}
            titleAction={'Get started'}
            action={'/blockchains/customize'}
          >
            <h1> 71,257 BVM<small>/month</small></h1>
          </PriceCard>
          <PriceCard
            label={'Scale'}
            packageX={'isPro'}
            subtitle={'(Setup cost: 6 BVM)'}
            network={'Bitcoin testnet'}
            portocol={'Optimistic rollups'}
            layer={'Bitcoin'}
            time={(<div className={s.tooltip}>
              10s
               <span>
                      <a id='my-anchor-element_ic_sharp_50'><img src='/builder/svg-details.svg' alt='ic_sharp' /></a>
                      <Tooltip
                        anchorSelect='#my-anchor-element_ic_sharp_50'
                      >
                        <div>
                          <b>Optional</b>
                          <ul>
                           <li> Block Time: 5s (+1685 BVM monthly)</li>

                  <li>Block Time: 2s (+6740 BVM monthly)</li>
                          </ul>
                        </div>
                      </Tooltip>
                    </span></div>)}
            support={'Dedicated account manager'}
            titleAction={'Get started'}
            action={'/blockchains/customize'}
          >
            <h1>538,683 BVM<small>/month</small></h1>
          </PriceCard>
          <PriceCard
            label={'Custom'}
            packageX={'isCustom'}
            network={'Design a custom Bitcoin L2 — available for businesses with large transaction volume or unique business models.'}
            support={'Dedicated account manager'}
            // titleAction={'Contact sales'}
            // action={'#'}
          >
            <h1>Custom Price</h1>
          </PriceCard>
        </div>
      </div>

    </div>
  );
};

export default PriceModule;
