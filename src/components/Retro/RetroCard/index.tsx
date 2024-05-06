import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';

export interface RetroCardProps extends PropsWithChildren{
  src: string,
  title: string
}

function Card({children, title, src}: RetroCardProps): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      <div className={s.thumbnail}>
        <ImagePlaceholder src={src} alt={'thumbnail'} width={1003} height={1002} />
      </div>
      <div className={s.content}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.desc}>{children}</div>
      </div>
    </div>
  )
}

export default Card
