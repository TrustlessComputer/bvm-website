'use client';

import React from 'react';
import s from './styles.module.scss';
import Card from './Card';
import Filter from './Filter';
import { useRouter } from 'next/navigation';

type TListBlog = Posts & {
  className?: string;
  isHome?: boolean;
  listBlog: Blog[];
  setPage: any;
}

export default function ListBlog({ data, total, per_page, page, className, isHome, listBlog, setPage }: TListBlog) {
  const totalPage = Math.ceil(total/per_page);

  function handleLoadMore() {
    setPage(page+1)
  }

  return (
    <div className={`${s.wrapper} containerV3`}>
      <Filter />
      <div className={s.list}>
        <div className={`${s.listTop} ${s.listItem}`}>
          <div className={s.hl}>
            {listBlog?.slice(0, 1)?.map((item, index) => {
              return (
                <div className={s.card}>
                  <Card {...item} key={item.slug} isFirst={index === 0} showExcerpt/>
                </div>
              );
            })}
          </div>
          <div className={s.sc}>
            {listBlog?.slice(1, 3)?.map((item, index) => {
              return (
                <div className={s.card}>
                  <Card {...item} key={item.slug}  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${s.listBottom} ${s.listItem}`}>
          {listBlog?.slice(3, listBlog.length)?.map((item, index) => {
            return (
              <div className={s.card}>
                <Card {...item} key={item.slug} />
              </div>
            );
          })}
        </div>
      </div>
      {
        (totalPage > 1 && page < totalPage) && (
          <div className={s.btn} onClick={()=> handleLoadMore()}>
            Load more
          </div>
        )
      }

    </div>
  );
}
