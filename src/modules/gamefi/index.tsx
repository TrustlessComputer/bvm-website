'use client';

import s from './styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';

const GameFiModule = () => {
  return (
    <div className={s.gamefi}>
      <RetroHero label={'Designed for Game builders'} btn1={{
        title: 'Create your own GameFi L2',
        link: '#',
      }}
                 btn2={{
                   title: 'Explore Bitcoin Arcade now',
                   label: 'Need an example?',
                   link: '#',
                 }}
                 src={'/retro/hero.png'}
      >
        Shape the Future of Gaming on Bitcoin
      </RetroHero>
      <ListInfo />
      <RetroCaseStudy />
    </div>
  );
};

export default GameFiModule;
