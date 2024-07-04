'use client';

import s from '../gamefi/styles.module.scss';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import { RetroCardProps } from '@components/Retro/RetroCard';

const DEFI_LIST_INFO: RetroCardProps[] = [
  {
    title: 'Independent Blockchain Network',
    children:
      "Each appchain runs on its own blockchain, ensuring faster transactions and a stable environment free from unrelated congestion.",
    src: '/appChains/1.svg',
    bgColor: '#00A757',
  },
  {
    title: 'Customized Consensus Mechanisms',
    children:
      'Implement consensus mechanisms best suited for specific applications, rather than relying on generic solutions.',
    src: '/appChains/2.svg',
    bgColor: '#FE6420',
  },
  {
    title: 'Specialized Smart Contracts',
    children:
      'Design smart contracts to meet the specific needs of the application, enhancing functionality and efficiency.',
    src: '/appChains/3.svg',
    bgColor: '#1D64F6',
  },
];

const AppChainsModule = () => {
  return (
    <div className={s.defi}>
      <RetroHero
        subTitle={'appchainS'}
        btn1={{
          title: 'Create your own Appchain',
          link: '/rollups/customize',
        }}
        src={'/appChains/hero.jpg'}
      >
        Build a customizable appchain aligned with your product roadmap
      </RetroHero>
      <ListInfo
        list_info={DEFI_LIST_INFO}
        heading={'Learn what BVM products can do for you '}
      />
    </div>
  );
};

export default AppChainsModule;
