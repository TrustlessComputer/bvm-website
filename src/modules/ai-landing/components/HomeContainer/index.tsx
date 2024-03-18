import React, { PropsWithChildren, forwardRef } from 'react';
import s from './style.module.scss';

type HomeContaienr = {
  className?: string;
  children: React.ReactNode;
};

const HomeContainer = forwardRef<HTMLDivElement, HomeContaienr>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`${'container'} ${className}`}>
        {children}
      </div>
    );
  },
);

export default HomeContainer;
