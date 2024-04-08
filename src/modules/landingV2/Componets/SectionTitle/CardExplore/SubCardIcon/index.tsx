import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type TSubCardIcon = {
  icon: string;
  title: string;
  decs: string;
};
export default function SubCardIcon({ decs, icon, title }: TSubCardIcon) {
  return (
    <div className={s.botSection}>
      <div className={s.botSection_left}>
        <SvgInset size={49} svgUrl={icon} className={s.botSection_left_icon} />
      </div>
      <div className={s.botSection_right}>
        <div className={s.botSection_right_inner}>
          <h3 className={s.botSection_right_inner_title}>{title}</h3>
          <p className={s.botSection_right_inner_decs}>{decs}</p>
        </div>
      </div>
    </div>
  );
}
