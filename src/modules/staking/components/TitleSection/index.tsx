import { PropsWithChildren } from 'react';
import s from './styles.module.scss';

export default function TitleSection({ children }: PropsWithChildren) {
  return (
    <h2 className={s.titleSection}>
      {children}
    </h2>
  );
}
