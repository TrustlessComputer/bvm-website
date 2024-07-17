import React, { useState } from 'react';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import styles from './styles.module.scss';
import { hexToHSB, hsbToHex } from '../../utils';
import useStoreDropDown from '@/modules/blockchains/Buy/stores/useStoreDropdown';
import { iconToolNames } from '../../Buy.data';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

type LegoV3 = {
  background?: string;
  parentOfNested?: boolean;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  labelInLeft?: boolean;
  labelInRight?: boolean;
  icon?: string;
  className?: string;
  zIndex: number;
  suffix?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoV3({
  background = '#A041FF',
  label = '',
  labelInLeft = false,
  labelInRight = false,
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
  const [_icon, setIcon] = useState<string | null>(null);
  const {isCapture} = useCaptureStore();
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
    (fillBackgroundAsHSB?.b || 100) - 20,
  )?.split('.')[0];

  React.useEffect(() => {
    setIcon(
      iconToolNames.find(
        (item) =>
          icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
          item,
      ) || null,
    );
  }, [icon]);

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
          {label && labelInLeft ? (
            <div className={styles.label}>
              {icon && (
                <Image src={_icon || icon} alt="icon" width={24} height={24} />
              )}
              <p className={isCapture ? styles.label_margin : ''}>{label} </p>
            </div>
          ) : null}
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
          ) : children ? (
            <div className={styles.options}>{children}</div>
          ) : null}
          {(label || icon) && labelInRight ? (
            <div className={styles.label}>
              {icon && (
                <Image src={_icon || icon} alt="icon" width={16} height={16} />
              )}
              <p className={isCapture ? styles.label_margin : ''}>{label} </p>
            </div>
          ) : null}
          <div className={styles.label}>
            <p>{suffix}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(LegoV3);
