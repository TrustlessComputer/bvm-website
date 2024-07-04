import React, { HTMLAttributes, useEffect, useRef } from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Dropdown from '../Dropdown';
import { TColorLego } from '../BoxOption';
import { FormOrder, useFormOrderStore } from '../../stores';
import Slider from '@/modules/blockchains/Buy/components3/Slider';

export type TOptions = {
  label: string;
  id: number;
  value: string;
  icon?: string;
}[];
type TLegoItem = {
  label: string;
  background: TColorLego;
  isFrist?: boolean;
  isLast?: boolean;
  isActive?: boolean;
  zIndex: number;
};
function Lego({
  background,
  label,
  isFrist,
  isLast,
  isActive,
  zIndex,
  children,
  ...props
}: TLegoItem & HTMLAttributes<HTMLDivElement>) {
  const legoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parrentLego = legoRef.current?.parentElement as HTMLDivElement;
    if (!parrentLego) return;

    parrentLego.classList.add(s.parentElement);
  }, [legoRef.current]);

  return (
    <div
      className={`${s.wrapper} ${s[`wrapper__${background}`]}`}
      ref={legoRef}
      style={{ zIndex: zIndex, cursor: isActive ? 'not-allowed' : 'grabbing' }}
      {...props}
    >
      <div className={s.inner}>
        <p className={s.label}>{label}</p>
        <div className={s.options}>{children}</div>
      </div>

      {!isFrist && (
        <span
          className={`${s.wrapper_stud__top} ${s.wrapper_stud} ${
            isActive && s.wrapper_stud__top_active
          }`}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}
      {!isLast && (
        <span
          className={`${s.wrapper_stud__bottom} ${s.wrapper_stud} ${
            isActive && s.scale
          }  ${isActive && s.wrapper_stud__active}
        `}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}
    </div>
  );
}

export default React.memo(Lego);
