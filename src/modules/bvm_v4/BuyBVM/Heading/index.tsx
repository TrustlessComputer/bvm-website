'use client';

import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Image from 'next/image';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <p className={s.heading}>
        <Lines delay={0.3}>
          Buy $BVM
        </Lines>
      </p>
      <p className={s.desc}>
        <Lines delay={0.3}>
          The fastest and cheapest way to buy BVM is on Naka, a Bitcoin L2 designed for DeFi on Bitcoin. You can also buy BVM on other exchanges.
        </Lines>
      </p>
    </div>
  );
}
