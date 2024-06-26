'use client'


import BitEth from '@/modules/landing/Componets/BitEth';
import s from './styles.module.scss';
import Architecture from '@/modules/bvm-sct-landing/Architecture';
import Loader from '@/modules/builder-landing/Loader';
import Categories from '@/modules/bvm-sct-landing/Categories';
import RoadMap from '@/modules/bvm-sct-landing/RoadMap';

export default function BvmSctLanding() {
  return <div className={`${s.BvmSctWrapper}`}>
    <Loader />
    <BitEth headings={'Smart contracts on Bitcoin'} description={'BVM is EVM equivalent. It allows Ethereum developers to migrate their Solidity smart contracts and dapps from Ethereum to Bitcoin with minimal or no modifications.'} textBtn={'Deploy an app on Bitcoin'} btnLink={'https://docs.bvm.network/bvm/quickstart/build-your-first-bitcoin-dapps'}/>
    <Architecture>
      BVM is a state machine similar to Ethereum-VM that utilizes the Bitcoin blockchain as a
      data layer to achieve transaction-level consensus. This approach allows BVM to function as a general-purpose
      state machine while taking advantage of the Bitcoin blockchain's security and data availability without
      requiring additional modules, such as network or consensus protocols. <br/> There are 4 most important components needed to explain: the local mempool, Ethereum-like VM, TxWriter, and
      TxReader.
    </Architecture>
    <RoadMap />
  </div>;
}

