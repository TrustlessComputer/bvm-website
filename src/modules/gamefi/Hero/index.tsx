'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { BUY_TC_URL } from '@/config';

import s from './style.module.scss';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className={s.hero}>
      <div className={'container'}>
        <div>
          <Flex
            flexDir={'row'}
            flex={1}
            justifyContent={'space-between'}
            gap={['18px']}
            paddingTop={'150px'}
            paddingBottom={'150px'}
          >
            <div>
              <Text
                fontSize={['20px']}
                lineHeight={'24px'}
                fontWeight={400}
                color={'#000'}
              >
                GameFi
              </Text>
              <Text
                fontSize={['16px', '40px']}
                lineHeight={'48px'}
                fontWeight={500}
                color={'#000'}
                marginTop={'8px'}
              >
                Designed for Game builders
              </Text>
              <Text fontSize={['18px', '20px']} fontWeight={400} color={'#000'} margin={'24px 0'}>
                Shaping the Future of Gaming on Bitcoin
              </Text>
              <Button
                marginTop={'5px'}
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
                gap={['8px']}
                onClick={() => {
                  window.open(BUY_TC_URL, '_blank');
                }}
                _hover={{
                  opacity: 0.8,
                }}
              >
                {`Create your own GameFi L2`}
              </Button>
              <Link href="#" className={s.linkHero}>
                <p>Need an example? Explore Bitcoin Arcade now! </p>
                <Image
                  src={`/gamefi/arrow-right.svg`}
                  className={s.icon}
                />
              </Link>
            </div>
            <Image
              alignSelf={'center'}
              maxWidth="780px"
              src={`/gamefi/compress/gamefi.png`}
              w={'100%'}
              h="auto"
            />
          </Flex>
        </div>
      </div>
    </div>
  );
};
export default Hero;
