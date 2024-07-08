'use client';

import s from './styles.module.scss';
import Socials from '@/modules/blog/detail/Socials';
import ImagePlaceholder from '@components/ImagePlaceholder';
import dayjs from 'dayjs';
import Tags from '@/modules/blog/detail/Tags';

export type TBLogDetail = {
  blogData: any;
}

export default function BLogDetail({ blogData }: TBLogDetail) {
  const { content, title, thumbnail, author, date, tags } = blogData;
  console.log('tags', tags);
  return (
    <div className={`${s.logDetail}`}>
      <div className="main containerV3">
        <div className={s.top}>
          <div className={s.thumnail}>
            <ImagePlaceholder src={thumbnail} alt={title} width={980} height={300} />
          </div>
          <div className={s.heading}>
            <p className={s.heading_text}>{title}
            </p>
            <div className={s.heading_meta}>
              <p className={s.heading_author}>{author.node.name} | {dayjs(date).format('MMM D, YYYY') }</p>
              <p className={s.heading_author}>0 views</p>
            </div>
            <div className={s.divider}></div>
            <Socials />
          </div>
        </div>

        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="auth"></div>
        <div className={s.meta}>
           <Tags tags={tags}/>
          <Socials />
        </div>

      </div>
    </div>
  );
}
