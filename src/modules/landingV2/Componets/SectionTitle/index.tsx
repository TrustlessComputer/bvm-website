import s from './style.module.scss';
import { PropsWithChildren } from 'react';

interface IProp extends PropsWithChildren {
  textAlign?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  children,
  textAlign = 'center',
  className,
}: IProp) {
  return (
    <div>
      <h2 className={`${s.heading} ${s[`heading__${textAlign}`]} ${className}`}>
        {children}
      </h2>
    </div>
  );
}
