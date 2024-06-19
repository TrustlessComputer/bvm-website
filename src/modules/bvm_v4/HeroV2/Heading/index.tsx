'use client';

import s from './styles.module.scss';
// import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Image from 'next/image';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <Fade delay={0.2}>
        <div className={s.heading}>
          <Image
            src={'/bvm/bvm-v2.png'}
            width={290}
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
      <p className={s.desc}>
        <Lines delay={0.3}>
          BVM is the scalable infrastructure to make Bitcoin as generalized as
          possible — usable for far more than just a currency. Powered by BVM,
          developers can now build all kinds of infrastructures, like Bitcoin
          L2s and Bitcoin L3s, and decentralized applications on Bitcoin — DeFi,
          GameFi, Payments, AI, and more.
        </Lines>
      </p>
    </div>
  );
}
