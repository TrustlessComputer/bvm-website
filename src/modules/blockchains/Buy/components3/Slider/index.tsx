import s from './styles.module.scss';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '@hooks/useOnClickOutside';


const Slider = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / 100}% 100%` }; };
  return (
    <div className={s.dropdown} >
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
          <p className={s.text}>{value}</p>
          <input style={{accentColor: '#fff'}} type="range" value={value}  min="1" max="100" onInput={(e) => setValue(e.currentTarget.value)} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
