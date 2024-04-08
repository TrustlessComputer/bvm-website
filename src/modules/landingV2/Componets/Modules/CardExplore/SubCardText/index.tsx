import React from 'react';
import s from './styles.module.scss';

type TSubCardText = {
  title: string;
  decs: string;
};

export default function SubCardText({ decs, title }: TSubCardText) {
  return (
    <div className={s.botSection}>
      <h3 className={s.botSection_title}>{title}</h3>
      <p className={s.botSection_decs}>{decs}</p>
    </div>
  );
}
