import React from 'react';
import s from './ProblemTemplate.module.scss';

type Props = {
  topic: '1' | '2' | '3';
};

const Problem_01 = () => {
  return <div>Problem 01</div>;
};

const Problem_02 = () => {
  return <div>Problem 02</div>;
};

const Problem_03 = () => {
  return <div>Problem 03</div>;
};

const ProblemTemplate = ({ topic }: Props) => {
  return (
    <div className={s.wrapper}>
      {topic === '1' && <Problem_01 />}
      {topic === '2' && <Problem_02 />}
      {topic === '3' && <Problem_03 />}
    </div>
  );
};

export default ProblemTemplate;
