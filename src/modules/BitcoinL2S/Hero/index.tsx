import s from './style.module.scss';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  return (
    <div className={`${s.wrapper}`}>
      <div className={'container'} style={{ height: '100%' }}>
        <div
          className={`${s.wrapperHero}`}
          style={{ backgroundImage: 'url(/bitcoin-l2s/bghero.png)' }}
        >
          <div className={`${s.wrapperHeroContent}`}>
            <HeadingSection className={s.heading}>
              <Chars delay={0.2}>Bitcoin L2 blockchains</Chars>
            </HeadingSection>
            <Fade delay={1.0}>
              <p className={s.description}>
                The main goal of Bitcoin L2 blockchains is to turbocharge
                Bitcoin transactions (reduce transaction latency) without
                sacrificing decentralization or security.
              </p>
            </Fade>
            <Fade delay={1.2}>
              <Button
                bgColor={'#FA4E0E'}
                color={'#fff'}
                borderRadius={0}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'28px'}
                py={'16px'}
                minW={['180px']}
                // width={mobileScreen ? '100%' : ''}
                height={'48px'}
                margin={'0 auto'}
                fontWeight={400}
                fontSize={'16px'}
                _hover={{
                  bgColor: '#e5601b',
                }}
                onClick={() => {
                  router.push('/rollups/customize');
                }}
              >
                Build your Bitcoin L2
              </Button>
            </Fade>
            <Fade delay={1.4}>
              <div className={s.cover}>
                <img src="/bitcoin-l2s/Cover.png" alt="Cover" />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
