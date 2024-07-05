import React, { useState } from 'react';
import s from './styles.module.scss'
import ModalVideo from 'react-modal-video';
import Image from 'next/image';
import Fade from '@interactive/Fade';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';
import Heading from '@/modules/bvm_v4/HeroV4/Heading';
import Loader from '@/modules/builder-landing/Loader';

const HeroV4 = (): React.JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={s.inner}>
        <div className={s.left}>
          <Fade delay={0.7} delayEnter={0.7} from={{ y: 40 }} to={{ y: 0 }}>
            <a
              href={'#'}
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className={s.footer_video}
            >
              <Image
                src={`/btn-play-4.jpg`}
                width={638}
                height={327}
                alt={'right'}
              />
            </a>
          </Fade>

          <div className={s.social}>
            <a href="https://x.com/BVMnetwork" className={s.social_icon} target={'_blank'}>
              <ImagePlaceholder src={'/social/x.png'} alt={'x'} height={54} width={54} />
            </a>
            <a href="https://t.me/BVMofficialcommunity" className={s.social_icon} target={'_blank'}>
              <ImagePlaceholder src={'/social/tele.png'} alt={'tele'} height={54} width={54} />
            </a>
            <a href="https://coinmarketcap.com/currencies/bvm/" className={s.social_icon} target={'_blank'}>
              <ImagePlaceholder src={'/social/mex.png'} alt={'mex'} height={54} width={54} />
            </a>
            <a href="https://app.uniswap.org/explore/tokens/ethereum/0x069d89974f4edabde69450f9cf5cf7d8cbd2568d"
               className={s.social_icon} target={'_blank'}>
              <ImagePlaceholder src={'/social/uniswap.png'} alt={'uniswap'} height={54} width={54} />
            </a>
          </div>
        </div>
        <div className={s.right}>
          <Heading />
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

export default HeroV4;
