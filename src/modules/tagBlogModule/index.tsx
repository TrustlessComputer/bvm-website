import ListBlog from '@/modules/blog/list';
import React from 'react';
import s from './styles.module.scss';

const TagBlogModule = (props: Posts) => {
  return (
    <div className={s.wrapper}>
      <ListBlog {...props} className={s.list} isHome={false}/>
    </div>
  )
}
export default TagBlogModule;
