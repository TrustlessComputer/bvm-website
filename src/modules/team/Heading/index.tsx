import React from 'react';
import s from './styles.module.scss';

export default function Heading() {
  return (
    <div className={`containerV3`}>
      <div className={s.headingWrapper}>
        <h1 className={s.headingWrapper_title}>Our Story</h1>
        <p className={s.headingWrapper_decs}>
          Earlier this year, our team began working on something new. And
          whenever new ideas come up, we ask each other this question: where do
          we see this project in 5 years?
        </p>
      </div>
    </div>
  );
}
