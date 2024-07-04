import React from 'react';
import s from './styles.module.scss';
import { DATA_BLOG } from '../data_blog';
import Card from './Card';

export default function ListBlog() {
  return (
    <div className={`${s.wrapper} containerV3`}>
      <div className={s.list}>
        {DATA_BLOG.map((item, index) => {
          return <Card key={item.slug} {...item} isFirst={index === 0} />;
        })}
      </div>
    </div>
  );
}
