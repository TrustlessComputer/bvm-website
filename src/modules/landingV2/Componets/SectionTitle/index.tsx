import s from './style.module.scss';
import { PropsWithChildren } from 'react';

export default function SectionTitle({ children }: PropsWithChildren) {

  return <div>
    <h2 className={s.heading}>{children}</h2>
  </div>;
}
