import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { Box, Image } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import { IBlog, LOGOS } from '../../constant';

export default function ItemArticle({ data }: { data: IBlog }) {
  const { mobileScreen } = useWindowSize();
  const getLogo = useMemo((): string => {
    const tmp = LOGOS.filter((itemLogo) => {
      return itemLogo.id === data.logo;
    });
    return tmp.length ? tmp[0].img : '';
  }, [data]);
  return (
    <div className={s.itemArticle}>
      {getLogo ? (
        <div className={s.cardLogo}>
          <Image
            src={getLogo}
            alt="thumb image"
            width={'100%'}
            height={28}
            objectFit={'contain'}
          />
        </div>
      ) : (
        <Box height={'28px'} marginBottom={'16px'} />
      )}
      <figure className={s.itemArticle_wrapImg}>
        <Image
          className={s.itemArticle_wrapImg_img}
          src={data.imageUrl}
          alt={data.title}
          width={'100%'}
          height={mobileScreen ? 'auto' : '250px'}
        />
      </figure>

      <div className={s.itemArticle_content}>
        <h5 className={s.itemArticle_content_title}>{data.title}</h5>
        <p className={s.itemArticle_content_description}>{data.desc}</p>
      </div>
    </div>
  );
}
