import React, { useState } from 'react';
import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import Image from 'next/image';
import Fade from '@interactive/Fade';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';
import Heading from '@/modules/bvm_v4/HeroV4/Heading';
import Loader from '@/modules/builder-landing/Loader';
import {VIDEO_HERO_MAIN} from "@constants/common";

const HeroV4 = (): React.JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={s.inner}>
        <div className={s.right}>
          <Heading />
        </div>
        <Fade delay={0.7} delayEnter={0.7} from={{ y: 40 }} to={{ y: 0 }}>
          <div className={s.left}>
            <a
              href={'#'}
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className={s.video}
            >
              <Image
                src={`/btn-play-4.jpg`}
                width={638}
                height={327}
                alt={'right'}
              />
            </a>

            {/*<div className={s.social}>*/}
            {/*  <a href="https://x.com/BVMnetwork" className={s.social_icon} target={'_blank'}>*/}
            {/*    <ImagePlaceholder src={'/social/x.png'} alt={'x'} height={54} width={54} />*/}
            {/*  </a>*/}
            {/*  <a href="https://t.me/BVMofficialcommunity" className={s.social_icon} target={'_blank'}>*/}
            {/*    <ImagePlaceholder src={'/social/tele.png'} alt={'tele'} height={54} width={54} />*/}
            {/*  </a>*/}
            {/*  <a href="https://coinmarketcap.com/currencies/bvm/" className={s.social_icon} target={'_blank'}>*/}
            {/*    <ImagePlaceholder src={'/social/mex.png'} alt={'mex'} height={54} width={54} />*/}
            {/*  </a>*/}
            {/*  <a href="https://app.uniswap.org/explore/tokens/ethereum/0x069d89974f4edabde69450f9cf5cf7d8cbd2568d"*/}
            {/*     className={s.social_icon} target={'_blank'}>*/}
            {/*    <ImagePlaceholder src={'/social/uniswap.png'} alt={'uniswap'} height={54} width={54} />*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
        </Fade>

      </div>
      <ModalVideo
        channel="custom"
        url={VIDEO_HERO_MAIN}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default HeroV4;
