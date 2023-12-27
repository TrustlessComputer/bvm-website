'use client';

import { useEffect } from 'react';
import s from './style.module.scss';

const TestPage = () => {
  useEffect(() => {
    console.log('TestPage render ready!');
  }, []);

  return (
    <div className={s.container}>
      <p>TestPage Content.....</p>
    </div>
  );
};

export default TestPage;
