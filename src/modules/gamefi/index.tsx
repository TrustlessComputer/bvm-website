'use client';

import s from './styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';

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
                 src={'/retro/hero.png'}
      >
        Shape the Future of Gaming on Bitcoin
      </RetroHero>
      <ListInfo />
      <RetroCaseStudy subTitle={'Case Study'} btn={{
        title: 'Explore Bitcoin Arcade now!',
        link: 'https://play.bitcoinarcade.xyz',
        target: '_blank'
      }} src={'/retro/imageRight.png'} heading={'Ushering the new golden era of Gaming on Bitcoin'}>The first
        ever Fully On-Chain blockchain on Bitcoin</RetroCaseStudy>
    </div>
  );
};

export default GameFiModule;
