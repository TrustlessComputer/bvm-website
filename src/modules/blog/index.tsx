'use client';

import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';
import { transformObject } from '@utils/transformObjectGraphQL';
import { TPagination } from '@/modules/blog/data_blog';


type TBlogModule = {
  blogsData: []
  pagination: TPagination;
}

export default function BlogModule({ blogsData, pagination }: TBlogModule) {
  return (
    <div className={s.blog}>
      <ListBlog listBlog={formattedKeyObj} pagination={pagination} />
    </div>
  );
}
