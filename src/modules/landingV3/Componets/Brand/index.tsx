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
              <div className={s.brand_item} key={item.title}>
                <Image
                  className={s.brand_item_img}
                  src={item.icon}
                  width={289}
                  height={242}
                  alt="brand"
                />
                <span className={s.brand_item_text}>
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
