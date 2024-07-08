'use client';

import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';
import { transformObject } from '@utils/transformObjectGraphQL';
import { TPagination } from '@/modules/blog/data_blog';


type TBlogModule = {
  blogsData: [];
}

export default function BlogModule({ blogsData }: TBlogModule) {
  return (
    <div className={s.blog}>
      <ListBlog listBlog={blogsData} />
    </div>
  );
}
