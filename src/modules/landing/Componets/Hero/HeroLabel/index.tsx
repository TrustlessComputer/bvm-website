'use client';
import ItemHero from '@/modules/landing/Componets/Hero/ItemHero';
import s from './styles.module.scss';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const DATA_HERO = [
  {
    icon: '/landing/svg/lego_coin.svg',
    title: 'Bitcoin',
  },
  {
    icon: '/landing/svg/lego_optimism.svg',
    title: 'Optimism',
  },
  {
    icon: '/landing/svg/lego_celestia.svg',
    title: 'Celestia',
  },
  {
    icon: '/landing/svg/lego_polygon.svg',
    title: 'Polygon',
  },
  {
    icon: '/landing/uni-v2.svg',
    title: 'Uniswap',
  },
  {
    icon: '/landing/ic-ordinal.svg',
    title: 'Ordinals',
  },
  {
    icon: '/landing/ic-near.svg',
    title: 'Near',
  },
  // {
  //   icon: '/landing/ic-avail.svg',
  //   title: 'Avail',
  // },
  {
    icon: '/icons/filecoin.svg',
    title: 'Filecoin',
  },
  {
    icon: '/icons/syscoin.svg',
    title: 'Syscoin',
  },
  {
    icon: '/icons/bitcoin-stamps.svg',
    title: 'Bitcoin Stamps',
  },
  {
    icon: '/icons/arweave.svg',
    title: 'Arweave',
  },
  {
    icon: '/icons/jackal.svg',
    title: 'Jackal',
  },
];

export default function HeroLabel({ isMobile }: { isMobile?: boolean }) {
  const delay = !isMobile ? 1.5 : 0;

  return (
    <div className={`${s.heroLabel}`}>
      {/* <Fade delayEnter={delay}> */}
      <div className={s.content}>
        <div className={`${s.inner} heroLabel_inner`}>
          <div
            className={`${s.heroLabel_listHero} ${
              isMobile && s.heroLabel_listHero__mobile
            }`}
          >
            <Splide
              aria-label="My Favorite Images"
              extensions={{ AutoScroll }}
              options={{
                type: 'loop',
                drag: 'free',
                focus: 'center',
                pagination: false,
                arrows: false,
                gap: 48,
                perPage: 12,
                perMove: 1,
                autoScroll: {
                  speed: 1,
                },
                breakpoints: {
                  1500: {
                    perPage: 8,
                    gap: 40,
                  },
                  1024: {
                    perPage: 5,
                    gap: 30,
                  },
                  768: {
                    perPage: 4,
                    gap: 20,
                  },
                },
              }}
            >
              {DATA_HERO.map((item, index) => {
                return (
                  <SplideSlide key={index}>
                    <ItemHero delay={delay + index / 10} data={item} />
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        </div>
      </div>
      {/* </Fade> */}
    </div>
  );
}
