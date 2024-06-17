'use client';

import { CDN_URL } from '@/config';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import CardFi from '@/modules/shardv2/components/CardFi';
import s from './styles.module.scss';

const ICON_URL = CDN_URL + '/nbc/icons';

export interface IContent {
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const Contents: Array<IContent> = [
  {
    title: 'The lifeblood of Bitcoin L2s',
    description: 'BVM fuels Bitcoin L2s, facilitating the payment of block production fees for all Bitcoin L2s.',
    image: `/bvm/bvm-section-item-1.png`,
    bgColor: '#007659',
  },
  {
    title: 'Uses for $BVM grow every day',
    description: 'As BVM enables programmability and scalability on Bitcoin, developers can utilize the BVM network to create various applications — DeFi, GameFi, AI, and more.',
    image: `/bvm/bvm-section-item-2.png`,
    bgColor: '#0B5509',
  },
  {
    title: 'Co-own and co-run the network',
    description: 'BVM is the BVM ecosystem’s governance token, allowing BVM holders to participate in key governance votes and shape the future of the BVM ecosystem.',
    image: `/bvm/bvm-section-item-3.png`,
    bgColor: '#A05700',
  },
];

const Section_2 = () => {
  const renderItem = (item: IContent) => {
    return (
      <CardFi key={item.title} {...item} classImage={s.classImage} />
    );
  };

  return (
    <Grid
      gridTemplateColumns={{base: '1fr', lg: '1fr 1fr 1fr'}}
      className={`container ${s.container}`}
      gap={{
        base: '20px',
        lg: '24px',
      }}
      pb={'100px'}
      bgColor={'#fff'}
    >
      {Contents.map(renderItem)}
    </Grid>
  );
};

export default Section_2;
