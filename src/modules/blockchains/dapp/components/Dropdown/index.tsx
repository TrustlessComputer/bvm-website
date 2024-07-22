import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useSignalEffect } from '@preact/signals-react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import ImagePlaceholder from '@/components/ImagePlaceholder';

import { FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';
import { useFormDappsStore } from '../../stores/useDappStore';
import { formDappDropdownSignal } from '../../signals/useFormDappsSignal';

import styles from './styles.module.scss';

type Props = {
  background?: string;
  disabled?: boolean;
  options: FieldModel[];
  name: string;
  keyDapp: string;
} & FieldOption &
  FieldModel;

const Dropdown = ({
  background = '#A041FF',
  disabled,
  name,
  keyDapp,
  ...props
}: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<FieldModel | null>(
    props.options[0],
  );

  useOnClickOutside(ref, () => setIsOpenDropdown(false));

  const backgroundHover = adjustBrightness(background, -10);
  const backgroundActive = adjustBrightness(background, -20);

  const handleOnClickOption = (item: FieldModel) => {
    const formDappDropdown = formDappDropdownSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    formDappDropdownSignal.value = {
      ...formDappDropdown,
      [key]: item.value,
    };

    setCurrentValue(item);
    setIsOpenDropdown(false);
  };

  useSignalEffect(() => {
    console.log(formDappDropdownSignal.value);
  });

  if (!currentValue) return null;

  return (
    <div
      className={styles.dropdown}
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
          {currentValue.icon && (
            <Image src={currentValue.icon} width={16} height={16} alt="icon" />
          )}

          <p className={styles.dropdown__inner__content__text}>
            {currentValue.title}
          </p>

          {props.options.length > 1 && (
            <Image
              src="/landingV3/svg/arrow-b.svg"
              width={16}
              height={16}
              alt="icon"
            />
          )}
        </div>
      </div>

      <ul
        className={cn(styles.dropdown__list, {
          [styles.dropdown__list__open]: isOpenDropdown,
        })}
      >
        {props.options.map((item) => (
          <li
            key={item.key}
            className={cn(styles.dropdown__list__item, {
              [styles.dropdown__list__item__active]:
                currentValue.key === item.key,
            })}
            onClick={() => handleOnClickOption(item)}
          >
            {item.icon && (
              <Image src={item.icon} width={16} height={16} alt="icon" />
            )}

            <p className={styles.dropdown__list__item__text}>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Dropdown);
