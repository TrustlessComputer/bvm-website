import { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import cn from 'classnames';

interface IProp extends PropsWithChildren {
  title: string;
  indexActive: boolean;
}

export default function ScalableContent({
  title,
  children,
  indexActive,
}: IProp) {
  return (
    <div className={cn(s.scalableContent, indexActive && s.indexActive)}>
      <h3 className={s.scalableContent_heading}>{title}</h3>
      <div className={s.scalableContent_content}>{children}</div>
    </div>
  );
}
