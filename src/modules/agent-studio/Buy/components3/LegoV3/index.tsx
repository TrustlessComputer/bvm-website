import Image from 'next/image';
import React from 'react';

import SvgInset from '@/components/SvgInset';

import { useCaptureStore } from '@/modules/agent-studio/Buy/stores/index_v3';
import { iconToolNames } from '../../Buy.data';
import { hexToHSB, hsbToHex } from '../../utils';
import styles from './styles.module.scss';

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
  updatable?: boolean;
  allowShuffle?: boolean;
  checked?: boolean;
  status?: {
    label: string;
    backgroundColor: string;
    textColor: string;
  };

  suffixView?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function LegoV3({
  background = '#A041FF',
  label = '',
  labelInLeft = false,
  labelInRight = false,
  first = false,
  last = false,
  active = false,
  disabled = false,
  suffix = '',
  icon,
  zIndex = 0,
  className,
  updatable = false,
  allowShuffle = false,
  checked = false,
  children,
  status,
  suffixView,
  ...props
}: LegoV3) {
  const refTooltip = React.useRef<HTMLDivElement>(null);
  const legoRef = React.useRef<HTMLDivElement | null>(null);
  const { isCapture } = useCaptureStore();

  const _icon =
    iconToolNames.find(
      (item) =>
        icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
        item,
    ) ||
    icon ||
    null;

  const onHover = () => {
    if (!refTooltip.current) return;

    refTooltip.current.classList.add(styles.isBottom);
    refTooltip.current?.classList.add(styles.isHover);
  };

  React.useEffect(() => {
    let parentLego = legoRef.current?.parentElement;

    if (!parentLego) return;

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

  const haveNoti = React.useMemo(
    () => updatable || allowShuffle,
    [updatable, allowShuffle],
  );
  const notiMapping = React.useMemo(() => {
    return {
      updatable: {
        Icon: <SvgInset svgUrl="/landingV3/svg/draggable.svg" size={16} />,
        tooltip: 'This block is changeable.',
      },
      allowShuffle: {
        Icon: <SvgInset svgUrl="/landingV3/svg/replacable.svg" size={16} />,
        tooltip: 'This block is replacable.',
      },
    };
  }, []);

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
        {updatable && (
          <div
            className={styles.updatableIcon}
            onMouseEnter={onHover}
            onMouseLeave={() => {
              refTooltip.current?.classList.remove(styles.isBottom);
              refTooltip.current?.classList.remove(styles.isHover);
            }}
          >
            {notiMapping.updatable.Icon}
            <div ref={refTooltip} className={`${styles.tooltip}`}>
              {notiMapping.updatable.tooltip}
            </div>
          </div>
        )}
        {/* {haveNoti && (
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
        )} */}

        <SvgInset
          svgUrl="/landingV3/svg/stud_head.svg"
          className={styles.wrapper_studHead}
        />
        <div className={`${styles.inner}`}>
          {label && labelInLeft ? (
            <div className={`${styles.label} ${styles.label__left}`}>
              {_icon && <Image src={_icon} alt="icon" width={24} height={24} />}
              <p className={isCapture ? styles.label_margin : ''}>{label} </p>
            </div>
          ) : null}

          {children && <div className={styles.options}>{children}</div>}

          {(label || icon) && labelInRight ? (
            <div className={`${styles.label} ${styles.label__right}`}>
              {_icon && <Image src={_icon} alt="icon" width={16} height={16} />}
              <p className={isCapture ? styles.label_margin : ''}>{label} </p>
            </div>
          ) : null}

          <div className={styles.label}>
            <p>{suffix}</p>
          </div>

          {checked && (
            <div className={`${styles.label} ${styles.label__right}`}>
              <Image
                // src={'/hackathon/ic-check.svg'}
                src={'/icons/check-done-v2.svg'}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>

        {status && (
          <div
            className={styles.status}
            style={{
              backgroundColor: status.backgroundColor,
              color: status.textColor,
            }}
          >
            {status.label}
          </div>
        )}

        {suffixView && (
          <div className={styles.suffixViewContainer}>{suffixView}</div>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(LegoV3);
