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
      <div className={s.list}>
        <div className={`${s.listTop} ${s.listItem}`}>
          <div className={s.hl}>
            {data.slice(0, 1)?.map((item, index) => {
              return (
                <div className={s.card}>
                  <Card {...item} key={item.slug} isFirst={index === 0} />
                </div>
              );
            })}
          </div>
          <div className={s.sc}>
            {data.slice(1, 3)?.map((item, index) => {
              return (
                <div className={s.card}>
                  <Card {...item} key={item.slug} isFirst={index === 0} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${s.listBottom} ${s.listItem}`}>
          {data.slice(3, data.length)?.map((item, index) => {
            return (
              <div className={s.card}>
                <Card {...item} key={item.slug} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.btn}>
        Load more
      </div>
    </div>
  );
}
