'use client';

import s from './styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';
import { RetroCardProps } from '@components/Retro/RetroCard';

const GAMEFI_LIST_INFO: RetroCardProps [] = [
  {
    title: 'Unlock unparalleled performance',
    children: 'Experience lightning-fast 2-second block times and ultra-low gas fees (less than $0.001 per transaction).',
    src: '/gamefi/1.png',
  },
  {
    title: 'Migrate games seamlessly',
    children: 'Effortlessly transition existing games from EVM-compatible chains like Ethereum, BSC, or Fantom to your new Bitcoin L2 without the need for a new toolkit.',
    src: '/gamefi/2.png',
  },
  {
    title: 'Enhance Scalability and Security',
    children: 'Leverage optimistic rollup technology for massive scalability and Bitcoin-grade security.',
    src: '/gamefi/3.png',
  },
];

const GameFiModule = () => {
  return (
    <div className={s.gamefi}>
      <RetroHero label={'Designed for Game builders'} subTitle={'Bitcoin L2 for GameFi'} btn1={{
        title: 'Create your own GameFi L2',
        link: '/blockchains/customize',
      }}
                 btn2={{
                   title: 'Explore Bitcoin Arcade now',
                   label: 'Need an example?',
                   link: 'https://play.bitcoinarcade.xyz/',
                   target: '_blank',
                 }}
                 src={'/gamefi/gamefiHero.png'}
      >
        Shape the Future of Gaming on Bitcoin
      </RetroHero>
      <ListInfo list_info={GAMEFI_LIST_INFO} heading={'Learn what BVM products can do for you'}/>
      <RetroCaseStudy subTitle={'Case Study'} btn={{
        title: 'Explore Bitcoin Arcade now!',
        link: 'https://play.bitcoinarcade.xyz',
        target: '_blank'
      }} src={'/retro/imageRight.png'} brand={'/gamefi/brand.png'}  heading={'Ushering the new golden era of Gaming on Bitcoin'}>The first
        ever Fully On-Chain blockchain on Bitcoin</RetroCaseStudy>
    </div>
  );
};

export default GameFiModule;
