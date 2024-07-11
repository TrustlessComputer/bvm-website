import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { FormOrder, ORDER_FIELD } from '../../stores';
import { DALayerEnum, NetworkEnum } from '../../Buy.constanst';
import { useOrderFormStore } from '../../stores/index_v2';
import { OrderFormOptions } from '../../Buy.data';
import useStoreDropDown from '@/modules/blockchains/Buy/stores/useStoreDropdown';

type TDropdown = {
  field: any;
  options?: {
    id: number;
    label: string;
    keyInField?: string;
    value: NetworkEnum | DALayerEnum | number;
    icon?: string;
    isDisabled?: boolean;
    avalaibleNetworks?: NetworkEnum[];
  }[];
  checkDisable?: boolean;
  title: string;
  defaultValue: DALayerEnum | NetworkEnum;
  cb: (value: DALayerEnum | NetworkEnum | number) => void;
};

function DropdownV2({
  field,
  options,
  cb,
  title,
  defaultValue,
  checkDisable = false,
}: TDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { network, setDataAvaibilityChain } = useOrderFormStore();
  // const { setIdDropdownCurrent, idDropdownCurrent } = useStoreDropDown();

  useOnClickOutside(ref, () => setIsOpen(false));

  const handleSelectField = (value: DALayerEnum | NetworkEnum | number) => {
    if (field === ORDER_FIELD.NETWORK) {
      const value = handleFindData(network);
      if (value && value.length > 0) {
        setDataAvaibilityChain(value[0].value);
      }
    }

    cb(value);
    setIsOpen(false);
  };
  const handleFindData = (networkSelected: NetworkEnum) => {
    const optionsDataAvailable =
      OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].options;
    const values = optionsDataAvailable?.filter((item) => {
      return item.avalaibleNetworks?.includes(networkSelected);
    });
    return values;
  };
  const icon = options?.find((item) => item.value === defaultValue)?.icon;

  return (
    <div className={s.dropdown}>
      <div className={s.dropdown_inner} onClick={() => setIsOpen(true)}>
        <div className={s.dropdown_inner_content}>
          {icon && <Image src={icon} alt="icon" width={24} height={24} />}
          <p className={s.dropdown_text}>
            {options?.find((item) => item.value === defaultValue)?.label}
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
            {options?.map((option, index) => {
              const isDisabled =
                checkDisable && !option.avalaibleNetworks?.includes(network);

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
