import Image, { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';

type TScale = {
  title: string;
  description: string;
  img: StaticImageData;
  bottomContent: string;
  bg: string;
  subContent: string;
};

function ItemScaleableMobile({ data }: { data: TScale }) {
  return (
    <div className={`${s.itemScale} ${s[`itemScale__${data.bg}`]}`}>
      {data.title && (
        <div className={s.itemScale_top}>
          <h3 className={s.itemScale_top_heading}>{data.title}</h3>
          <p className={s.itemScale_top_description}>{data.description}</p>
        </div>
      )}
      <Image
        className={s.itemScale_img}
        alt={data.bottomContent}
        src={data.img}
        width={data.img.width}
        height={data.img.height}
      />
      <div className={s.itemScale_bottom}>
        <p className={s.itemScale_bottom_content}>{data.bottomContent}</p>
        <p className={s.itemScale_bottom_subContent}>{data.subContent}</p>
      </div>
    </div>
  );
}

export default ItemScaleableMobile;
