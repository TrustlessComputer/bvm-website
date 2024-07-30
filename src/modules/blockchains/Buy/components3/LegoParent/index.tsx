import React from 'react';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import { LegoColor } from '../BoxOption';

import styles from './styles.module.scss';
import { hexToHSB, hsbToHex } from '../../utils';

type LegoParent = {
  background: string;
  parentOfNested?: boolean;
  active?: boolean;
  label?: React.ReactNode;
  icon?: string;
  className?: string;
  zIndex: number;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoParent({
  background,
  label = null,
  parentOfNested = false,
  active = false,
  icon,
  zIndex = 0,
  className,
  children,
  ...props
}: LegoParent) {
  const legoRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let parentLego = legoRef.current?.parentElement;
    if (!parentLego || !parentLego.parentElement) return;

    parentLego.style.position = 'relative';
    parentLego.style.zIndex = `${zIndex * 2} `;
    parentLego.parentElement.style.zIndex = `${zIndex * 2} `;
  }, [legoRef.current]);

  const fillBackgroundAsHSB = hexToHSB(background);
  const _fillBackground = hsbToHex(
    fillBackgroundAsHSB?.h || 0,
    fillBackgroundAsHSB?.s || 0,
    (fillBackgroundAsHSB?.b || 100) - 20,
  )?.split('.')[0];
  const _background = hsbToHex(
    fillBackgroundAsHSB?.h || 0,
    fillBackgroundAsHSB?.s || 0,
    (fillBackgroundAsHSB?.b || 100) - 40,
  )?.split('.')[0];

  return (
    <div
      className={`${styles.wrapper} ${
        styles[`wrapper__${background}`]
      } ${className}`}
      ref={legoRef}
      style={{
        zIndex: zIndex,
        // cursor: active ? 'not-allowed' : 'grabbing'
        // @ts-ignore
        '--fillBackground': _fillBackground,
        '--background': _background,
      }}
      {...props}
    >
      <SvgInset
        svgUrl="/landingV3/svg/stud_head.svg"
        className={styles.wrapper_studHead}
      />

      {/* <span
        className={`${styles.wrapper_stud__top} ${styles.wrapper_stud} ${
          active && styles.wrapper_stud__top_active
        }`}
      >
        <SvgInset svgUrl="/landingV3/svg/stud.svg" />
      </span> */}

      <div className={`${styles.wrapper_stud__vertical} ${styles.stud__large}`}>
        {label && (
          <div className={styles.label}>
            {icon && <Image src={icon} alt="icon" width={24} height={24} />}
            <p>{label}</p>
          </div>
        )}

        <div
          className={styles.wrapper_stud__vertical__bottom}
          style={{ zIndex: zIndex }}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </div>
      </div>

      <div className={styles.wrapper_stud__horizonal}>
        <div className={styles.wrapper_stud__horizonal_inner}>{children}</div>
      </div>

      <div className={styles.wrapper_stud__vertical}>
        {/*<div className={styles.wrapper_stud__vertical__top}>*/}
        {/*  <SvgInset svgUrl="/landingV3/svg/stud.svg" />*/}
        {/*</div>{' '}*/}
        <div className={styles.wrapper_stud__vertical__bottom}>
          <SvgInset svgUrl="/landingV3/svg/stud.svg" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(LegoParent);
