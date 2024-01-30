'use client';

import { Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import s from '../styles.module.scss';
import StepsAirdrop from '../StepAirdrop';

export enum ClaimAirdropType {
  GM,
  ALPHA,
  PERCEPTRONS,
  GENERATIVE,
}

export interface IContent {
  key: string;
  type: ClaimAirdropType;
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
  appName: string;
  zIndex?: number;
}

const Contents: Array<IContent> = [
  {
    key: 'KEY_1',
    type: ClaimAirdropType.GM,
    dateStr: '',
    thumbImgPath: '/airdrop/gm.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '',
    title: 'GM holders',
    desc: 'Proportionally based on GM balance - min holding: 0.01 $GM',
    twitterLink: '',
    linkShortName: 'newbitcoincity.com/souls',
    href: 'https://newbitcoincity.com/souls',
    linkIconPath: '/upcoming/link_ic.png',
    isShow: true,
  },
  {
    key: 'KEY_2',
    type: ClaimAirdropType.ALPHA,
    dateStr: '',
    thumbImgPath: '/airdrop/alpha.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '@AlphaOnBitcoin',
    title: 'Alpha users',
    desc: 'Proportionally based on Airdrop Points - min Airdrop Points: 50,000',
    twitterLink: 'https://twitter.com/AlphaOnBitcoin',
    href: 'https://alpha.wtf',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'alpha.wtf',
    isShow: true,
  },
  {
    key: 'KEY_3',
    type: ClaimAirdropType.PERCEPTRONS,
    dateStr: '',
    thumbImgPath: '/airdrop/percep.png',
    iconPath: '',
    appName: '',
    title: 'Perceptrons holders',
    desc: 'Proportional to the number of Perceptrons you hold.',
    href: 'https://generative.xyz/ai',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'generative.xyz/ai',
    isShow: true,
  },
  {
    key: 'KEY_4',
    type: ClaimAirdropType.GENERATIVE,
    dateStr: '',
    thumbImgPath: '/airdrop/generative.png',
    iconPath: '/upcoming/twitter_ic.png',
    appName: '',
    title: 'Generative users',
    desc: 'Proportional to key holding.',
    href: 'https://generative.xyz',
    linkIconPath: '/upcoming/link_ic.png',
    linkShortName: 'generative.xyz',
    isShow: true,
  },
];

const Section_2 = () => {
  const onClickClaim = (type: ClaimAirdropType) => {
    switch (type) {
      case ClaimAirdropType.GM:
        break;
      case ClaimAirdropType.ALPHA:
        break;
      case ClaimAirdropType.PERCEPTRONS:
        break;
      case ClaimAirdropType.GENERATIVE:
        break;
      default:
        break;
    }
  };

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
            gap={['24px']}
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

            <Flex flexDir={'column'} align={'left'} gap={'8px'}>
              <Button
                className={s.btnClaim}
                w="fit-content"
                minW={{
                  base: '322px',
                }}
                onClick={() => onClickClaim(item.type)}
              >
                Claim
              </Button>
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
        maxW={'920px'}
        borderRightWidth={1}
        borderRightColor={'#ECECEC'}
      >
        <StepsAirdrop setIndex={() => {}} />
        {/* {Contents.map(renderItem)} */}
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
        {/* {Contents.map(renderItem)} */}
        <StepsAirdrop setIndex={() => {}} />
      </Flex>
    </Flex>
  );
};

export default Section_2;
