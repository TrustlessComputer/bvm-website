'use client';

import React from 'react';
import s from './styles.module.scss';
import { DATA_BLOG, TBlog, TPagination } from '../data_blog';
import Card from './Card';
import Filter from './Filter';

type TListBlog = {
  listBlog: TBlog[];
  pagination: TPagination;
}

export default function ListBlog({ listBlog, pagination }: TListBlog) {
  console.log('pagination', pagination);
  return (
    <div className={`${s.wrapper} containerV3`}>
      <Filter />
      <div className={s.list}>
        {listBlog?.map((item, index) => {
          return <Card key={item.slug} {...item} isFirst={index === 0} />;
        })}
      </div>
      <div className={s.btn}>
        Load more
      </div>
    </div>
  );
}
