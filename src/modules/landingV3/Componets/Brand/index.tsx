import React from 'react';
import { DATA_BRAND } from '../../data-sections';
import Image from 'next/image';
import s from './styles.module.scss';
export default function Brand() {
  return (
    <div className={s.wrapper}>
      <div className="containerV3">
        <div className={s.brand}>
          {DATA_BRAND.map((item) => {
            return (
              <Image
                className={s.brand_item}
                src={item}
                width={289}
                height={242}
                alt="brand"
                key={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
