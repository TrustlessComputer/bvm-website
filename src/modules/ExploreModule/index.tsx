'use client';

import React from 'react';
import useWhiteBackground from '@hooks/useWhiteBackground';
import s from './styles.module.scss';
import WrapperCard from '@/modules/ExploreModule/components/WrapperCard';
import DappCard from '@/modules/ExploreModule/components/DappCard';
import { CHAIN_DATA, DAPPS_DATA } from '@/modules/ExploreModule/data';
import ChainCard from '@/modules/ExploreModule/components/ChainCard';
import Loader from '@/modules/builder-landing/Loader';
import Chars from '@interactive/Chars';


export default function ExploreModule(): React.JSX.Element {
  useWhiteBackground();

  return (
    <>
      <Loader bgColor={'#FFF'} />
      <div className={`containerV3`}>
        <p className={s.heading}><Chars delayEnter={.5}>
          Explore
        </Chars></p>
        <WrapperCard title={'Dapps'}>
          <div className={s.wrapperCardDapps}>
            {
              DAPPS_DATA.map((item, idx) => {
                return (
                  <DappCard {...item} idx={idx} key={item.title} />
                );
              })
            }
          </div>
        </WrapperCard>
        <WrapperCard title={'Chains'}>
          <div className={s.wrapperCardChains}>
            {
              CHAIN_DATA.map((item, index) => {
                return (
                  <ChainCard idx={index} {...item} key={item.image} />
                );
              })
            }
          </div>
        </WrapperCard>
      </div>
    </>
  );
}
