import React, { useState } from 'react';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import styles from './styles.module.scss';
import { LegoColor } from '../BoxOptionV2';
import { hexToHSB, hsbToHex } from '../../utils';
import { Tooltip } from 'react-tooltip';
import useStoreDropDown from '@/modules/blockchains/Buy/stores/useStoreDropdown';

type LegoV3 = {
  background?: string;
  parentOfNested?: boolean;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  icon?: string;
  className?: string;
  zIndex: number;
  suffix?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoV3({
  background = '#A041FF',
  label = null,
  parentOfNested = false,
  first = false,
  last = false,
  active = false,
  disabled = false,
  suffix = '',
  icon,
  zIndex = 0,
  className,
  children,
  ...props
}: LegoV3) {
  const legoRef = React.useRef<HTMLDivElement | null>(null);
  const { idDropdownCurrent, setIdDropdownCurrent } = useStoreDropDown();

  React.useEffect(() => {
    let parentLego = legoRef.current?.parentElement;

    if (!parentLego) return;

    if (parentOfNested) {
      parentLego = parentLego.parentElement as HTMLDivElement;
    }

    parentLego.style.position = 'relative';
    parentLego.style.zIndex = `${zIndex * 2} `;
    parentLego.style.width = 'max-content';
  }, [legoRef.current]);

  const fillBackgroundAsHSB = hexToHSB(background);
  const _background = hsbToHex(
    fillBackgroundAsHSB?.h || 0,
    fillBackgroundAsHSB?.s || 0,
    (fillBackgroundAsHSB?.b || 100) - 10,
  )?.split('.')[0];

  return (
    <React.Fragment>
      <div
        className={`${styles.wrapper} ${styles[`wrapper__${background}`]}
        ${first ? styles.first : ''}
        ${disabled ? styles.disabled : ''}
        ${className}
        `}
        ref={legoRef}
        style={{
          zIndex: zIndex,
          // @ts-ignore
          '--fillBackground': background,
          '--background': background ? _background : undefined,
        }}
        // @ts-ignore
        {...props}
      >
        <SvgInset
          svgUrl="/landingV3/svg/stud_head.svg"
          className={styles.wrapper_studHead}
        />
        <div
          className={`${styles.inner} ${
            parentOfNested ? styles.inner_nested : ''
          }`}
        >
          {label && (
            <div className={styles.label}>
              {icon && <Image src={icon} alt="icon" width={24} height={24} />}
              <p>{label}</p>
            </div>
          )}
          {parentOfNested ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </div>
          ) : (
            <div className={styles.options}>{children}</div>
          )}
          <div className={styles.label}>
            <p>{suffix}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(LegoV3);
