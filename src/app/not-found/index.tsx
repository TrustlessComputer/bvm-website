'use client';

import { useEffect } from 'react';
import s from './style.module.scss';

const NotFoundPage = () => {
  useEffect(() => {
    console.log('NotFoundPage EFFECT ');
  }, []);

  return (
    <div className={s.container}>
      <p>Page Not Found...</p>
    </div>
  );
};

export default NotFoundPage;
