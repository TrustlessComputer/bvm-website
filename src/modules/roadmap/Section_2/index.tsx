'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Image, Text } from '@chakra-ui/react';

export interface IContent {
  key: string;
  dateStr: string;
  title: string;
  desc: string;
  img: string;
  isShow: boolean;
  href: string;
  isShowViewUpdate: boolean;
  isComingSoon: boolean;
  zIndex: number;
}

const Contents: Array<IContent> = [
  {
    key: 'KEY_1',
    dateStr: 'March 2023',
    title: 'Bitcoin Virtual Machine #0: Add EVM to Bitcoin',
    desc: 'In this release, we shipped a full-featured EVM on Bitcoin. This is the first building block to make Bitcoin usable far more than just a currency because developers can now write smart contracts and build dapps for Bitcoin.',
    img: '/roadmap/roadmap_img1.png',
    href: 'https://twitter.com/punk3700/status/1650524119136628736',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 10,
  },
  {
    key: 'KEY_2',
    dateStr: 'March 2023',
    title: '$GM: Deploy the first smart contract on Bitcoin',
    desc: 'In this release, we shipped the first smart contract on Bitcoin. While the contract is simple, it is a historical milestone because, for the first time, smart contracts are possible on Bitcoin.',
    img: '/roadmap/roadmap_img2.png',
    href: 'https://twitter.com/punk3700/status/1657478010696798208',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 9,
  },
  {
    key: 'KEY_3',
    dateStr: 'May 2023',
    title: 'New Bitcoin DEX: Deploy the first AMM DEX on Bitcoin',
    desc: 'In this release, we shipped a decentralized crypto trading protocol (based on the Uniswap v2 code base) on Bitcoin. This is important because it enables trustless trading between Bitcoin and other cryptocurrencies. It also shows that we can build really complex dapps and protocols on Bitcoin.',
    img: '/roadmap/roadmap_img3.png',
    href: 'https://twitter.com/punk3700/status/1654532883388977158',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 8,
  },
  {
    key: 'KEY_4',
    dateStr: 'June 2023',
    title: 'Bitcoin Virtual Machine #1: Deploy the first L2 on Bitcoin',
    desc: 'In this release, we shipped a low-cost and lightning-fast Bitcoin L2 (based on the Optimism code base). This is an important building block for scaling Bitcoin for mass adoption.',
    img: '/roadmap/roadmap_img4.png',
    href: 'https://twitter.com/punk3700/status/1664211213432291335',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 7,
  },
  {
    key: 'KEY_5',
    dateStr: 'July 2023',
    title: 'CryptoGraffiti: Deploy the first fully onchain game on Bitcoin',
    desc: 'In this release, we shipped a multi-player, real-time, fully-onchain game on Bitcoin. This showed off the low latency and high throughput of Bitcoin Virtual Machine #1.',
    img: '/roadmap/roadmap_img5.png',
    href: 'https://twitter.com/punk3700/status/1684972258379563008',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 6,
  },
  {
    key: 'KEY_6',
    dateStr: 'Sep 2023',
    title: 'L2aaS: Release Bitcoin L2 as a Service',
    desc: 'In this release, we shipped a no-code tool that lets anyone launch a Bitcoin L2 in one click. This is an important building block because it hyperscales Bitcoin with an infinite number of L2s and unlimited throughput.',
    img: '/roadmap/roadmap_img6.png',
    href: 'https://twitter.com/punk3700/status/1699821767781658669',
    isShow: true,
    isShowViewUpdate: true,
    isComingSoon: false,
    zIndex: 5,
  },
  {
    key: 'KEY_7',
    dateStr: 'Q1 2024',
    title: 'BTC option for paying gas fees',
    desc: 'Enable payment of Bitcoin L2 gas fees in BTC, same to how Ethereum Rollup L2 solutions use ETH for transaction gas.',
    img: '/roadmap/roadmap_comming_soon_1.png',
    href: '',
    isShow: true,
    isShowViewUpdate: false,
    isComingSoon: true,
    zIndex: 4,
  },
  {
    key: 'KEY_8',
    dateStr: 'Q1 2024',
    title: 'Bitcoin L2 App Store',
    desc: 'Install dApps like Uniswap, GMX, and Compound as default when creating a new Bitcoin L2.',
    img: '/roadmap/roadmap_comming_soon_2.png',
    href: '',
    isShow: true,
    isShowViewUpdate: false,
    isComingSoon: true,
    zIndex: 3,
  },
  {
    key: 'KEY_9',
    dateStr: 'Q2 2024',
    title: 'Hyperbridges for enhanced connectivity',
    desc: 'Reduce liquidity fragmentation between Bitcoin L2 implementations by facilitating connectivity using Hyperbridges in the Bitcoin Virtual Machine, similar to how the web uses hyperlinks.',
    img: '/roadmap/roadmap_comming_soon_3.png',
    href: '',
    isShow: true,
    isShowViewUpdate: false,
    isComingSoon: true,
    zIndex: 2,
  },
  {
    key: 'KEY_10',
    dateStr: 'Q3 2024',
    title: 'Integration of ZK Rollups into Rollup Frameworks',
    desc: 'Improve the Rollup protocol’s function in the Bitcoin L2 blockchain by including ZK rollups, which are recognized for their security, speed, and transparency, alongside Optimistic rollups.',
    img: '/roadmap/roadmap_comming_soon_2.png',
    href: '',
    isShow: true,
    isShowViewUpdate: false,
    isComingSoon: true,
    zIndex: 2,
  },
  {
    key: 'KEY_11',
    dateStr: 'Q4 2024',
    title: 'Parallel EVM Implementation for Execution Layers',
    desc: 'Offer Bitcoin builders to use Parallel EVM, an upgraded engine capable of processing multiple transactions simultaneously, increasing the already impressive processing speed.',
    img: '/roadmap/roadmap_comming_soon_1.png',
    href: '',
    isShow: true,
    isShowViewUpdate: false,
    isComingSoon: true,
    zIndex: 1,
  },
];

