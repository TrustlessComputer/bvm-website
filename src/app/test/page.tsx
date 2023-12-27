'use client';

import { useEffect } from 'react';
import s from './style.module.scss';
import MainLayout from '@/layouts/MainLayout';

const TestPage = () => {
  useEffect(() => {
    console.log('TestPage render ready!');
  }, []);

  return (
    <MainLayout>
      <div className={s.container}>
        <p>TestPage Content.....</p>
      </div>
    </MainLayout>
  );
};

export default TestPage;
