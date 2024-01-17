import React from 'react';
import s from './styles.module.scss';
import lego1 from '@/public/landing/images/lego1.png';
import lego2 from '@/public/landing/images/lego2.png';
import lego3 from '@/public/landing/images/lego3.png';
import lego4 from '@/public/landing/images/lego4.png';
import lego5 from '@/public/landing/images/lego5.png';
import lego6 from '@/public/landing/images/lego6.png';

import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import ContentSection from '@/modules/landing/Componets/ContentSection';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';
import LegoItem from '@/modules/landing/Componets/LegoV2/LegoItem';
import { Button, Flex } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DATA_ECOSYSTEM = [
  {
    img: lego1,
    title: 'Data Availability',
    icons: [10, 2, 6, 7, 8, 9],
  },
  {
    img: lego2,
    title: 'Execution',
    icons: [1, 2, 3, 4, 5],
  },
  {
    img: lego3,
    title: 'Rollup Framework',
    icons: [1, 11],
  },
  {
    img: lego4,
    title: 'Cross-chain bridges',
    icons: [12, 13, 14],
  },
  {
    img: lego5,
    title: 'Settlement',
    icons: [10],
  },
  {
    img: lego6,
    title: 'Applications',
    icons: [15, 16, 17],
  },
];
export default function LegoV2() {
  const router = useRouter();
  return (
    <div className={s.lego}>
      <div className="container">
        <div className={s.lego_heading}>
          <HeadingSection className={s.lego_heading_title}>
            <Chars>
              Customize your modular Bitcoin L2 blockchain with{' '}
              <b>the best-of-breed modules.</b>
            </Chars>
          </HeadingSection>

          <ContentSection className={s.lego_heading_description}>
            <Lines delay={0.2}>
              Choose a rollup module, select a data availability module, and
              then launch to theworld — it’s that easy. You can even install
              dapp modules like Uniswap,Compound, and NFT Marketplace. It’s a
              whole new way to build a Bitcoin L2.
            </Lines>
          </ContentSection>
          <Fade delay={0.4}>
            <Flex justify={'start'}>
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

        <div className={s.lego_wrapper}>
          <div className={s.lego_content}>
            {DATA_ECOSYSTEM.map((item, index) => {
              return <LegoItem data={item} delay={index / 10} />;
            })}
          </div>
          <figure className={s.lego_bg}>
            <Image
              src="/landing/images/bg_lego.png"
              alt="bg-hero"
              width={923}
              height={1000}
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
