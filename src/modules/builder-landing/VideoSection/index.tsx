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
            <Chars classNames={s.title}>
              BVM is the first modular metaprotocol that lets you launch your own Bitcoin L2 in just a few clicks!
              This is your chance to take the lead and shape the future of Bitcoin!
            </Chars>
            {/*<Fade>*/}
            {/*  <Button*/}
            {/*    bgColor={'#EF601B'}*/}
            {/*    color={'#fff'}*/}
            {/*    borderRadius={0}*/}
            {/*    display={'flex'}*/}
            {/*    justifyContent={'center'}*/}
            {/*    alignItems={'center'}*/}
            {/*    px={'41px'}*/}
            {/*    py={'14px'}*/}
            {/*    w={['172px']}*/}
            {/*    h={'48px'}*/}
            {/*    fontWeight={400}*/}
            {/*    marginTop={'32px'}*/}
            {/*    fontSize={'16px'}*/}
            {/*    onClick={() => {*/}
            {/*      router.push('/blockchains/customize');*/}
            {/*    }}*/}
            {/*    _hover={{*/}
            {/*      opacity: 0.8,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Launch now*/}
            {/*  </Button>*/}
            {/*</Fade>*/}
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
        channel='custom'
        url={'/public-sale/public_sale_video_2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
