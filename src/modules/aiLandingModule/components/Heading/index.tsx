import React from 'react';
import s from './style.module.scss';

type IHeading = {
  className?: string;
  title: string;
  desc: string;
};

const Heading = ({ className, title, desc }: IHeading) => {
  return (
    <div className={`${s.heading} ${className}`}>
      <div className={`${s.container} container`}>
        <h2 className={s.heading_title}>Decentralized AI Module</h2>
        <p className={s.heading_desc}>
          Provide the requisite infrastructure and tools essential for defining,
          training, deploying neural network models and conducting effective
          on-chain inference with these models.
        </p>
      </div>
    </div>
  );
};

export default Heading;
