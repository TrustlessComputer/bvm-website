'use client';

import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export interface IContent {
  key: string;
  dateStr: string;
  title: string;
  desc: string;
  thumbImgPath: string;
  iconPath: string;
  isShow: boolean;
  twitterLink?: string;
  href: string;
  linkShortName: string;
  linkIconPath: string;
  isComingSoon: boolean;
  tagsList: string[];
  appName: string;
  zIndex?: number;
}

const Contents: Array<IContent> = [
  {
    key: 'KEY_1',
    dateStr: 'Jan 17',
    thumbImgPath: '/upcoming/naka_thumb_img.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '@naka_chain',
    title: 'Naka',
    desc: 'Naka is a low-cost and lightning-fast Bitcoin L2 blockchain designed for DeFi apps on Bitcoin.',
    twitterLink: 'https://twitter.com/naka_chain',
    linkShortName: 'nakachain.xyz',
    href: 'https://nakachain.xyz',
    linkIconPath: '/upcoming/link_ic.png',
    tagsList: ['Bitcoin', 'Celestia', 'Optimistic', 'Sovereign'],
    isShow: true,
    isComingSoon: false,
  },
  {
    key: 'KEY_2',
    dateStr: 'Jan 23',
    thumbImgPath: '/upcoming/bitcoin_arcade_thumb_img.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '@GamingOnBitcoin',
    title: 'Bitcoin Arcade',
    desc: 'Bitcoin Arcade is the first ever fully onchain gaming Bitcoin L2 blockchain.',
    twitterLink: 'https://twitter.com/GamingOnBitcoin',
    href: 'https://bitcoinarcade.xyz',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'bitcoinarcade.xyz',
    tagsList: ['Bitcoin', 'Eigenda', 'Optimistic', 'Sovereign'],
    isShow: true,
    isComingSoon: false,
  },
  {
    key: 'KEY_3',
    dateStr: 'Jan 30',
    thumbImgPath: '/upcoming/eternal_ai_thumb_img.png',
    iconPath: '',
    appName: '',
    title: 'Eternal AI',
    desc: 'Eternal AI is a Bitcoin L2 blockchain designed for AI.',
    href: 'https://eternalai.org',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'eternalai.org',
    tagsList: ['Bitcoin', 'Nearda', 'Optimistic', 'Sovereign'],
    isShow: true,
    isComingSoon: false,
  },
  {
    key: 'KEY_4',
    dateStr: 'Feb 6',
    thumbImgPath: '/upcoming/math_thumb_img_1.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '@NewBitcoinCity',
    title: 'Math',
    desc: 'Math is a Bitcoin L2 blockchain designed for the metaverse with fully on-chain, ever-evolving virtual worlds.',
    href: 'http://mathchain.xyz',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'mathchain.xyz',
    tagsList: ['Bitcoin', 'Ordinals', 'Optimistic', 'Sovereign'],
    isShow: true,
    isComingSoon: false,
  },
];

