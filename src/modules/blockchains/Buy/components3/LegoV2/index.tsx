import React, { HTMLAttributes, useEffect, useRef } from 'react';

import SvgInset from '@/components/SvgInset';

import { LegoColor } from '../BoxOption';

import styles from './styles.module.scss';

type LegoV2 = {
  background?: LegoColor;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  label?: React.ReactNode;
  zIndex: number;
} & HTMLAttributes<HTMLDivElement>;

function LegoV2({
  background = 'brown',
  label = null,
  first = false,
  last = false,
  active = false,
  zIndex = 0,
  children,
  ...props
}: LegoV2) {
  const legoRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const parentLego = legoRef.current?.parentElement;
    if (!parentLego) return;

    parentLego.style.position = 'relative';
    parentLego.style.zIndex = `${zIndex * 2} `;
  }, [legoRef.current]);

  return (
    <div
      className={`${styles.wrapper} ${styles[`wrapper__${background}`]}`}
      ref={legoRef}
      style={{ zIndex: zIndex, cursor: active ? 'not-allowed' : 'grabbing' }}
      {...props}
    >
      <div className={styles.inner}>
        <p className={styles.label}>{label}</p>
        <div className={styles.options}>{children}</div>
      </div>

      {!first && (
        <span
          className={`${styles.wrapper_stud__top} ${styles.wrapper_stud} ${
            active && styles.wrapper_stud__top_active
          }`}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}

      {!last && (
        <span
          className={`${styles.wrapper_stud__bottom} ${styles.wrapper_stud} ${
            active && styles.scale
          }  ${active && styles.wrapper_stud__active}
        `}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </span>
      )}
    </div>
  );
}

export default React.memo(LegoV2);
