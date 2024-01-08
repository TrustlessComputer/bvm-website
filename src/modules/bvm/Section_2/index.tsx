'use client';

import { CDN_APP_ICON_URL, CDN_URL } from '@/config';
import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

const ICON_URL = CDN_URL + '/nbc/icons';

export interface IContent {
  title: string;
  desc: string;
  img: string;
}

const Contents: Array<IContent> = [
  {
    title: 'The lifeblood of Bitcoin dapps',
    desc: 'BVM fuels Bitcoin dapps, facilitating the payment of transaction fees for all dapp activities on Bitcoin.',
    img: `${ICON_URL}/ic_token_heart.svg`,
  },
  {
    title: 'Uses for BVM grow every day',
    desc: 'As Bitcoin Virtual Machine enables programmability on Bitcoin, developers have the free to utilize BVM in numerous ways, such as DeFi, GameFi, DEX, DAO, and more.',
    img: `${ICON_URL}/ic_token_chart.svg`,
  },
  {
    title: 'Scale Bitcoin and earn BVM',
    desc: 'Bitcoin Virtual Machines aid in scaling Bitcoin with high throughput and low latency, while also enabling new utilities beyond simple money transfers. In return, they receive the transaction fees collected in BVM.',
    img: `${ICON_URL}/ic_token_blockchain.svg`,
  },
];

const Section_2 = () => {
  const renderItem = (item: IContent) => {
    return (
      <Flex
        key={item.title}
        flexDir={'column'}
        alignItems={'flex-start'}
        flex={1}
        bgColor={'#fff'}
        padding={'20px'}
        minH={['300px']}
        borderRadius={'8px'}
      >
        <Image src={`${item.img}`} />
        <Box h={['20px']}></Box>
        <Text fontSize={['24px']} fontWeight={400} color={'#000'}>
          {item.title}
        </Text>
        <Box h={['16px']}></Box>
        <Text fontSize={['16px']} fontWeight={400} color={'#000'}>
          {item.desc}
        </Text>
      </Flex>
    );
  };

  return (
    <Box bgColor={'#F3F1E8'} display={'flex'} flexDirection={'column'}>
      <Flex
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        alignSelf={'center'}
        gap={['30px']}
      >
        {Contents.map(renderItem)}
      </Flex>
    </Box>
  );
};

export default Section_2;
