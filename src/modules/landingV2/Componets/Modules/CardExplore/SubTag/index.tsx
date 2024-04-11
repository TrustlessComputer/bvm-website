import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
export type TSubTag = { subTitle: string; color?: string }[];
type TSub = {
  type?: 'modules' | 'solutions';
  tags: TSubTag;
};
export default function SubTag({ tags, type }: TSub) {
  return (
    <div className={s.tags}>
      {tags &&
        tags.map((tag) => {
          return (
            <div
              className={cn(
                s.tags_item,
                s[`tags_item__${type}`],
                // tag.color && s[`tags_item__${tag.color}`],
              )}
            >
              <p className={cn(s.tags_item_text)}>{tag.subTitle}</p>
            </div>
          );
        })}
    </div>
  );
}
