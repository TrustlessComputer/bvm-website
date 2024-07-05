'use client';

import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';
import { transformObject } from '@utils/transformObjectGraphQL';


type TBlogModule = {
  blogsData: []
}

export default function BlogModule({ blogsData }: TBlogModule) {
  const formattedKeyObj = transformObject(blogsData)
  return (
    <div className={s.blog}>
      <ListBlog listBlog={formattedKeyObj} />
    </div>
  );
}
