'use client';

import React from 'react';
import s from './styles.module.scss';
import ItemArticle from '../../Article/ItemArticle';
import { BLOGS } from '../constant';

function Section7Mobile() {
  return (
    <div className={s.wrapper}>
      <div className="container">
        <h3 className={s.wrapper_heading}>
          Oh, and the <span>press loves us too!</span>
        </h3>
        <div className={s.wrapper_lists}>
          {BLOGS.map((item, index) => {
            return <ItemArticle data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Section7Mobile;
