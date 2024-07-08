import ListBlog from '@/modules/blog/list';
import React from 'react';
import s from './styles.module.scss'
import { TBLogDetail } from '@/modules/blog/detail';

const TagBlogModule = ({ blogData }: TBLogDetail) => {
  return (
    <div className={s.wrapper}>
      <ListBlog listBlog={blogData} className={s.list} isHome={false}/>
    </div>
  )
}
export default TagBlogModule;