const Section_2 = () => {
  const renderItem = (item: IContent, index: number) => {
    const isEven = index % 2 === 0;
    return (
      <Flex
        key={`${item.key} ${index}`}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justify={{
          sm: 'left',
        }}
        marginTop={{
          sm: '0x',
          lg: item.isShowViewUpdate ? '-40px' : '10px',
        }}
        w="100%"
      >
        {isEven && (
          <Flex
            display={{
              sm: 'none',
              lg: 'flex',
            }}
            flex={1}
            width={'100%'}
          />
        )}
        {isEven && (
          <Flex
            display={{
              sm: 'none',
              lg: 'flex',
            }}
            flex={1}
            maxW={'330px'}
            mx={'10px'}
            height={'auto'}
            align={'center'}
            flexDir={'column'}
            alignSelf={'baseline'}
          >
            <Image src={`${item.img}`} fit={'contain'} />
          </Flex>
        )}
        <Flex
          flex={1}
          align={{
            sm: 'flex-start',
            lg: isEven ? 'flex-start' : 'flex-end',
          }}
          flexDir={'column'}
          justify={'flex-start'}
        >
          <Text
            fontSize={['14px', '16px']}
            lineHeight={'110%'}
            fontWeight={300}
            color={'#000'}
          >
            {item.dateStr}
          </Text>
          <Text
            marginTop={'5px'}
            fontSize={['20px', '24px']}
            lineHeight={'110%'}
            fontWeight={500}
            color={'#000'}
          >
            {item.title}
          </Text>
          <Text
            marginTop={'16px'}
            marginBottom={'16px'}
            fontSize={['15px', '18px']}
            lineHeight={'26px'}
            textAlign={{
              sm: 'left',
              lg: isEven ? 'left' : 'right',
            }}
            fontWeight={400}
            color={'#000'}
          >
            {item.desc}
          </Text>
          {item.isShowViewUpdate && (
            <Flex
              flex={1}
              display={'flex'}
              align={'flex-start'}
              flexDir={'row'}
              color={'#FA4E0E'}
              fontWeight={400}
              fontSize={'16px'}
              _hover={{
                opacity: 0.8,
                cursor: 'pointer',
              }}
              onClick={() => {
                window.open(item.href, '_blank');
              }}
            >
              {`View update`}
              <ChevronRightIcon
                width={'20px'}
                height={'20px'}
                ml={'4px'}
                mt={'2px'}
              />
            </Flex>
          )}
        </Flex>

        {!isEven && (
          <Flex
            display={{
              sm: 'none',
              lg: 'flex',
            }}
            flex={1}
            mx={'10px'}
            maxW={'330px'}
            height={'auto'}
            align={'center'}
            flexDir={'column'}
            alignSelf={'baseline'}
          >
            <Image src={`${item.img}`} fit={'contain'} />
          </Flex>
        )}
        {!isEven && (
          <Flex
            display={{
              sm: 'none',
              lg: 'flex',
            }}
            width={'100%'}
            flex={1}
          />
        )}
      </Flex>
    );
  };

  return (
    <Flex
      bgColor={'#F3F1E8'}
      display={'flex'}
      flexDirection={'column'}
      align={'center'}
      gap={{
        sm: '40px',
      }}
    >
      {Contents.map(renderItem)}
    </Flex>
  );
};

export default Section_2;
