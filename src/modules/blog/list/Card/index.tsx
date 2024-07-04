import React from 'react';
import { TBlog } from '../../data_blog';
import s from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Card({
  category,
  desc,
  slug,
  thumbnail,
  title,
  updateTime,
  view,
  className,
  isFirst,
}: TBlog & { className?: string; isFirst?: boolean }) {
  const { push } = useRouter();
  return (
    <div
      className={`${s.wrapper} ${className} ${isFirst && s.isFirst}`}
      onClick={() => push(`/blog/${slug}`)}
    >
      <div className={s.inner}>
        <div className={s.thumbnail}>
          <Image width={800} height={4000} src={thumbnail} alt="thumbnail" />
        </div>
        <div className={s.content}>
          <h3 className={s.content_title}>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <p className={s.content_decs}>{desc}</p>
          <div className={s.content_sub}>
            <div className={s.content_sub__left}>
              <p>{`${category} | ${updateTime}`}</p>
            </div>
            <div className={s.content_sub__right}>
              <p>{`${view} ${view > 1 ? 'views' : 'view'}`} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
