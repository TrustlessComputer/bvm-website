'use client';

import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Image from 'next/image';
import ImagePlaceholder from '@components/ImagePlaceholder';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <Fade delay={0.2}>
        <div className={s.heading}>
          <Image
            src={'/bvm/bvm-v2.png'}
            width={210}
            height={131}
            alt="heading"
            sizes={'100vw'}
            quality={100}
          />
        </div>
      </Fade>
      <p className={s.headingText}>
        <Lines delay={0.3}>Welcome to the future of Bitcoin</Lines>
      </p>

      <div className={s.social}>
        <a href="" className={s.social_icon}>
          <ImagePlaceholder src={'/social/x.png'} alt={'x'} height={54} width={54} />
        </a>
        <a href="" className={s.social_icon}>
          <ImagePlaceholder src={'/social/tele.png'} alt={'tele'} height={54} width={54}/>
        </a>
        <a href="" className={s.social_icon}>
          <ImagePlaceholder src={'/social/mex.png'} alt={'mex'} height={54} width={54}/>
        </a>
        <a href="" className={s.social_icon}>
          <ImagePlaceholder src={'/social/uniswap.png'} alt={'uniswap'} height={54} width={54}/>
        </a>
      </div>
    </div>
  );
}