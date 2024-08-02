import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import Chars from '@interactive/Chars';

type WrapperCard = PropsWithChildren & {
  title: string;
}

export default function WrapperCard({ ...props }: WrapperCard): React.JSX.Element {
  return <div className={s.wrapperCard}>
    <p className={s.wrapperCard_heading}><Chars delayEnter={.7}>
      {props.title}
    </Chars></p>
    {props.children}
  </div>;
}
