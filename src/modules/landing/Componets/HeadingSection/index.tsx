import s from './styles.module.scss';
import React, { PropsWithChildren } from 'react';

interface IProp extends PropsWithChildren {
  className: string;
};
export default function HeadingSection({
                                         className,
                                         children,
                                       }: IProp) {


  return <h2 className={`${className} ${s.heading}`}>
      {children}
  </h2>;
}
