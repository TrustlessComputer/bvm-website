import cn from 'classnames';
import React from 'react';

import SvgInset from '@/components/SvgInset';

import { adjustBrightness } from '../../utils';

import { iconToolNames } from '@/modules/agent-studio/Buy/Buy.data';
import { useCaptureStore } from '@/modules/agent-studio/Buy/stores/index_v3';
import { FieldModel } from '@/types/customize-model';
import { Flex, Image, Tooltip } from '@chakra-ui/react';
import styles from './styles.module.scss';

type Position =
  | {
      first: true;
      last: false;
    }
  | {
      first: false;
      last: true;
    }
  | {
      first: false;
      last: false;
    };

type TitlePosition =
  | {
      titleInLeft: true;
      titleInRight: false;
    }
  | {
      titleInLeft: false;
      titleInRight: true;
    }
  | {
      titleInLeft: false;
      titleInRight: false;
    };

type Props = {
  zIndex?: number;
  background?: string;
  title?: string;
  icon?: string;
  tooltip?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  preview?: boolean;
  checked?: boolean;
  legoAI?: boolean;
  fields?: FieldModel[];
  infoLego?: {
    title: string;
    type: string;
  };
  vertical?: boolean;
} & Position &
  TitlePosition;

const Lego = (props: Props) => {
  const {
    zIndex = 0,
    background = '#c4513a',
    icon,
    title,
    legoAI,
    tooltip,
    titleInLeft = false,
    titleInRight = false,
    disabled = false,
    first = false,
    last = false,
    children,
    preview,
    fields,
    checked,
    vertical,
    ...rest
  } = props;
  const { isCapture } = useCaptureStore();
  const legoRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const parentDOM = legoRef.current?.parentElement;

    if (!parentDOM) return;

    const parentDOMIsDraggable =
      parentDOM.getAttribute('aria-roledescription') === 'draggable';

    if (parentDOMIsDraggable) {
      parentDOM.style.zIndex = `${zIndex}`;
    } else if (legoRef.current) {
      legoRef.current.style.zIndex = `${zIndex}`;
      legoRef.current.style.position = 'relative';
    }
  }, [legoRef.current, zIndex]);

  const _icon =
    iconToolNames.find(
      (item) =>
        icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
        item,
    ) ||
    icon ||
    null;

  if (props.infoLego?.title === 'Staking') {
    console.log('checked', checked);
  }

  return (
    <Flex
      className={cn(styles.lego, {
        [styles.lego__disabled]: disabled,
        [styles.lego__preview]: preview,
      })}
      style={{
        // @ts-ignore
        '--background-color': background,
        '--border-color': adjustBrightness(background, -20),
      }}
      ref={legoRef}
    >
      <div
        className={cn(
          styles.lego__piece,
          styles.lego__piece__top,
          legoAI && styles.lego__piece__top__ai,
        )}
      >
        <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
      </div>

      {preview ? (
        <div className={styles.lego__inner}>
          {fields?.map((field) => {
            return (
              <div style={{ display: 'flex', gap: '4px' }} key={field.key}>
                <div
                  className={cn(
                    styles.lego__inner__label,
                    styles.lego__inner__label__left,
                  )}
                >
                  {/*{field?.icon && (*/}
                  {/*  <Image*/}
                  {/*    src={field?.icon}*/}
                  {/*    width="20px"*/}
                  {/*    height="20px"*/}
                  {/*    alt="icon"*/}
                  {/*  />*/}
                  {/*)}*/}
                  <p>{field?.previewTitle || field?.title}</p>
                </div>
                {field.type === 'input' ? (
                  <Image
                    width="45px"
                    height="20px"
                    style={{ backgroundColor: '#fff', borderRadius: '14px' }}
                    src={'/icons-tool/issue-a-token/icon-input.svg'}
                  />
                ) : field.type === 'extends' &&
                  typeof field.value === 'number' ? (
                  <Image
                    width="35px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-switch.svg'}
                  />
                ) : field.type === 'dropdown' ? (
                  <Image
                    width="30px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-dropdown.svg'}
                  />
                ) : field.type === 'datetime' ? (
                  <Image
                    width="30px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-datetime.svg'}
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <Flex
          className={styles.lego__inner}
          style={{ flexDirection: vertical ? 'column' : 'row' }}
        >
          {title && titleInLeft ? (
            <div
              className={cn(
                styles.lego__inner__label,
                styles.lego__inner__label__left,
              )}
            >
              {props.infoLego?.title === 'Staking' && (
                <p className={`${styles.titleSingle}`}>
                  {props.infoLego?.type.replace('Token', '')}
                </p>
              )}

              {_icon && (
                <Image src={_icon} width="20px" height="20px" alt="icon" />
              )}
              <p className={`${styles.titleSingle}`}>{title}</p>

              {checked && (
                <div className={`${styles.label}`}>
                  <Image
                    src={'/icons/check-done-v2.svg'}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </div>
          ) : null}

          {tooltip && (
            <Tooltip label={tooltip}>
              <Image
                width="18px"
                height="18px"
                alt="tooltip"
                src={'/icons/ic-tooltip.svg'}
              />
            </Tooltip>
          )}

          {children && <div className={styles.children}>{children}</div>}

          {title && titleInRight ? (
            <div
              className={cn(
                styles.lego__inner__label,
                styles.lego__inner__label__right,
              )}
            >
              {_icon && <Image src={_icon} width={20} height={20} alt="icon" />}
              <p className={`${isCapture ? styles.label_margin : ''}`}>
                {title}
              </p>
            </div>
          ) : null}
        </Flex>
      )}

      <div className={cn(styles.lego__piece, styles.lego__piece__bottom)}>
        <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
      </div>
    </Flex>
  );
};

export default Lego;
