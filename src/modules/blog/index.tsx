'use client';

import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import ListBlog from './list';
import { fetchAllPosts } from '@/services/blog';

export default function BlogModule({ ...props }) {
  const [dataBlog, setDataBlog] = useState<Posts>({...props.searchParams})
  const [list, setList] = useState<Blog[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    (async () => {
      await fetchAllPosts({...props.searchParams, page}).then((res) => {
        setDataBlog(res)
        if(res.data.length > 0) {
          setList([...list , ...res.data])
        }
      })
    })()
  }, [props.searchParams, page]);

  return (
    <div className={s.blog}>
      <ListBlog {...dataBlog} listBlog={list} isHome setPage={setPage} setList={setList}/>
    </div>
  );
}
