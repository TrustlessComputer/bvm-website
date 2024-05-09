'use client';

import { Box } from '@chakra-ui/react';
import s from '../gamefi/styles.module.scss';
import BoxContent from '@/layouts/BoxContent';
import HeroSection from '@/modules/socialfi/HeroSection';
import CategorySection from '@/modules/socialfi/CategorySection';
import FooterSection from '@/modules/socialfi/FooterSection';
import RetroHero from '@components/Retro/RetroHero';
import ListInfo from '@/modules/gamefi/ListInfo';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';
import { RetroCardProps } from '@components/Retro/RetroCard';

const AIFI_LIST_INFO: RetroCardProps [] = [
  {
    title: 'Personalize your social experiences',
    children: 'Connect with others through chats, posts, and community activities',
    src: '/ai/1.png',
  },
  {
    title: 'Integrate games for fun',
    children: 'Easily integrate games or other kinds of engaging activities with 2-second block time and low transaction fees (less than $0.001 per transaction)',
    src: '/ai/2.png',
  },
  {
    title: 'Earn rewards along the way',
    children: 'Profit from referring more people to join, trading, and engaging in games and other activities.',
    src: '/ai/3.png',
  },
];

const SocialFiModule = () => {
  // return (
  //   <Box className={s.container} bgColor={'#f6f6f6'}>
  //     <div className={s.heroSection}>
  //       <HeroSection />
  //     </div>
  //     <div className={s.categorySection}>
  //       <CategorySection />
  //     </div>
  //     <FooterSection />
  //   </Box>
  // );
  return (
    <div className={s.socialfi}>
      <RetroHero label={'Optimized for content creators.'} subTitle={'Bitcoin L2 for SocialFi'} btn1={{
        title: 'Create your own SocialFi L2',
        link: '/blockchains/customize',
      }}
                 btn2={{
                   title: 'Explore Bitcoin Arcade now',
                   label: 'Need an example?',
                   link: 'https://play.bitcoinarcade.xyz/',
                   target: '_blank',
                 }}
                 src={'/ai/ai-hero-2.png'}
      >
        Connect, hang out, have fun, and earn.
      </RetroHero>
      <ListInfo list_info={AIFI_LIST_INFO} heading={'Learn what BVM products can do for you '}/>
      <RetroCaseStudy subTitle={'Case Study'} btn={{
        title: 'Explore Bitcoin Arcade now!',
        link: 'https://play.bitcoinarcade.xyz',
        target: '_blank'
      }} src={'/ai/case-study.png'} brand={'/ai/brand.png'} heading={'Making DeFi on Bitcoin possible and accessible to everyone'}>The first ever Fully On-Chain blockchain on Bitcoin</RetroCaseStudy>
    </div>
  );
};

export default SocialFiModule;
