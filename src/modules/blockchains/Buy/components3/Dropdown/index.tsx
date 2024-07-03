import React, { useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { FormOrder } from '../../stores';

type TDropdown = {
  field: keyof FormOrder;
  options: {
    label: string;
    id: number;
    value: string;
    icon?: string;
  }[];
  cb: (feild: keyof FormOrder, value: string) => void;
};
export default function Dropdown({ options, cb, field }: TDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(options[0].label);

  const handleSelectField = (value: string) => {
    console.log('value ', value);
    cb(field, value);
    setIsOpen(false);
    setValue(value);
  };
  const icon = options.find((item) => item.label === value)?.icon;
  return (
    <div className={s.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <div className={s.dropdown_inner}>
        <div className={s.dropdown_inner_content}>
          {icon && <Image src={icon} alt="icon" width={24} height={24} />}
          <p className={s.dropdown_text}>{value}</p>
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
        <div className={s.dropdown_wrap}>
          <ul className={`${s.dropdown_list_inner} `}>
            {options.map((option, index) => (
              <li
                key={index}
                className={`${s.dropdown_item} ${
                  value === option.label && s.dropdown_item__active
                }`}
                onClick={() => {
                  handleSelectField(option.label);
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
