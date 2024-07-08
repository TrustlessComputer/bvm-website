'use client';

import React from 'react';
import s from './styles.module.scss';
import { TBlog, TPagination } from '../data_blog';
import Card from './Card';
import Filter from './Filter';

export default function ListBlog({ data, total }: Posts) {

  //todo @max
  return (
    <div className={`${s.wrapper} containerV3`}>
      <Filter />
      <div className={s.list}>
        {data?.map((item, index) => {
          return (
            <div className={s.card}>
              <Card {...item} key={item.slug} isFirst={index === 0} />
            </div>
          );
        })}
      </div>
      <div className={s.btn}>
        Load more
      </div>
    </div>
  );
}
