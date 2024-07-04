import React from 'react';
import s from './styles.module.scss';

const DATA_FILTER = ['Newest', 'Most Viewed'];

export default function Filter() {
  return (
    <div className={s.filter}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.list}>
          {DATA_FILTER.map((item) => {
            return (
              <div className={s.list_item} key={item}>
                <p className={s.list_item_text}> {item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
