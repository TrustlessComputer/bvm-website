import React, { useRef, useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { iconToolNames } from '../../Buy.data';

type TDropdown = {
  disabled?: boolean;
  options?: (IModelOption & {
    value: string | number;
    label: string;
  })[];
  checkDisable?: boolean;
  defaultValue: string | number;
  cb: (value: string | number) => void;
  isCustomView?: boolean;
};

function DropdownV2({
  options,
  cb,
  defaultValue,
  disabled = false,
  isCustomView,
}: TDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { field } = useOrderFormStoreV3();
  const [_icon, setIcon] = useState<string | null>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const handleSelectField = (value: string | number) => {
    cb(value);
    setIsOpen(false);
  };

  const icon = options?.find((item) => item.value === defaultValue)?.icon;

  React.useEffect(() => {
    setIcon(
      iconToolNames.find(
        (item) =>
          icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
          item,
      ) || null,
    );
  }, [icon]);

  return (
    <div className={s.dropdown}>
      <div
        className={s.dropdown_inner}
        onClick={() => {
          if (disabled) return;
          setIsOpen(true);
        }}
      >
        {isCustomView ? (
          <div className={s.dropdown_inner_content}>
            {!options ||
              (options[0].icon && (
                <Image
                  src={options[0].icon}
                  alt="icon"
                  width={24}
                  height={24}
                />
              ))}
            <p className={s.dropdown_text}>{options ? options[0].title : ''}</p>
          </div>
        ) : (
          <div className={s.dropdown_inner_content}>
            {icon && (
              <Image src={_icon || icon} alt="icon" width={24} height={24} />
            )}
            <p className={s.dropdown_text}>
              {options?.find((item) => item.value === defaultValue)?.title ||
                options?.find((item) => item.value === defaultValue)?.label}
            </p>
          </div>
        )}

        {(options?.length || 0) > 1 && (
          <Image
            className={s.dropdown_icon}
            src="/landingV3/svg/arrow-b.svg"
            alt="Arrow Icon"
            aria-hidden="true"
            width={16}
            height={16}
          />
        )}
      </div>
      <div
        className={`${s.dropdown_list} ${isOpen && s.dropdown_list__active}`}
      >
        <div className={s.dropdown_wrap} ref={ref}>
          <ul className={`${s.dropdown_list_inner} `}>
            {options?.map((option, index) => {
              const isDisabled =
                !!(
                  option.supportNetwork &&
                  option.supportNetwork !== 'both' &&
                  option.supportNetwork !== field['network']?.value
                ) || !option.selectable;

              return (
                <li
                  key={index}
                  className={`${s.dropdown_item} ${
                    defaultValue === option.value && s.dropdown_item__active
                  } ${isDisabled && s.dropdown_item__disabled}`}
                  onClick={() => {
                    if (isDisabled) return;
                    handleSelectField(option.value);
                  }}
                >
                  {option.icon && (
                    <Image
                      src={option.icon}
                      alt="icon"
                      width={24}
                      height={24}
                      className={s.dropdown_item_icon}
                    />
                  )}
                  <p>{option.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DropdownV2);
