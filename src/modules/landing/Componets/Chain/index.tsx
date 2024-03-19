import React from 'react';
import ItemChain from './ItemChain';
import s from './styles.module.scss';

import chain_1 from 'public/landing/compress/app-chain.png';
import chain_2 from 'public/landing/compress/naka-chain.png';
import chain_3 from 'public/landing/images/arcade-chain.jpg';
import chain_4 from 'public/landing/images/chain_4.png';
import chain_5 from 'public/landing/images/chain_5.png';
import chain_6 from 'public/landing/images/chain_6.png';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import HeroLabel from '../Hero/HeroLabel';
import Cursor from '@/modules/landing/Componets/Chain/Cursor';
import HeadingSection from '../HeadingSection';

const DATA_CHAINS = [
  {
    img: chain_1,
    title: 'Alpha Chain',
    subTitle: '',
    stud: 1,
    link: 'https://alpha.wtf',
    data: [
      {
        left: 'Currency',
        right: 'BVM',
        icon: '/landing/svg/lego_icon_flat.svg',
      },
      {
        left: 'Use Case',
        right: 'SocialFi',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin Ordinals',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],

    bgTop: '35CCA6',
    bgBottom: '007659',
  },
  {
    img: chain_2,
    title: 'Naka Chain',
    stud: 2,
    link: 'https://nakachain.xyz/',
    data: [
      {
        left: 'Currency',
        right: 'BTC',
        icon: '/landing/svg/lego_icon_flat.svg',
      },
      {
        left: 'Use Case',
        right: 'DeFi',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin Ordinals',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: 'FFD73B',
    bgBottom: 'A05700',
  },
  {
    img: chain_3,
    title: 'Arcade Chain',
    stud: 3,
    link: 'https://bitcoinarcade.xyz/',
    data: [
      {
        left: 'Currency',
        right: 'GAME',
        icon: '/landing/svg/lego_icon_flat.svg',
      },
      {
        left: 'Use Case',
        right: 'GameFi',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin Ordinals',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'EigenDA',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: '4DBDE0',
    bgBottom: '0074BB',
  },
  {
    img: chain_4,
    title: 'Eternal AI',
    stud: 1,
    link: 'https://eternalai.org/',
    data: [
      {
        left: 'Currency',
        right: 'AI',
        icon: '/landing/svg/lego_icon_flat.svg',
      },
      {
        left: 'Use Case',
        right: 'Crypto x AI',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin Ordinals',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'NearDA',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: 'FF9999',
    bgBottom: 'B74D4D',
  },
  {
    img: chain_5,
    title: 'Swamps',
    stud: 1,
    link: 'https://stampchain.io/',
    data: [
      {
        left: 'Currency',
        right: 'SWP',
        icon: '/landing/svg/lego_icon_flat.svg',
      },
      {
        left: 'Use Case',
        right: 'SRC-20 trading',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin Stamps',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: 'F0B9FE',
    bgBottom: 'A459A6',
  },
  // {
  //   img: chain_6,
  //   title: 'Your chain',
  //   stud: 1,
  //   link: 'https://bitcoinarcade.xyz/',
  //   data: [],
  //   description:
  //     'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with ease.',
  //   isYourChain: true,
  //   bgTop: 'E5E5E5',
  //   bgBottom: 'FFFFFF',
  // },
];

export default function Chain() {
  const router = useRouter();
  const { mobileScreen, tabletScreen } = useWindowSize();
  return (
    <Cursor>
      <div className={s.chain}>
        <div className="container">
          <section className={s.chain_inner}>
            <p className={s.chain_case}>
              <Fade delayEnter={1.8}>THE GROWING BVM ECOSYSTEM</Fade>
            </p>
            <HeadingSection className={s.chain_heading}>
              <Chars delayEnter={2}>
                Say hello to the first <b>modular Bitcoin L2 blockchains</b>{' '}
                powered by BVM.
              </Chars>
            </HeadingSection>
            <Fade delay={0.6} delayEnter={2.2}>
              <HStack
                justify={'center'}
                align={'center'}
                paddingLeft={mobileScreen ? '20px' : ''}
                spacing={['6px', '18px']}
                mt={!mobileScreen ? ['20px'] : ['24px']}
                mb={!mobileScreen ? ['68px'] : ['24px']}
              >
                <Button
                  bgColor={'#FA4E0E'}
                  color={'#fff'}
                  borderRadius={0}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  px={'24px'}
                  py={'10px'}
                  minW={['180px']}
                  height={'48px'}
                  fontWeight={400}
                  fontSize={'16px'}
                  _hover={{
                    bgColor: '#000',
                  }}
                  className={s.chain_btn}
                  onClick={() => {
                    router.push('/blockchains/customize');
                  }}
                >
                  {`Build your Bitcoin L2`}
                </Button>
              </HStack>
            </Fade>
            <div className={s.listChains}>
              {DATA_CHAINS.map((item, index) => {
                return <ItemChain delay={index / 6} key={index} data={item} />;
              })}
            </div>
          </section>
        </div>
      </div>
    </Cursor>
  );
}
