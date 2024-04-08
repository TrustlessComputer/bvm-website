import s from './style.module.scss';
import { PropsWithChildren } from 'react';

interface IProp extends PropsWithChildren {
  textAlign?: 'left' | 'center';
}

export default function SectionTitle({ children, textAlign = 'center' }: IProp) {

  return <div>
    <h2 className={`${s.heading} ${s[`heading__${textAlign}`]}`}>{children}</h2>
  </div>;
}
