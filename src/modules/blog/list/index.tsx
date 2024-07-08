'use client';

import React from 'react';
import s from './styles.module.scss';
import { TBlog, TPagination } from '../data_blog';
import Card from './Card';
import Filter from './Filter';

type TListBlog = {
  listBlog: Blog[];
}

export default function ListBlog({ listBlog }: TListBlog) {
  console.log('listBlog', listBlog);
  return (
    <div className={`${s.wrapper} containerV3`}>
      <Filter />
      <div className={s.list}>
        {listBlog?.map((item, index) => {
          return (
            <Card {...item} key={item.slug} isFirst={index === 0} />
          );
        })}
      </div>
      <div className={s.btn}>
        Load more
      </div>
    </div>
  );
}
