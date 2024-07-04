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
  suffix?: string;
};

const Slider = ({
  cb,
  defaultValue,
  field,
  max = 100,
  suffix,
  min = 0,
}: TSlider) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const onChange = (value: number) => {
    cb(field, value.toString());
  };
  console.log('defaultValue', defaultValue);
  return (
    <div className={s.dropdown}>
      <div className={s.dropdown_inner} onClick={() => setIsOpen(!isOpen)}>
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
          {/*<input style={{accentColor: '#fff'}} type="range" value={value}  min="1" max="100" onInput={(e) => setValue(e.currentTarget.value)} />*/}
          <SliderReact
            // isDisabled={
            //   !!packageParam && Number(packageParam) === PRICING_PACKGE.Hacker
            // }
            onChange={onChange}
            value={Number(defaultValue)}
            min={min} // 2 hours
            max={max} // 24 hours
            step={1}
          >
            <SliderTrack className={s.slider}>
              <SliderFilledTrack bg={'#ffffff'} />
            </SliderTrack>
            <SliderThumb boxSize={5}></SliderThumb>
          </SliderReact>
        </div>
      </div>
    </div>
  );
};

export default Slider;
