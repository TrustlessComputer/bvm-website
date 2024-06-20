import React from 'react';
import Heading from './Heading';
import cn from 'classnames';
import s from './styles.module.scss';
import SectionButton from './SectionButton';
import Image from 'next/image';
import Loader from '@/modules/builder-landing/Loader';

export default function BuyBVMModule() {
  return (
    <div className={s.wrapper} id={'buyBVMModule'}>
      <Loader />
      <div className={cn(s.inner, 'container')}>
        <Heading />
        <SectionButton />
      </div>
    </div>
  );
}
