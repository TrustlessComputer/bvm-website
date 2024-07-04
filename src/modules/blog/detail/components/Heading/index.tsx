import React from 'react';
import s from './styles.module.scss';
import { TBlogDetail } from '@/modules/blog/data_blog';
import Image from 'next/image';

export default function HeadingDetails({
  author,
  category,
  thumbnail,
  title,
  updateTime,
  view,
}: TBlogDetail) {
  return (
    <div className={`${s.heading} containerV3`}>
      <div className={s.heading_thumbnail}>
        <Image src={thumbnail} width={800} height={400} alt={title} />
      </div>
      <div className={s.heading_content}>
        <p className={s.heading_content_category}>{category}</p>
        <h1>{title}</h1>
        <div className={s.heading_content_author}>
          <div className={s.author_avatar}>
            <Image
              src={author.avatar}
              width={16}
              height={16}
              alt={author.name}
            />
          </div>
          <p className={s.author_name}>
            {author.name} | {updateTime}{' '}
          </p>
          <p className={s.heaidng_content_view}>{view}</p>
        </div>
      </div>
    </div>
  );
}
