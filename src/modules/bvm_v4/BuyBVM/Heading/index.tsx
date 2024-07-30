'use client';

import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Image from 'next/image';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
        <p className={s.heading}>Buy $BVM</p>
      </Fade>
      <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
        <p className={s.desc}>
          The fastest and cheapest way to buy BVM is on Naka, a Bitcoin L2
          designed for DeFi on Bitcoin. You can also buy BVM on other exchanges.
        </p>
      </Fade>
    </div>
  );
}
