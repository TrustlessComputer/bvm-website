'use client';

import { CDN_URL } from '@/config';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import CardFi from '@/modules/shardv2/components/CardFi';

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
    image: `/images/bvm_image1.png`,
    bgColor: '#007659',
  },
  {
    title: 'Uses for $BVM grow every day',
    description: 'As BVM enables programmability and scalability on Bitcoin, developers can utilize the BVM network to create various applications — DeFi, GameFi, AI, and more.',
    image: `/images/bvm_image2.png`,
    bgColor: '#0B5509',
  },
  {
    title: 'Co-own and co-run the network',
    // desc: 'BVM is the BVM ecosystem’s governance token, allowing BVM holders to participate in key governance votes and shape the future of the BVM ecosystem.',
    description: 'Stake BVM to mine SHARD, the BVM ecosystem’s governance token, allowing BVM holders to participate in key governance votes and shape the future of the BVM ecosystem.',
    image: `/images/bvm_image3.png`,
    bgColor: '#A05700',
  },
];

const Section_2 = () => {
  const renderItem = (item: IContent) => {
    return (
      <CardFi key={item.title} {...item} />
      // <Box
      //   alignItems={'center'}
      //   key={item.title}
      //   display={'flex'}
      //   flexDirection={'column'}
      //   flex={1}
      //   p={{
      //     base: '10px',
      //     lg: '20px',
      //   }}
      //   bgColor={'white'}
      // >
      //   <Flex
      //     alignItems={'center'}
      //     display={'flex'}
      //     flexDirection={'column'}
      //     flex={1}
      //     minH={{
      //       base: '300px',
      //       max: '600px',
      //     }}
      //     gap={'20px'}
      //     bgColor={item.bgColor}
      //   >
      //     <Image
      //       src={`${item.img}`}
      //       fit={'cover'}
      //       minH={{
      //         base: '350px',
      //         lg: '440px',
      //       }}
      //     />
      //
      //     <Flex
      //       direction={'column'}
      //       align={'center'}
      //       justify={'center'}
      //       gap={'20px'}
      //       px={{
      //         base: '10px',
      //         lg: '24px',
      //       }}
      //     >
      //       <Text
      //         fontSize={['18px', '24px']}
      //         lineHeight={'26.40px'}
      //         fontWeight={500}
      //         textAlign={'center'}
      //         color={'#fff'}
      //       >
      //         {item.title}
      //       </Text>
      //       <Text
      //         fontSize={['15px', '18px']}
      //         lineHeight={'26px'}
      //         textAlign={'center'}
      //         fontWeight={400}
      //         color={'#fff'}
      //       >
      //         {item.desc}
      //       </Text>
      //       <Box height={'20px'}></Box>
      //     </Flex>
      //   </Flex>
      // </Box>
    );
  };

  return (
    <Grid
      // flexDirection={{
      //   base: 'column',
      //   lg: 'row',
      // }}
      gridTemplateColumns={{base: '1fr', lg: '1fr 1fr 1fr'}}
      className={'container'}
      // alignSelf={'center'}
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
