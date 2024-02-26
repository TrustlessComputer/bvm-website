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
    <BitEth headings={'Smart contracts on Bitcoin'} description={'Write smart contracts and build decentralized applications (dapps) on Bitcoin.'} textBtn={'Build your Bitcoin L2'}/>
    <Architecture />
    {/*<Categories />*/}
    <RoadMap />
  </div>;
}

