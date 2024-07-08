import React from 'react';
import { TBlog } from '../../data_blog';
import s from './styles.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import ImagePlaceholder from '@components/ImagePlaceholder';

export default function Card({
                               excerpt,
                               slug,
                               featuredImage,
                               title,
                               view,
                               date,
                               className,
                               author,

                               isFirst,
                             }: TBlog & {
  author: { node: { name: string } };
  featuredImage: { node: { sourceUrl: string } };
  excerpt: string;
  className?: string;
  date: string;
  isFirst?: boolean
}) {

  return (
    <Link href={`/blog/${slug}`}
          className={`${s.wrapper} ${className} ${isFirst && s.isFirst}`}
    >
      <div className={s.inner}>
        <div className={s.thumbnail}>
          <ImagePlaceholder width={800} height={4000} src={featuredImage?.node?.sourceUrl} alt="thumbnail" />
        </div>
        <div className={s.content}>
          <h3 className={s.content_title}>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <p className={s.content_decs} dangerouslySetInnerHTML={{ __html: excerpt }} />
          <div className={s.content_sub}>
            <div className={s.content_sub__left}>
              <p>{`${author.node.name} | ${dayjs(date).format('MMM D, YYYY')}`}</p>
            </div>
            <div className={s.content_sub__right}>
              <p>{`${view ? view : 0} ${view > 1 ? 'views' : 'view'}`} </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
