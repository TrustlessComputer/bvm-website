import { PropsWithChildren } from 'react';
import s from './styles.module.scss';

interface IProp extends PropsWithChildren {
  title: string;
}

export default function ScalableContent({
                                          title,
                                          children,
                                        }: IProp) {

  return <div className={s.scalableContent}>
    <h3 className={s.scalableContent_heading}>
      {title}
    </h3>
    <div className={s.scalableContent_content}>
      {children}
    </div>
  </div>;
}
