import React from 'react';
import s from './styles.module.scss';
import ListBlog from './list';

export default function BlogModule() {
  return (
    <div className={s.blog}>
      <ListBlog />
    </div>
  );
}
