'use client';

import React from 'react';
import s from './styles.module.scss';
import { BLOGS } from '../constant';
import SectionTitle from '../../SectionTitle';
import ItemArticle from '../Article/ItemArticle';

export default function Section7Mobile() {
  return (
    <div className={s.wrapper}>
      <div className="container">
        <SectionTitle className={s.wrapper_title}>
          Oh, and the press loves us too!
        </SectionTitle>
        <div className={s.wrapper_lists}>
          {BLOGS.map((item, index) => {
            return <ItemArticle data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
