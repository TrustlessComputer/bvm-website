import React from 'react';
import cn from 'classnames';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import ImagePlaceholder from '@/components/ImagePlaceholder';

import styles from './styles.module.scss';

type Props = {
  disabled?: boolean;
  options?: (IModelOption & {
    value: string | number;
  })[];
  value: IModelOption & {
    value: string | number;
  };
  handleOnClickOption: (value: string | number) => void;
};

const Dropdown = ({ disabled, options, value, handleOnClickOption }: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false);

  useOnClickOutside(ref, () => setIsOpenDropdown(false));

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__inner}>
        <div className={styles.dropdown__inner__content}>
          {value.icon && (
            <ImagePlaceholder
              src={value.icon}
              alt={value.title + ' logo'}
              width={16}
              height={16}
            />
          )}

          <p className={styles.dropdown__inner__content__text}>{value.title}</p>

          {(options?.length || 0) > 1 && (
            <ImagePlaceholder
              src="/landingV3/svg/arrow-b.svg"
              alt="Arrow Icon"
              aria-hidden="true"
              width={16}
              height={16}
            />
          )}
        </div>
      </div>

      <ul
        className={cn(styles.dropdown__list, {
          [styles.dropdown__list__open]: isOpenDropdown,
        })}
      >
        {options?.map((item) => (
          <li
            key={item.value}
            className={styles.dropdown__list__item}
            onClick={() => {
              setIsOpenDropdown(false);
              handleOnClickOption(item.value);
            }}
          >
            {item.icon && (
              <ImagePlaceholder
                src={item.icon}
                alt={item.title + ' logo'}
                width={16}
                height={16}
              />
            )}

            <p className={styles.dropdown__list__item__text}>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Dropdown);
