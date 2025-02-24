import Image from 'next/image';
import React from 'react';

import SvgInset from '@/components/SvgInset';

import { hexToHSB, hsbToHex } from '../../utils';
import styles from './styles.module.scss';

type LegoParent = {
  background: string;
  parentOfNested?: boolean;
  active?: boolean;
  label?: React.ReactNode;
  icon?: string;
  className?: string;
  zIndex: number;
  disabled?: boolean;
  updatable?: boolean;
  allowShuffle?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoParent({
  updatable = false,
  allowShuffle = false,
  background,
  label = null,
  parentOfNested = false,
  active = false,
  icon,
  zIndex = 0,
  className,
  children,
  disabled = false,
  ...props
}: LegoParent) {
  const refTooltip = React.useRef<HTMLDivElement>(null);
  const legoRef = React.useRef<HTMLDivElement | null>(null);

  const onHover = () => {
    if (!refTooltip.current) return;

    refTooltip.current.classList.add(styles.isBottom);
    refTooltip.current?.classList.add(styles.isHover);
  };

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
    fillBackgroundAsHSB?.b || 100,
  )?.split('.')[0];
  const _background = hsbToHex(
    fillBackgroundAsHSB?.h || 0,
    fillBackgroundAsHSB?.s || 0,
    (fillBackgroundAsHSB?.b || 100) - 20,
  )?.split('.')[0];

  const haveNoti = React.useMemo(
    () => updatable || allowShuffle,
    [updatable, allowShuffle],
  );
  const notiMapping = React.useMemo(() => {
    return {
      updatable: {
        Icon: (
          <SvgInset
            svgUrl="/landingV3/svg/up-right-bottom-left.svg"
            size={24}
          />
        ),
        tooltip: 'This block is changeable.',
      },
      allowShuffle: {
        Icon: <SvgInset svgUrl="/landingV3/svg/replacable.svg" size={16} />,
        tooltip: 'This block is shufflable.',
      },
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${styles[`wrapper__${background}`]} ${
        disabled ? styles.wrapper__disabled : ''
      } ${className}`}
      ref={legoRef}
      style={{
        zIndex: zIndex,
        // cursor: active ? 'not-allowed' : 'grabbing'
        // @ts-ignore
        '--fillBackground': background,
        '--background': _background,
      }}
      {...props}
    >
      {haveNoti && (
        <div
          className={styles.updatableIcon}
          onMouseEnter={onHover}
          onMouseLeave={() => {
            refTooltip.current?.classList.remove(styles.isBottom);
            refTooltip.current?.classList.remove(styles.isHover);
          }}
        >
          {updatable
            ? notiMapping.updatable.Icon
            : notiMapping.allowShuffle.Icon}
          <div ref={refTooltip} className={`${styles.tooltip}`}>
            {updatable
              ? notiMapping.updatable.tooltip
              : notiMapping.allowShuffle.tooltip}
          </div>
        </div>
      )}

      <SvgInset
        svgUrl="/landingV3/svg/stud_head.svg"
        className={styles.wrapper_studHead}
      />

      {/* <span*/}
      {/*  className={`${styles.wrapper_stud__top} ${styles.wrapper_stud} ${*/}
      {/*    active && styles.wrapper_stud__top_active*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  <SvgInset svgUrl="/landingV3/svg/stud.svg" />*/}
      {/*</span>*/}

      <div className={`${styles.wrapper_stud__vertical} ${styles.stud__large}`}>
        {label && (
          <div className={styles.label}>
            {icon && <Image src={icon} alt="icon" width={24} height={24} />}
            <p>{label}</p>
          </div>
        )}

        {/*<div*/}
        {/*  className={styles.wrapper_stud__vertical__bottom}*/}
        {/*  style={{ zIndex: zIndex }}*/}
        {/*>*/}
        {/*  <SvgInset svgUrl="/landingV3/svg/stud.svg" />*/}
        {/*</div>*/}
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
