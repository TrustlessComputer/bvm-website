import React from 'react';
import s from './styles.module.scss';
import Image, { StaticImageData } from 'next/image';

type TArticle = {
  title: string;
  img: StaticImageData;
  description: string;
};

function ItemArticle({ data }: { data: TArticle }) {
  return (
    <div className={s.itemArticle}>
      <Image
        src={data.img}
        alt={data.title}
        width={data.img.width}
        height={data.img.height}
      />
      <div className={s.itemArticle_content}>
        <h5 className={s.itemArticle_content_title}>{data.title}</h5>
        <p className={s.itemArticle_content_description}>{data.description}</p>
      </div>
    </div>
  );
}

export default ItemArticle;
