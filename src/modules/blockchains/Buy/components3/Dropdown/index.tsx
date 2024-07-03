import React, { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { FormOrder } from '../../stores';
import { DALayerEnum, NetworkEnum } from '../../Buy.constanst';

type TDropdown = {
  field: keyof FormOrder;
  options: {
    label: string;
    id: number;
    value: DALayerEnum | NetworkEnum;
    icon?: string;
  }[];
  defaultValue: DALayerEnum | NetworkEnum;
  cb: (feild: keyof FormOrder, value: DALayerEnum | NetworkEnum) => void;
};
export default function Dropdown({
  options,
  cb,
  field,
  defaultValue,
}: TDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const handleSelectField = (value: DALayerEnum | NetworkEnum) => {
    console.log('value', value);
    cb(field, value);
    setIsOpen(false);
  };
  const icon = options.find((item) => item.value === defaultValue)?.icon;
  return (
    <div className={s.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <div className={s.dropdown_inner}>
        <div className={s.dropdown_inner_content}>
          {icon && <Image src={icon} alt="icon" width={24} height={24} />}
          <p className={s.dropdown_text}>
            {options.find((item) => item.value === defaultValue)?.label}
          </p>
        </div>

        <Image
          className={s.dropdown_icon}
          src="/landingV3/svg/arrow-b.svg"
          alt="Arrow Icon"
          aria-hidden="true"
          width={16}
          height={16}
        />
      </div>
      <div
        className={`${s.dropdown_list} ${isOpen && s.dropdown_list__active}`}
      >
        <div className={s.dropdown_wrap} ref={ref}>
          <ul className={`${s.dropdown_list_inner} `}>
            {options.map((option, index) => (
              <li
                key={index}
                className={`${s.dropdown_item} ${
                  defaultValue === option.value && s.dropdown_item__active
                }`}
                onClick={() => {
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
