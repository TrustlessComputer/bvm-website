'use client';

import s from '../gamefi/styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import { RetroCardProps } from '@components/Retro/RetroCard';

const DEFI_LIST_INFO: RetroCardProps[] = [
  {
    title: 'Customizable Functions',
    children:
      "Tailor functions as needed, with all essential features installed right away, including token issuance, staking, bridges, and more.",
    src: '/ecosystems/1.svg',
    bgColor: '#8643FB',
  },
  {
    title: 'Scalable Infrastructure',
    children:
      'Achieve better resource management and scalability, accommodating growing user bases and increasing transaction volumes across a wide range of activities.',
    src: '/ecosystems/2.svg',
    bgColor: '#FE6420',
  },
  {
    title: 'Optimized Performance',
    children:
      'Fine-tune performance for specific use cases, enhancing efficiency and speeding up transaction processing.',
    src: '/ecosystems/3.svg',
    bgColor: '#1D64F6',
  },
];

const EcosystemsModule = () => {
  return (
    <div className={s.defi}>
      <RetroHero
        subTitle={'ecosystemS'}
        btn1={{
          title: 'Create your own Ecosystem',
          link: '/rollups/customize',
        }}
        src={'/ecosystems/hero.jpg'}
      >
        Deploy a fully functional blockchain ecosystem
      </RetroHero>
      <ListInfo
        list_info={DEFI_LIST_INFO}
        heading={'Learn what BVM products can do for you '}
      />
    </div>
  );
};

export default EcosystemsModule;
