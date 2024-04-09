import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Image from 'next/image';

type TSubCardIcon = {
  icon: string;
  title: string;
  decs: string;
};
export default function SubCardIcon({ decs, icon, title }: TSubCardIcon) {
  return (
    <div className={s.botSection}>
      <div className={s.botSection_left}>
        <img src={icon} className={s.botSection_left_icon} />
      </div>
      <div className={s.botSection_right}>
        <div className={s.botSection_right_inner}>
          <div className={s.botSection_right_inner_title}>
            <h3 className={s.botSection_right_inner_title_text}>{title}</h3>
            <img
              alt="icon"
              src={icon}
              // size={24}
              className={s.botSection_right_inner_title_icon}
            />
          </div>
          <p className={s.botSection_right_inner_decs}>{decs}</p>
        </div>
      </div>
    </div>
  );
}
