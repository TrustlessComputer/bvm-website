'use client';

import s from './styles.module.scss'
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
// import { Box, Container, Stack, Text } from '@chakra-ui/react';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  // return (
  //   <Box bgColor={'black'} id="footer">
  //     <Container
  //       as={Stack}
  //       maxW={'2xl'}
  //       py={4}
  //       direction={{ base: 'column', md: 'row' }}
  //       spacing={4}
  //       justify={{ base: 'center', md: 'center' }}
  //       align={{ base: 'center', md: 'center' }}
  //     >
  //       {/* <Text>OPEN-SOURCE SOFTWARE. MADE WITH ❤️ ON BITCOIN.</Text> */}
  //       {/* <Stack direction={'row'} spacing={6}></Stack> */}
  //     </Container>
  //   </Box>
  // );

  return (
    <div className="container">
      <div className={`${s.footer}`} style={{ backgroundImage: 'url(/footer/bgFooter.png)' }}>
        <div className={s.main}>
          <div className={s.mainLeft}>
            <p className={s.mainContent}>Experience Bitcoin like never before.</p>
            <div className={s.wrapperBtns}>
              <Link href={''} className={s.mainBtn}>Use Bitcoin</Link>
              <Link href={''} className={s.normalBtn}>Build on Bitcoin</Link>
            </div>
          </div>
          <div>
            <a href={'#'} onClick={() => setOpen(true)}>
              <Image src={`/public-sale/btn-play-3.png`} width={168} height={90}
                     alt={'right'} />
              What is BVM? </a>
            <ModalVideo
              channel="custom"
              url={'/public-sale/public_sale_video_2.mp4'}
              isOpen={isOpen}
              onClose={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>

  )
};

export default Footer;
