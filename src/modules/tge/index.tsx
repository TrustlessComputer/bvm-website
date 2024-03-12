import React from 'react';
import Heading from './Heading';
import cn from 'classnames';
import s from './styles.module.scss';
import SectionButton from './SectionButton';
import Image from 'next/image';
import Loader from '@/modules/builder-landing/Loader';

export default function TgeModule() {
  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={cn(s.inner, 'container')}>
        <Heading />
        <SectionButton />
      </div>
      <Image
        className={s.wrapper_bg}
        src={'/tge/bg.png'}
        width={1920}
        height={1004}
        alt="bg"
      />
    </div>
  );
}
