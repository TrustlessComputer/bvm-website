import React from 'react';
import cn from 'classnames';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import ImagePlaceholder from '@/components/ImagePlaceholder';

import styles from './styles.module.scss';
import { useFormDappsStore } from '../../stores/useDappStore';

type Props = {
  background?: string;
  disabled?: boolean;
  options: FieldModel[];
  // value: FieldModel;
  // handleOnClickOption: (
  //   name: string,
  //   option: FieldModel,
  //   required: boolean,
  //   optionalIndex?: number,
  // ) => void;
  optionalIndex?: number;
  required?: boolean;
  name: string;
  _key: string;
};

const Dropdown = ({
  background = '#213423',
  disabled,
  options,
  optionalIndex,
  required = false,
  name,
  _key,
}: Props) => {
  const { formDapps, setFormDappsWithKey } = useFormDappsStore();
  const thisDapp = formDapps[_key];

  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false);

  useOnClickOutside(ref, () => setIsOpenDropdown(false));

  const handleOnClickOption = React.useCallback(
    (
      name: string,
      option: FieldModel,
      required: boolean,
      optionalIndex?: number,
    ) => {
      const newRequiredFields = JSON.parse(
        JSON.stringify(thisDapp.requiredFields),
      );
      const newOptionalFields = JSON.parse(
        JSON.stringify(thisDapp.optionalFields),
      );

      if (required) {
        for (const requiredField of newRequiredFields) {
          if (requiredField.key === name) {
            requiredField.value = option.value;
          }
        }
      } else if (typeof optionalIndex !== 'undefined') {
        newOptionalFields[optionalIndex].fields = newOptionalFields[
          optionalIndex
        ].fields.map((field: FieldModel) => {
          if (field.key === name) {
            return {
              ...field,
              value: option.value,
            };
          }

          return field;
        });
      }

      setFormDappsWithKey(_key, {
        ...thisDapp,
        requiredFields: newRequiredFields,
        optionalFields: newOptionalFields,
      });
    },
    [thisDapp],
  );

  if (Object.keys(formDapps).length === 0 || !thisDapp) return null;

  const value = (required
    ? thisDapp.requiredFields
        .find((field) => field.key === name)
        ?.options?.find(
          (option) =>
            option.value ===
            thisDapp.requiredFields.find((field) => field.key === name)?.value,
        )
    : thisDapp.optionalFields[optionalIndex as number].fields.map((field) =>
        (field.options || []).find((option) => option.key === field.value),
      )?.[0]) ||
    options[0] || {
      key: '',
      title: '',
      value: '',
      icon: '',
      defaultValue: '',
      tooltip: '',
      type: '',
      options: [],
    };

  console.log('__Dropdown__', name, value);

  return (
    <div
      className={styles.dropdown}
      ref={ref}
      style={{
        // @ts-ignore
        '--background': background,
      }}
    >
      <div className={styles.dropdown__inner}>
        <div
          className={styles.dropdown__inner__content}
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          {value.icon && (
            <ImagePlaceholder
              src={value.icon || options[0].icon}
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
            key={item.key}
            className={cn(styles.dropdown__list__item, {
              [styles.dropdown__list__item__active]: value.key === item.key,
            })}
            onClick={() => {
              setIsOpenDropdown(false);
              handleOnClickOption(name, item, required, optionalIndex);
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
