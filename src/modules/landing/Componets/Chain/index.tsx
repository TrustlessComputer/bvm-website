import React from 'react';
import ItemChain from './ItemChain';
import s from './styles.module.scss';

import chain_1 from 'public/landing/compress/app-chain.png';
import chain_2 from 'public/landing/compress/naka-chain.png';
import chain_3 from 'public/landing/images/arcade-chain.jpg';
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
        right: 'Bitcoin',
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
        right: 'Bitcoin',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Celestia',
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
        right: 'AI',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'EigeDA',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: '4DBDE0',
    bgBottom: '0074BB',
  },
];

export default function Chain() {
  const router = useRouter();
  const { mobileScreen, tabletScreen } = useWindowSize();
  return (
    <Cursor>
      <div className={s.chain}>
        <div className="container">
          {(mobileScreen || tabletScreen) && (
            <section className={s.chain_label}>
              <HeroLabel />
            </section>
          )}
          <section className={s.chain_inner}>
            <p className={s.chain_case}>Case studies</p>
            <HeadingSection className={s.chain_heading}>
              <Chars>
                Say hello to the first EVM-compatible <b>Bitcoin L2 blockchains powered by BVM.</b>
              </Chars>
            </HeadingSection>
            <Fade delay={0.6}>
              <HStack
                justify={'center'}
                align={'center'}
                paddingLeft={mobileScreen ? '20px' : ''}
                spacing={['6px', '18px']}
                mt={!mobileScreen ? ['20px'] : ['24px']}
                mb={!mobileScreen ? ['60px'] : ['24px']}
              >
                <Button
                  bgColor={'#EF601B'}
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
