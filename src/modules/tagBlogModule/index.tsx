'use client';

import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import Card from '@/modules/blog/list/Card';
import Filter from '@/modules/blog/list/Filter';
import { fetchAllPosts } from '@/services/blog';

const TagBlogModule = ({...props}) => {
  const [dataBlog, setDataBlog] = useState<Posts>({...props.searchParams})
  const [list, setList] = useState<Blog[]>([])
  const [page, setPage] = useState<number>(1)
  const totalPage = Math.ceil(dataBlog.total/dataBlog.per_page);

  useEffect(() => {
    (async () => {
      await fetchAllPosts({...props.searchParams, page, tag: props.tag}).then((res) => {
        setDataBlog(res)
        if(res.data.length > 0) {
          setList([...list , ...res.data])
        }
      })
    })()
  }, [props.searchParams, page]);

  function handleLoadMore() {
    setPage(page+1)
  }

  return (
    <div className={s.wrapper}>
      <Filter setList={setList}/>
      <div className={'containerV3'}>
        <div className={s.inner}>
          {
            list?.map(item => {
              return (
                <Card {...item} key={item.slug} />
              );
            })
          }
        </div>
        {
          (totalPage > 1 && page < totalPage) && (
            <div className={s.btn} onClick={()=> handleLoadMore()}>
              Load more
            </div>
          )
        }
      </div>
    </div>
  );
};
export default TagBlogModule;
