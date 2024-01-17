import React from 'react';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { Button, Flex } from '@chakra-ui/react';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import ContentSection from '@/modules/landing/Componets/ContentSection';
import Lines from '@/interactive/Lines';
import { useRouter } from 'next/navigation';

export default function Lego() {
  const router = useRouter();
  return (
    <div className={s.lego}>
      <div className="container">
        <div className={s.lego_content}>
          <HeadingSection className={s.lego_content_title}>
            <Chars>
              Customize your Bitcoin L2 blockchain with{' '}
              <b>the best-of-breed building blocks.</b>
            </Chars>
          </HeadingSection>

          <ContentSection className={s.lego_content_description}>
            <Lines delay={0.2}>
              Choose a rollup method, select a data availability layer, and then
              launch to the world — it’s that easy. You can even install default
              dapps like Uniswap, Compound, and DAO. It’s a new way to build
              blockchain.
            </Lines>
          </ContentSection>

          <Fade delay={0.4}>
            <Flex justify={'center'}>
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
                onClick={() => {
                  router.push('/blockchains/customize');
                }}
                _hover={{
                  bgColor: '#000',
                }}
              >
                {`Launch your Bitcoin L2`}
              </Button>
            </Flex>
          </Fade>
        </div>
      </div>
    </div>
  );
}
