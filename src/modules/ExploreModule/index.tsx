'use client'

import React from 'react';
import useWhiteBackground from '@hooks/useWhiteBackground';
import s from './styles.module.scss';
import WrapperCard from '@/modules/ExploreModule/components/WrapperCard';
import DappCard from '@/modules/ExploreModule/components/DappCard';
import { CHAIN_DATA, DAPPS_DATA } from '@/modules/ExploreModule/data';
import ChainCard from '@/modules/ExploreModule/components/ChainCard';


export default function ExploreModule(): React.JSX.Element {
  useWhiteBackground();

  return (
    <div className={'containerV3'}>
      <p className={s.heading}>Explore</p>
      <WrapperCard title={'Dapps'}>
        <div className={s.wrapperCardDapps}>
          {
            DAPPS_DATA.map((item) => {
              return (
                <DappCard {...item} key={item.title} />
              )
            })
          }
        </div>
      </WrapperCard>
      <WrapperCard title={'Chains'}>
        <div className={s.wrapperCardChains}>
          {
            CHAIN_DATA.map((item, index) => {
              return (
                <ChainCard {...item} key={index}/>
              )
            })
          }
        </div>
      </WrapperCard>
    </div>
  )
}
