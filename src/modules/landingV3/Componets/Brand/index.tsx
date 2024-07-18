import React from 'react';
import { DATA_BRAND } from '../../data-sections';
import Image from 'next/image';
import s from './styles.module.scss';

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
                  height={242}
                  alt="brand"
                  sizes={'100vw'}
                  quality={100}
                />
                {/*<span className={s.brand_item_text}>*/}
                {/*  {item.title}*/}
                {/*</span>*/}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
