import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import SubMenu from '@layouts/Footer/SubMenu';


interface IGroup extends PropsWithChildren {
  title: string,
  className?: string
}

export default function GroupMenu({ title, children, className }: IGroup) {

  return <div className={`${s.wrap} ${className}`}>
    <h4 className={s.heading}>{title}</h4>
    <div className={s.content}>
      {children}
    </div>
  </div>;
}
