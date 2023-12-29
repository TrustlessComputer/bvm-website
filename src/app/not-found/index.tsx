'use client';

import { useEffect } from 'react';
import s from './style.module.scss';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <p>404: Page Not Found...</p>
    </div>
  );
};

export default NotFoundPage;