const Section_2 = () => {
  const router = useRouter();

  const renderItem = (item: IContent, index: number) => {
    return (
      <Flex
        key={`${item.key} ${index}`}
        align={'left'}
        flexDir={'column'}
        w={'100%'}
        gap={['20px', '12px']}
      >
        {/* Date */}
        <Text
          fontSize={['14px', '16px']}
          lineHeight={'22px'}
          fontWeight={500}
          opacity={0.7}
          color={'#353A4D'}
          textTransform={'uppercase'}
        >
          {item.dateStr}
        </Text>

        {/* Content */}
        <Flex
          flexDir={{
            base: 'column',
            '2xl': 'row',
          }}
          gap={['30px', '36px']}
        >
          {/* ThumbImg */}
          <Image
            src={`${item.thumbImgPath}`}
            fit={'cover'}
            maxW={'322px'}
            maxH={'244px'}
          />

          {/* Right - Content */}
          <Flex
            flexDir={'column'}
            justify={'center'}
            py={['10px', '12px']}
            mr={{
              base: 0,
              '2xl': '160px',
            }}
            gap={['30px']}
          >
            <Flex flexDir={'row'} align={'center'} gap={['12px', '16px']}>
              {item.twitterLink && (
                <Flex flexDir={'row'} align={'center'} gap={'8px'}>
                  <Image src={`${item.iconPath}`} fit={'contain'} />
                  <Link
                    target="_blank"
                    fontSize={['13px', '14px']}
                    lineHeight={'19px'}
                    fontWeight={400}
                    color={'#000'}
                    href={item.twitterLink}
                  >
                    {item.appName}
                  </Link>
                </Flex>
              )}

              <Flex flexDir={'row'} align={'center'} gap={'8px'}>
                <Image src={`${item.linkIconPath}`} fit={'contain'} />
                <Link
                  target="_blank"
                  fontSize={['13px', '14px']}
                  lineHeight={'19px'}
                  fontWeight={400}
                  color={'#000'}
                  href={item.href}
                >
                  {item.linkShortName}
                </Link>
              </Flex>
            </Flex>

            <Flex flexDir={'column'} align={'left'} gap={'8px'}>
              <Text
                fontSize={['20px', '24px']}
                lineHeight={['28px', '33px']}
                fontWeight={400}
                color={'#000'}
              >
                {item.title}
              </Text>

              <Text
                fontSize={['16px', '18px']}
                lineHeight={['20px', '26px']}
                fontWeight={400}
                color={'#000'}
                opacity={0.7}
              >
                {item.desc}
              </Text>
            </Flex>

            <Flex flexDir={'row'} align={'center'} gap={['4px', '4px']}>
              {item.tagsList.map((item, index) => {
                return (
                  <Box
                    key={`${item} ${index}`}
                    p={'8px'}
                    bgColor={'#F6F6F6'}
                    borderRadius={'100px'}
                    color={'#000'}
                    fontSize={['11px', '12px']}
                    lineHeight={['15px', '16px']}
                    fontWeight={400}
                    textTransform={'uppercase'}
                  >
                    {item}
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      display={'flex'}
      flexDir={{
        base: 'column',
        '2xl': 'row',
      }}
      gap={{
        base: '50px',
        '2xl': '0px',
      }}
    >
      <Flex
        display={{
          base: 'none',
          '2xl': 'flex',
        }}
        flex={{
          base: 1,
          '2xl': 2.5,
        }}
        flexDirection={'column'}
        align={'center'}
        gap={{
          sm: '40px',
        }}
        mr={{
          base: '0px',
          '2xl': '30px',
        }}
        borderRightWidth={1}
        borderRightColor={'#ECECEC'}
      >
        {Contents.map(renderItem)}
      </Flex>

      <Flex
        display={'flex'}
        flex={1}
        flexDirection={'column'}
        gap={['20px', '24px']}
      >
        {/* Contact Section */}
        <Flex
          flexDir={'column'}
          align={'left'}
          // gap={'24px'}
          p={['18px', '20px']}
          bgColor={'#F8F8F8'}
          borderColor={'#ECECEC'}
          borderWidth={1}
        >
          <Text
            fontSize={['20px', '24px']}
            lineHeight={['30px', '33px']}
            fontWeight={400}
            color={'#000'}
          >
            Contact the team
          </Text>

          <Box h={'8px'}></Box>
          <Text
            fontSize={['16px', '18px']}
            lineHeight={['22px', '26px']}
            fontWeight={400}
            color={'#000'}
          >
            If you want your Bitcoin L2 launch to be listed here, contact us.
          </Text>
          <Box h={'24px'}></Box>
          <Button
            bgColor={'#000'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'16px'}
            w={['217px']}
            h={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            onClick={() => {
              //TO DO
              window.open('https://twitter.com/bvmnetwork', '_blank');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Contact
          </Button>
        </Flex>

        {/* Launch your bitcoin Section */}

        <Flex
          flexDir={'column'}
          align={'left'}
          // gap={'24px'}
          p={['18px', '20px']}
          bgColor={'#FFF7F2'}
          borderColor={'#FFD3B3'}
          borderWidth={1}
        >
          <Text
            fontSize={['20px', '24px']}
            lineHeight={['30px', '33px']}
            fontWeight={400}
            color={'#000'}
          >
            Launch your Bitcoin L2
          </Text>
          <Box h={'8px'}></Box>
          <Text
            fontSize={['16px', '18px']}
            lineHeight={['22px', '26px']}
            fontWeight={400}
            color={'#000'}
          >
            It’s easy to customize and launch your own Bitcoin L2
            blockchain—just a few clicks.
          </Text>
          <Box h={'24px'}></Box>
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'16px'}
            w={['217px']}
            h={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            onClick={() => {
              router.push('/blockchains/customize');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Launch your Bitcoin L2
          </Button>
        </Flex>
      </Flex>

      <Flex
        display={{
          base: 'flex',
          '2xl': 'none',
        }}
        flex={{
          base: 1,
          '2xl': 2.5,
        }}
        flexDirection={'column'}
        align={'center'}
        gap={{
          sm: '40px',
        }}
        mr={{
          base: '0px',
          '2xl': '30px',
        }}
        borderRightWidth={{
          base: 0,
          '2xl': 1,
        }}
        borderRightColor={'#ECECEC'}
      >
        {Contents.map(renderItem)}
      </Flex>
    </Flex>
  );
};

export default Section_2;
