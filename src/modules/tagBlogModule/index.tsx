import ListBlog from '@/modules/blog/list';
import React from 'react';
import s from './styles.module.scss'

const TagBlogModule = () => {
  return (
    <div className={s.wrapper}>
      <ListBlog />
    </div>
  )
}
export default TagBlogModule;
