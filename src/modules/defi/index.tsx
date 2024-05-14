'use client';

import { Box } from '@chakra-ui/react';
import CategorySection from './CategorySection';
import FooterSection from './FooterSection';
import HeroSection from './HeroSection';
import s from '../gamefi/styles.module.scss';
import Loader from '@/modules/builder-landing/Loader';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';
import { RetroCardProps } from '@components/Retro/RetroCard';


const DEFI_LIST_INFO: RetroCardProps [] = [
  {
    title: 'Enhance DeFi Efficiency',
    children: 'With a 2-second block time and transaction costs of less than $0.001, it is substantially faster and cheaper than Bitcoin\'s mainnet, providing great efficiency.',
    src: '/defi/1.png',
  },
  {
    title: 'Zero effort to migrate from Ethereum',
    children: 'It enables developers to transfer dApps from Ethereum to Bitcoin with little or no change.',
    src: '/defi/2.png',
  },
  {
    title: 'Flexible Gas Fee Options:',
    children: 'Enjoy the flexibility of paying gas fees in either Bitcoin or your native tokens.',
    src: '/defi/3.png',
  },
];

const DeFiModule = () => {
  // return (
  //   <>
  //     <Box className={s.container} bgColor={'#f6f6f6'}>
  //
  //       <div className={s.heroSection}>
  //         <HeroSection />
  //       </div>
  //       <div className={s.categorySection}>
  //         <CategorySection />
  //       </div>
  //       <FooterSection />
  //     </Box>
  //   </>
  //
  // );

  return (
    <div className={s.defi}>
      <RetroHero label={'Unlocking Bitcoin\'s $250B treasury chest'} subTitle={'Bitcoin L2 for DeFi'} btn1={{
        title: 'Create your own DeFi L2',
        link: '/blockchains/customize',
      }}
                 btn2={{
                   title: 'Explore Nakachain now',
                   label: 'Need an example?',
                   link: 'https://nakachain.xyz',
                   target: '_blank',
                 }}
                 src={'/defi/defi-hero.png'}
      >
        Making DeFi on Bitcoin possible and accessible to everyone
      </RetroHero>
      <ListInfo list_info={DEFI_LIST_INFO} heading={'Learn what BVM products can do for you '} />
      <RetroCaseStudy subTitle={'Case Study'} btn={{
        title: 'Explore NakaChain now',
        link: 'https://nakachain.xyz',
        target: '_blank'
      }} src={'/defi/case-study.png'} brand={'/defi/brand.png'}
                      heading={'Making DeFi on Bitcoin possible and accessible to everyone'}></RetroCaseStudy>
    </div>
  )
};

export default DeFiModule;
