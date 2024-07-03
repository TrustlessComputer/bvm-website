import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Dropdown from '../Dropdown';
import { TColorLego } from '../BoxOption';

export type TOptions = {
  label: string;
  id: number;
  value: string;
  icon?: string;
}[];

type TLegoItem = {
  label: string;
  background: TColorLego;
  options: TOptions;
  isFrist?: boolean;
  isLast?: boolean;
  isActive?: boolean;
};
export default function Lego({
  background,
  options,
  label,
  isFrist,
  isLast,
  isActive,
}: TLegoItem) {
  return (
    <div className={`${s.wrapper} ${s[`wrapper__${background}`]}`}>
      <div className={s.inner}>
        <p className={s.label}>{label}</p>
        <div className={s.options}>
          <Dropdown options={options} />
        </div>
      </div>

      {!isFrist && (
        <span
          className={`${s.wrapper_stud__top} ${s.wrapper_stud} ${
            isActive && s.wrapper_stud__active
          }`}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}
      {!isLast && (
        <span
          className={`${s.wrapper_stud__bottom} ${s.wrapper_stud}  ${
            isActive && s.wrapper_stud__active
          }
        `}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}
    </div>
  );
}
