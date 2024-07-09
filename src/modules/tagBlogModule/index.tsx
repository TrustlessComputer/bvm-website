'use client';

import React from 'react';
import s from './styles.module.scss';
import Card from '@/modules/blog/list/Card';
import Filter from '@/modules/blog/list/Filter';

const TagBlogModule = (props: Posts) => {
  return (
    <div className={s.wrapper}>
      <Filter />
      <div className={'containerV3'}>
        <div className={s.inner}>
          {
            props.data.map(item => {
              return (
                <Card {...item} key={item.slug} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
export default TagBlogModule;
