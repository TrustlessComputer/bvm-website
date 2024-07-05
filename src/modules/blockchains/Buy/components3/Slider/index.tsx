import React, { useEffect } from 'react';

import { formatCurrencyV2 } from '@/utils/format';
import {
  SliderFilledTrack,
  Slider as SliderReact,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FormOrder } from '../../stores';
import s from './styles.module.scss';

type TSlider = {
  defaultValue: string | number;
  field: keyof FormOrder;
  cb: (feild: keyof FormOrder, value: string) => void;
  max?: number;
  min?: number;
  step?: number;
  suffix?: string;
  initValue?: number;
  initNoti?: React.ReactNode;
};

const Slider = ({
  cb,
  defaultValue,
  field,
  max = 100,
  suffix,
  min = 0,
  step = 1,
  initValue,
  initNoti = 'This value can not be modified',
}: TSlider) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const onChange = (value: number) => {
    if (initValue) return;

    cb(field, value.toString());
  };
  useEffect(() => {
    if (initValue) {
      cb(field, initValue.toString());
    }
  }, [initValue]);

  return (
    <div className={s.dropdown}>
      <div
        className={s.dropdown_inner}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <p className={s.dropdown_text}>
          {` ${formatCurrencyV2({
            amount: defaultValue.toString(),
            decimals: 0,
          })} ${suffix ?? ''}`}{' '}
        </p>
        <Image
          className={s.dropdown_icon}
          src="/landingV3/svg/arrow-b.svg"
          alt="Arrow Icon"
          aria-hidden="true"
          width={16}
          height={16}
        />
      </div>

      {initValue?.toString() ? (
        <div
          className={`${s.dropdown_list} ${isOpen && s.dropdown_list__active}`}
        >
          <div className={` ${s.dropdown_wrap_init}`} ref={ref}>
            {initNoti}
          </div>
        </div>
      ) : (
        <div
          className={`${s.dropdown_list} ${isOpen && s.dropdown_list__active}`}
        >
          <div className={s.dropdown_wrap} ref={ref}>
            <p className={s.text}>
              {`${formatCurrencyV2({
                amount: defaultValue.toString(),
                decimals: 0,
              })} ${suffix ?? ''}`}{' '}
            </p>
            <SliderReact
              onChange={onChange}
              value={Number(defaultValue)}
              min={min}
              max={max}
              step={step}
            >
              <SliderTrack className={s.slider}>
                <SliderFilledTrack bg={'#ffffff'} />
              </SliderTrack>
              <SliderThumb boxSize={5}></SliderThumb>
            </SliderReact>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Slider);
