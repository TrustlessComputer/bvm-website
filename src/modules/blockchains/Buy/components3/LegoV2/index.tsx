import React, { HTMLAttributes, useEffect, useRef } from 'react';

import SvgInset from '@/components/SvgInset';

import { LegoColor } from '../BoxOption';

import styles from './styles.module.scss';
import Image from 'next/image';

type LegoV2 = {
  background?: LegoColor;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  label?: React.ReactNode;
  icon?: string;
  zIndex: number;
} & HTMLAttributes<HTMLDivElement>;

function LegoV2({
  background = 'brown',
  label = null,
  first = false,
  last = false,
  active = false,
  icon,
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
        <div className={styles.label}>
          {icon && <Image src={icon} alt="icon" width={24} height={24} />}
          <p>{label}</p>
        </div>
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
