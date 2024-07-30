import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type TSubCardText = {
  title: string;
  decs: string;
  link: string;
};

export default function SubCardText({ decs, title, link }: TSubCardText) {
  return (
    <div className={s.botSection}>
      <div>
        <h3 className={s.botSection_title}>{title}</h3>
        <p className={s.botSection_decs}>{decs}</p>
      </div>

      {link && (
        <span className={s.botSection_button}>
          <p>Learn more</p>
          <SvgInset svgUrl="/landing-v2/svg/arrow-r-v2.svg" size={14} />
        </span>
      )}
    </div>
  );
}
