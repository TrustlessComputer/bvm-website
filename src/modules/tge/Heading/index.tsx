'use client';

import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';

export default function Heading() {
  return (
    <div className={s.wrap}>
      <Fade delay={.2}>
        <div className={s.heading}>
          <IconHeading />
        </div>
      </Fade>
      <p className={s.desc}>
        <Lines delay={.3}>
          We’re excited to partner with you to build the future of Bitcoin.
        </Lines>
      </p>
    </div>
  );
}
