import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { iconToolNames } from '@/modules/blockchains/Buy/Buy.data';
import { IModelOption } from '@/types/customize-model';

import { adjustBrightness } from '../../utils';

import useOrderFormStoreV3 from '../../stores/index_v3';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import styles from './styles.module.scss';

type Props = {};

const background = adjustBrightness('#FF7A41', -20);
const backgroundHover = adjustBrightness(background, -10);
const backgroundActive = adjustBrightness(background, -20);
const getIcon = (icon?: string) => {
  return (
    iconToolNames.find(
      (item) =>
        icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
        item,
    ) ||
    icon ||
    null
  );
};

const NetworkDropdown = ({}: Props) => {
  const { categories } = useModelCategoriesStore();
  const { setField } = useOrderFormStoreV3();

  const options = React.useMemo(
    () => categories?.find((i) => i.key === 'network')?.options || [],
    [categories],
  );

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<IModelOption>(
    options[0],
  );

  useOnClickOutside(ref, () => setIsOpenDropdown(false));

  const handleOnClickOption = (item: IModelOption) => {
    setField('network', item.key, true);
    setCurrentValue(item);
    setIsOpenDropdown(false);
  };

  const _icon = React.useMemo(
    () => getIcon(currentValue?.icon),
    [currentValue?.icon],
  );

  return (
    <div
      className={cn(styles.dropdown, {
        // [styles.dropdown__disabled]: disabled,
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
            {currentValue?.title}
          </p>

          <Image
            src="/landingV3/svg/arrow-b.svg"
            width={16}
            height={16}
            alt="icon"
          />
        </div>
      </div>

      <ul
        className={cn(styles.dropdown__list, {
          [styles.dropdown__list__open]: isOpenDropdown,
        })}
      >
        {options.map((item) => {
          const _icon2 = getIcon(item.icon);

          return (
            <li
              key={item.key}
              className={cn(styles.dropdown__list__item, {
                [styles.dropdown__list__item__active]:
                  currentValue?.key === item.key,
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

export default React.memo(NetworkDropdown);
