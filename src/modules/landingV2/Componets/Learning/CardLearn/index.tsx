import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
import Image from 'next/image';
type TCardLearn = {
  title: string;
  decs: string;
  isLast: boolean;
};

export default function CardLearn({ decs, title, isLast }: TCardLearn) {
  return (
    <div className={cn(s.wrapper, isLast && s.wrapper_last)}>
      <div className={s.inner}>
        <h3 className={s.inner_title}>{title}</h3>
        {!isLast ? (
          <p className={s.inner_decs}>{decs}</p>
        ) : (
          <figure className={s.inner_wrapImg}>
            <Image
              className={s.inner_wrapImg_img}
              alt="img_video_learn"
              width={352}
              height={140}
              src="/landing-v2/images/img_video_learn.png"
            />
          </figure>
        )}
      </div>
    </div>
  );
}
