'use client'
import React from 'react';
import s from './style.module.scss';
import HomeTitle from '../../components/HomeTitle';
import HomeContainer from '../../components/HomeContainer';
import ListItem from './ListItem';
import { AIData } from './data';

const OpenAI = () => {
  return (
    <div className={s.aiSection}>
      <HomeContainer className={s.container}>
        <div className={s.wrapTitle}>
          <HomeTitle className={s.aiSection_title}>
            <span>Why</span> truly open AI?
          </HomeTitle>
          <p className={s.aiSection_desc}>
            It’s about redining what’s possible and transforming the way we build AI and interact with AI in our daily lives. It opens doors to opprtunities we’ve yet to imagine.
          </p>
        </div>

        <div className={s.aiSection_list}>
          {AIData.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              content={item.content}
              content2={item.content2}
              icon={item.icon}
            />
          ))}
        </div>
      </HomeContainer>
    </div>
  );
};

export default OpenAI;
