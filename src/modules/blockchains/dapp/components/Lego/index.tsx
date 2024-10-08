import React from 'react';
import cn from 'classnames';

import SvgInset from '@/components/SvgInset';

import { adjustBrightness } from '../../utils';

import styles from './styles.module.scss';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import { FieldModel } from '@/types/customize-model';
import { legoDragging } from '@/modules/blockchains/dapp/ui-helper/LegoDragging';

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
  fields?: FieldModel[];
} & Position &
  TitlePosition;

const Lego = (props: Props) => {
  const {
    zIndex = 0,
    background = '#A041FF',
    icon,
    title,
    tooltip,
    titleInLeft = false,
    titleInRight = false,
    disabled = false,
    first = false,
    last = false,
    children,
    preview,
    fields,
    ...rest
  } = props;

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

  return (
    <div
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
      <div className={cn(styles.lego__piece, styles.lego__piece__top)}>
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
                    width="36px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-input.svg'}
                  />
                ) : field.type === 'extends' &&
                  typeof field.value === 'number' ? (
                  <Image
                    width="40px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-switch.svg'}
                  />
                ) : field.type === 'dropdown' ? (
                  <Image
                    width="36px"
                    height="auto"
                    src={'/icons-tool/issue-a-token/icon-dropdown.svg'}
                  />
                ) : field.type === 'datetime' ? (
                  <Image
                    width="36px"
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
        <div className={styles.lego__inner}>
          {title && titleInLeft ? (
            <div
              className={cn(
                styles.lego__inner__label,
                styles.lego__inner__label__left,
              )}
            >
              {icon && (
                <Image src={icon} width="20px" height="20px" alt="icon" />
              )}
              <p>{title}</p>
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
              {icon && <Image src={icon} width={20} height={20} alt="icon" />}
              <p>{title}</p>
            </div>
          ) : null}
        </div>
      )}

      <div className={cn(styles.lego__piece, styles.lego__piece__bottom)}>
        <SvgInset svgUrl="/landingV3/svg/stud.svg" size={28} />
      </div>
    </div>
  );
};

export default Lego;
