import React from 'react';
import s from './styles.module.scss';
import { IBlog } from '../../Section_7/constant';
import { Image } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';

export default function ItemArticle({ data }: { data: IBlog }) {
  const { mobileScreen } = useWindowSize();
  return (
    <div className={s.itemArticle}>
      <Image
        className={s.itemArticle_img}
        src={data.imageUrl}
        alt={data.title}
        width={'100%'}
        height={mobileScreen ? 'auto' : '250px'}
      />
      <div className={s.itemArticle_content}>
        <h5 className={s.itemArticle_content_title}>{data.title}</h5>
        <p className={s.itemArticle_content_description}>{data.desc}</p>
      </div>
    </div>
  );
}
