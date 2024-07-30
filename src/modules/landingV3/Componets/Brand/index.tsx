import React from 'react';
import { DATA_BRAND } from '../../data-sections';
import s from './styles.module.scss';
import Image from 'next/image';

export default function Brand() {
  return (
    <div className={s.wrapper}>
      <div className="containerV3">
        <h2 className={s.heading}>
          The complete blockchain-as-a-service platform powered by the best blockchain products
        </h2>
        <div className={s.brand}>
          {DATA_BRAND.map((item) => {
            return (
              <div className={s.brand_item} key={item.title}>
                <Image
                  className={s.brand_item_img}
                  src={item.icon}
                  width={180}
                  quality={100}
                  height={73}
                  alt="brand"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
