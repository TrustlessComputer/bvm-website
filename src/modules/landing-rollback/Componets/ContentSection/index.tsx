import s from './styles.module.scss';
import React, { PropsWithChildren } from 'react';
import Lines from '@/interactive/Lines';

interface IProp extends PropsWithChildren {
  className: string;
};
export default function ContentSection({
                                         className,
                                         children,
                                       }: IProp) {


  return <div className={`${className} ${s.content}`}>
    {children}
  </div>;
}
