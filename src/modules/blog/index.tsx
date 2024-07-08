'use client';

import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';

export default function BlogModule(props: Posts) {
  console.log('props', props);
  return (
    <div className={s.blog}>
      <ListBlog {...props} isHome />
    </div>
  );
}
