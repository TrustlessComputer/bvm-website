'use client';

import s from './styles.module.scss';
import Socials from '@/modules/blog/detail/Socials';
import ImagePlaceholder from '@components/ImagePlaceholder';
import dayjs from 'dayjs';
import Tags from '@/modules/blog/detail/Tags';
import React, { useEffect, useState } from 'react';
import Card from '@/modules/blog/list/Card';
import { fetchRelatedPostsById } from '@/services/blog';
import List from '@/modules/blog/detail/List';

export type TBLogDetail = {
  blogData: Blog;
}

export default function BLogDetail({ blogData }: TBLogDetail) {
  const { post_content, title, thumbnail, id, date, author, tags, view_count } = blogData;
  const [relate, setRelatePost] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      const relativePost = await fetchRelatedPostsById(id);
      setRelatePost(relativePost);
    })();
  }, []);

  return (
    <div className={`${s.logDetail}`}>
      <div className="main containerV3">
        <div className={s.top}>
          <div className={s.thumnail}>
            <List title={blogData.title} />
            <ImagePlaceholder src={thumbnail} alt={title} width={980} height={300} />
            <div className="wrapContent">
              <div
                className={s.content}
                dangerouslySetInnerHTML={{ __html: post_content || '' }}
              />

            </div>
          </div>
          <div className={s.heading}>
            <div className={s.heading_inner}>
              <p className={s.heading_text}>{title}
              </p>
              <div className={s.heading_meta}>
                <p className={s.heading_author}>{author.display_name} | {dayjs(date).format('MMM D, YYYY')}</p>
                <p
                  className={s.heading_author}>{`${view_count ? view_count : 0} ${view_count > 1 ? 'views' : 'view'}`} </p>
              </div>
              <div className={s.divider}></div>
              <Socials {...blogData} />
            </div>
          </div>
        </div>
        <div className="auth"></div>
        <div className={s.meta}>
          <Tags tags={tags || []} />
          <Socials {...blogData} />
        </div>
      </div>
      {
        relate.length && (
          <div className={`${s.relative}`}>
            <div className={'containerV3'}>
              <p className={s.relative_heading}>Related Posts</p>
              <div className={`${s.inner} `}>
                {relate?.map((item) => {
                  return (
                    <Card {...item} key={item.slug} isFirst={false} />
                  );
                })}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
