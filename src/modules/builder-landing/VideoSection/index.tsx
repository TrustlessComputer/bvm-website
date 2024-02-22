import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';

export default function BuilderVideo() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={`${s.builderVideo} `}>
      <div className={'container'}>
        <div className={`${s.builderWrapper} `}>
          <div className={`${s.wrapperContent}`}>
            <div style={{ lineHeight: '62px' }}>
              <Chars classNames={s.title}>
                Bitcoin L2 chains are thriving. This is your chance to
                {''} <span>take the lead</span> and <span>shape</span> the
                future of Bitcoin!
              </Chars>
            </div>
            <Fade>
              <Button
                bgColor={'#EF601B'}
                color={'#fff'}
                borderRadius={0}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'41px'}
                py={'14px'}
                w={['172px']}
                h={'48px'}
                fontWeight={400}
                marginTop={'24px'}
                fontSize={'16px'}
                onClick={() => {
                  router.push('/blockchains/customize');
                }}
                _hover={{
                  opacity: 0.8,
                }}
              >
                Launch now
              </Button>
            </Fade>
          </div>
          <Fade delay={0.2} className={`${s.wrapperVideo}`}>
            <a href={'#'} onClick={() => setOpen(true)}>
              <img
                src={`/public-sale/btn-play-5.png`}
                width={657}
                alt={'right'}
              />
            </a>
          </Fade>
        </div>
      </div>
      <ModalVideo
        channel="custom"
        url={'/public-sale/public_sale_video_2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
