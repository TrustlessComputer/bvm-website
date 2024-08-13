import React from 'react';
import { SectionBlockProps } from '../../interface';

const SectionBlock = (props: SectionBlockProps) => {
  const { tag, title, item } = props;

  return (
    <div>
      <div>{tag}</div>
      <div>{title}</div>
      {item.map((i) => {
        return (
          <div key={i.name}>
            <div>{i.name}</div>
            <div>{i.thumbnail}</div>
            <div>{i.desc}</div>
            <div>{i.tags.join(', ')}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionBlock;
