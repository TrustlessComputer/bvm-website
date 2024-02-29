// 'use client';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import s from '../styles.module.scss';
import Link from 'next/link';
import { BUILD_ON_BITCOIN_URL } from '@/constants/route-path';
import Image from 'next/image';
import { CDN_URL_IMAGES } from '@/config';
import Airdrop from '@/modules/builder-landing/Airdrop';
import Fade from '@/interactive/Fade';

const TopSection = () => {
  return (
    <div className={s.top_section}>
      <Flex
        w={'100%'}
        flexDir={'column'}
        bgColor={'transparent'}
        align={'center'}
      >
        <Fade from={{ y: 10 }} to={{ y: 0 }}>
          <Text
            fontSize={['14px', '16x']}
            lineHeight={['20px', '36px']}
            fontWeight={500}
            textTransform={'uppercase'}
            className={s.gradientText}
            mb="8px"
          >
            Feb 23, 2024 - May 23, 2024
          </Text>
        </Fade>
        <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.2}>
          <Text
            fontSize={['40px', '56px']}
            lineHeight={'110%'}
            fontWeight={500}
            color={'#000'}
            textAlign="center"
            mb="32px"
          >
            BVM AIRDROP SEASON 2
          </Text>
        </Fade>
        <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.4}>
          <Button
            bgColor={'#FA4E0E'}
            h="48px"
            px="28px"
            borderRadius={0}
            _hover={{ bgColor: '#e64e0e' }}
          >
            <Link href={BUILD_ON_BITCOIN_URL}>Build Your Bitcoin L2</Link>
          </Button>
        </Fade>
      </Flex>
      <Airdrop />
    </div>
  );
};

export default TopSection;
