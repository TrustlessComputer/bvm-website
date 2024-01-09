import React from 'react';
import ItemChain from './ItemChain';
import s from './styles.module.scss';

import chain_1 from 'public/landing/images/chain_1.png';
import chain_2 from 'public/landing/images/chain_2.png';
import chain_3 from 'public/landing/images/chain_3.png';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { Button, HStack } from '@chakra-ui/react';
import { DEVELOPERS_DOC_URL } from '@/config';
import { ChevronRightIcon } from '@chakra-ui/icons';

const DATA_CHAINS = [
  {
    img: chain_1,
    title: 'Alpha Chain',
    stud: 1,
    data: [
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
    stud: 3,
    data: [
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
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: 'FFD73B',
    bgBottom: 'A05700',
  },
  {
    img: chain_3,
    title: 'AI Chain',
    stud: 2,
    data: [
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
        right: 'Celestia',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: '98DCF5',
    bgBottom: '0074BB',
  },
];

function Chain() {
  return (
    <div className={s.chain}>
      <div className="container">
        <h2 className={s.chain_heading}>
          <Chars>
            Say hello to the first <b>Bitcoin L2 blockchains.</b>
          </Chars>
        </h2>
        <HStack
          align="center"
          justify={'center'}
          spacing={['6px', '18px']}
          mt={['20px']}
          mb={['60px']}
        >
          <Fade delay={0.6}>
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
              fontSize={'20px'}
              onClick={() => {
                router.push('/blockchains/customize');
              }}
            >
              {`Build your Bitcoin L2`}
            </Button>
          </Fade>
        </HStack>
        <div className={s.listChains}>
          {DATA_CHAINS.map((item, index) => {
            return <ItemChain delay={index / 6} key={item.title} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Chain;
