import React from 'react';
import s from '../styles.module.scss';
import { DATA_TEAM } from '../data-team';
import CardMember from '../CardMember';

export default function Members() {
  return (
    <div className="containerV3">
      <div className={s.ourStory_members}>
        {DATA_TEAM.map((item) => {
          return (
            <CardMember key={item.name} avatar={item.avatar} name={item.name} />
          );
        })}
      </div>
    </div>
  );
}
