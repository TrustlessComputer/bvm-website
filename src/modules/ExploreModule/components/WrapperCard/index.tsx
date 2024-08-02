import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss'

type WrapperCard = PropsWithChildren & {
  title: string;
}

export default function WrapperCard({...props}: WrapperCard): React.JSX.Element {
  return <div className={s.wrapperCard}>
    <p className={s.wrapperCard_heading}>{props.title}</p>
    {props.children}

  </div>
}
