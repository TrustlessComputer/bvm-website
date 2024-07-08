import React from 'react';
import s from './styles.module.scss';
import { useParams } from 'next/navigation';

const DATA_FILTER = ['Newest', 'Most Viewed'];

export default function Filter() {

  const params = useParams();

  console.log('___params.filter', params.filter);

  return (
    <div className={s.filter}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.list}>
          {DATA_FILTER.map((item, idx) => {
            return (
              <div
                className={`${s.list_item} ${params.filter === item || ((!params.filter && idx === 0)) ? s.active : ''}`}
                key={item}>
                <p className={s.list_item_text}> {item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
