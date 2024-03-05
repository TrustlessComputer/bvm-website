'use client';

import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';
import Fade from '@/interactive/Fade';

export default function Heading() {
  return (
    <Fade delay={.2}>
      <div className={s.heading}>
        <IconHeading />
      </div>
    </Fade>
  );
}
