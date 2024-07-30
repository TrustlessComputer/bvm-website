import s from './styles.module.scss';
import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {

  return <div className={`${s.container} container`}>
    {children}
  </div>;
}
