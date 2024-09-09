import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import useDappsStore from '../../stores/useDappStore';
import { DappType, FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';

import { FieldModel } from '@/types/customize-model';
import { compareString } from '@/utils/string';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  templateIds2DSignal,
} from '../../signals/useDragSignal';
import styles from './styles.module.scss';
import { iconToolNames } from '@/modules/blockchains/Buy/Buy.data';
import useDraggingStore from '../../stores/useDraggingStore';

type Props = {
  onlyLabel?: boolean;
  background?: string;
  disabled?: boolean;
  options: FieldModel[];
  name: string;
  dappKey: string;
} & FieldOption &
  FieldModel;

const Dropdown = ({
  background = '#ab3d29',
  disabled,
  name,
  dappKey,
  onlyLabel = false,
  ...props
}: Props) => {
  const { dapps } = useDappsStore();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<FieldModel | null>(
    props.options[0],
  );
  const { setIsDragging } = useDraggingStore();

  useOnClickOutside(ref, () => setIsOpenDropdown(false));

  const backgroundHover = adjustBrightness(background, -10);
  const backgroundActive = adjustBrightness(background, -20);

  const handleOnClickOption = (item: FieldModel) => {
    if (disabled || onlyLabel) return;

    const formDappDropdown = formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    formDappSignal.value = {
      ...formDappDropdown,
      [key]: item.value,
    };

    setCurrentValue(item);
    setIsOpenDropdown(false);
  };

  const handleOnClickCreateToken = () => {
    const tokenDappIndex = dapps.findIndex(
      (item) => item.key === 'token_generation',
    );

    setIsDragging(true);

    setTimeout(() => {
      draggedDappIndexesSignal.value = [
        ...draggedDappIndexesSignal.value,
        tokenDappIndex,
      ];
      draggedIds2DSignal.value = [...draggedIds2DSignal.value, []];
    }, 300);
  };

  useSignalEffect(() => {
    if (disabled || onlyLabel) return;

    const thisValue =
      formDappSignal.value[FormDappUtil.getKeyForm(props, props, name)];

    if (thisValue && thisValue !== currentValue?.value) {
      setCurrentValue(
        props.options.find((item) => item.value === thisValue) ||
          props.options[0],
      );
    }
  });

  React.useEffect(() => {
    // let formDappDropdown = onlyLabel
    //   ? formTemplateDappSignal.value
    //   : formDappSignal.value;
    // const key = FormDappUtil.getKeyForm(props, props, name);
    //
    // if (props.options.length > 0) {
    //   if (!formDappDropdown[key]) {
    //     formDappDropdown = {
    //       ...formDappDropdown,
    //       [key]: props.options[0].value,
    //     };
    //   } else {
    //     setCurrentValue(
    //       props.options.find((item) => item.value === formDappDropdown[key]) ||
    //         props.options[0],
    //     );
    //   }
    // }

    if (props.options.length > 0) {
      handleOnClickOption(props.options[0]);
    }
  }, []);

  if (!currentValue) {
    if (compareString(dappKey, DappType.airdrop) && props.inBaseField) {
      return (
        <div
          className={cn(styles.dropdown, {
            [styles.dropdown__disabled]: disabled,
          })}
          ref={ref}
          style={{
            // @ts-ignore
            '--background': background,
            '--background-hover': backgroundHover,
            '--background-active': backgroundActive,
          }}
          onClick={() => handleOnClickCreateToken()}
        >
          <div className={styles.dropdown__inner}>
            <div
              className={styles.dropdown__inner__content}
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
              <p className={styles.dropdown__inner__content__text}>
                Create A Token
              </p>

              {props.options.length > 1 && !disabled ? (
                <Image
                  src="/landingV3/svg/arrow-b.svg"
                  width={16}
                  height={16}
                  alt="icon"
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  const _icon =
    iconToolNames.find(
      (item) =>
        currentValue.icon?.replace(
          'https://storage.googleapis.com/bvm-network',
          '',
        ) === item,
    ) ||
    currentValue.icon ||
    null;

  return (
    <div
      className={cn(styles.dropdown, {
        [styles.dropdown__disabled]: disabled,
      })}
      ref={ref}
      style={{
        // @ts-ignore
        '--background': background,
        '--background-hover': backgroundHover,
        '--background-active': backgroundActive,
      }}
    >
      <div className={styles.dropdown__inner}>
        <div
          className={styles.dropdown__inner__content}
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          {_icon && <Image src={_icon} width={16} height={16} alt="icon" />}

          <p className={styles.dropdown__inner__content__text}>
            {currentValue.title}
          </p>

          {props.options.length > 1 && !disabled ? (
            <Image
              src="/landingV3/svg/arrow-b.svg"
              width={16}
              height={16}
              alt="icon"
            />
          ) : null}
        </div>
      </div>

      <ul
        className={cn(styles.dropdown__list, {
          [styles.dropdown__list__open]: isOpenDropdown,
        })}
      >
        {props.options.map((item) => {
          const _icon2 =
            iconToolNames.find(
              (iconName) =>
                item.icon?.replace(
                  'https://storage.googleapis.com/bvm-network',
                  '',
                ) === iconName,
            ) ||
            item.icon ||
            null;
          return (
            <li
              key={item.key}
              className={cn(styles.dropdown__list__item, {
                [styles.dropdown__list__item__active]:
                  currentValue.key === item.key,
              })}
              onClick={() => handleOnClickOption(item)}
            >
              {_icon2 && (
                <Image src={_icon2} width={16} height={16} alt="icon" />
              )}

              <p className={styles.dropdown__list__item__text}>{item.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Dropdown);
