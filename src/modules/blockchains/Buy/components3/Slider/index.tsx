import s from './styles.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { FormOrder } from '../../stores';

const Slider = ({
  cb,
  field,
}: {
  cb: (field: keyof FormOrder, value: string) => void;
  field: keyof FormOrder;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('0');

  const hanldeChangeData = (value: string) => {
    console.log('value', value);
    cb(field, value);
    setValue(value);
  };
  return (
    <div className={s.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <div className={s.dropdown_inner}>
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
        <div className={s.dropdown_wrap}>
          <p className={s.text}>{value}</p>
          <input
            type="range"
            value={value}
            min="1"
            max="100"
            onChange={(e) => hanldeChangeData(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
