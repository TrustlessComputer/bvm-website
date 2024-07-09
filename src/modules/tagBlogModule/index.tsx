'use client'

import ListBlog from '@/modules/blog/list';
import React from 'react';
import s from './styles.module.scss';
import Card from '@/modules/blog/list/Card';
import Filter from '@/modules/blog/list/Filter';

const TagBlogModule = (props: Posts) => {
  return (
    <div className={s.wrapper}>
      {/*<ListBlog {...props} className={s.list} isHome={false}/>*/}
      <div className={'containerV3'}>
        <Filter />
        <div className={s.inner}>
          {
            props.data.map(item => {
              return (
                <Card {...item} key={item.slug} />
              )
            })
          }

        </div>
      </div>

    </div>
  )
}
export default TagBlogModule;
