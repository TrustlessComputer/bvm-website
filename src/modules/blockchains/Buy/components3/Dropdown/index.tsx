import React, { useRef, useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

type TDropdown = {
  options: {
    label: string;
    id: number;
    value: string;
    icon?: string;
  }[];
};
export default function Dropdown({ options }: TDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(options[0].label);
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <div className={s.dropdown}>
      <div className={s.dropdown_inner} onClick={() => setIsOpen(!isOpen)}>
        <p className={s.dropdown_text}>{value}</p>

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
                  value === option.label && s.dropdown_item__active
                }`}
                onClick={() => {
                  setIsOpen(false);
                  setValue(option.label);
                }}
              >
                {option.icon && <img src={option.icon} alt="icon" />}
                <p>{option.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
