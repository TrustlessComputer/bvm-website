import React from 'react';
import s from './style.module.scss';

type IHeading = {
  className?: string;
  title: string;
  desc: string;
};

const Heading = ({ className, title, desc }: IHeading) => {
  return (
    <div className={`${s.container} container`}>
      <div
        className={`${s.heading} ${className}`}
      >
        <h2 className={s.heading_title}>{title}</h2>
        <p className={s.heading_desc}>{desc}</p>
      </div>
    </div>
  );
};

export default Heading;
