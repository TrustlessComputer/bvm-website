import React, { useState } from 'react';
import s from './styles.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DATA_FILTER = [{
  title: 'Newest',
  value: 'desc',
}, {
  title: 'Most Viewed',
  value: 'mostview',
}];

export default function Filter() {
  const [valueFilter, setValueFilter] = useState<string>(DATA_FILTER[0].value)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState({
    orderBy: "desc",
    // you can add more keys to this
  });

  const handleClick = (value: any) => {
    setValueFilter(value.value);

    const updatedQuery = { ...searchQuery,  orderBy: value.value };
    setSearchQuery(updatedQuery);
    updateSearchQuery(updatedQuery);
  };



  const updateSearchQuery = (updatedQuery: any) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  return (
    <div className={s.filter}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.list}>
          {DATA_FILTER.map((item) => {
            return (
              <div className={`${s.list_item} ${item.value === valueFilter && s.active}`} key={item.value} onClick={() => handleClick(item)}>
                <p className={s.list_item_text}> {item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
