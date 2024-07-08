'use client';

import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';


type TBlogModule = {
  blogsData: Blog[]
}

export default function BlogModule({ blogsData }: TBlogModule) {
  return (
    <div className={s.blog}>
      <ListBlog listBlog={blogsData} />
    </div>
  );
}
