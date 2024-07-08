import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import ImagePlaceholder from '@components/ImagePlaceholder';

export default function Card({
                               excerpt,
                               slug,
                               list_thumbnail,
                               title,
                               view_count,
                               className,
                               author,
                               isFirst,
                               date,
                             }: Blog & {
  className?: string;
  isFirst?: boolean
}) {

  return (
    <Link href={`/blog/${slug}`}
          className={`${s.wrapper} ${className} ${isFirst && s.isFirst}`}
    >
      <div className={s.inner}>
        <div className={`${s.thumbnail} ${isFirst && s.highlight}`}>
          <ImagePlaceholder width={800} height={4000} src={list_thumbnail} alt="thumbnail" />
        </div>
        <div className={s.content}>
          <h3 className={s.content_title}>
            {title}
          </h3>
          <p className={s.content_decs}>{excerpt}</p>
          <div className={s.content_sub}>
            <div className={s.content_sub__left}>
              <p>{`${author.display_name} | ${dayjs(date).format('MMM D, YYYY')}`}</p>
            </div>
            <div className={s.content_sub__right}>
              <p>{`${view_count ? view_count : 0} ${view_count > 1 ? 'views' : 'view'}`} </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
