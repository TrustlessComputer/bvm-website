'use client';

import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Image from 'next/image';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <Fade delay={0.2}>
        <div className={s.heading}>
          <Image
            src={'/tge/heading.png'}
            width={340}
            height={111}
            alt="heading"
          />
        </div>
      </Fade>
      <p className={s.desc}>
        <Lines delay={0.3}>
          BVM is the native cryptocurrency of the BVM ecosystem that binds all
          Bitcoin L2 blockchains together.
        </Lines>
      </p>
    </div>
  );
}
