'use client';

import React from 'react';
import s from './styles.module.scss';
import Card from './Card';
import Filter from './Filter';

type TListBlog = Posts & {
  className: string;
  isHome: boolean;
}

export default function ListBlog({ data, total, per_page, page, className, isHome }: TListBlog) {
  // const n =  Math.ceil(total/per_page);

  return (
    <div className={`${s.wrapper} containerV3`}>
      <Filter />
      <div className={`${s.list} ${className}`}>
        {data?.map((item, index) => {
          return (
            <div className={`${s.card} ${!isHome && s.fullWidth}`}>
              <Card {...item} key={item.slug} isFirst={isHome && index === 0} />
            </div>
          );
        })}
      </div>
      {/*{*/}
      {/*  num > 1 &&*/}
      {/*  <div className={s.pagination}>*/}
      {/*    {[...Array(num)].map((_, i) => (*/}
      {/*      <span key={i} className={`${page === i + 1? s.active : ''}`}>{i + 1}</span>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*}*/}
      {
        page > 1 &&
        <div className={s.btn}>
          Load more
        </div>
      }
    </div>
  );
}
