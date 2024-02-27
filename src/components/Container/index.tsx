import React, { PropsWithChildren } from 'react';
import s from './style.module.scss';

const ContainerDiv: React.FC<PropsWithChildren> = ({children}) => {
  return <div className={s.container}>
    {children}
  </div>;
};

export default ContainerDiv;
