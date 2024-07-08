import React from 'react';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import { LegoColor } from '../BoxOption';

import styles from './styles.module.scss';

type LegoV3 = {
  background?: LegoColor;
  parentOfNested?: boolean;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  label?: React.ReactNode;
  icon?: string;
  className?: string;
  zIndex: number;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoV3({
  background = 'brown',
  label = null,
  parentOfNested = false,
  first = false,
  last = false,
  active = false,
  icon,
  zIndex = 0,
  className,
  children,
  ...props
}: LegoV3) {
  const legoRef = React.useRef<HTMLDivElement | null>(null);
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

  return (
    <div
      className={`${styles.wrapper} ${
        styles[`wrapper__${background}`]
      } ${className}
        `}
      ref={legoRef}
      style={{
        zIndex: zIndex,
      }}
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
      </div>
    </div>
  );
}

export default React.memo(LegoV3);
