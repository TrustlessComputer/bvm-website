'use client';

import s from './styles.module.scss';
import Image from 'next/image';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';

export default function Heading() {
  return (
    <div className={s.wrap}>

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
      <p className={s.headingText}>
        Welcome to the future of Bitcoin
      </p>

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
        <Link href="/staking"
              className={s.staking}>
          Staking
        </Link>
      </div>
    </div>
  );
}
