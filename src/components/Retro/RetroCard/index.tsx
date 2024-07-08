import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';

export interface RetroCardProps extends PropsWithChildren{
  src: string,
  title: string,
  bgColor?: string,
}

function Card({children, title, src, bgColor}: RetroCardProps): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      <div className={s.thumbnail} style={{
        backgroundColor: bgColor ? bgColor : ''
      }}>
        <ImagePlaceholder src={src} alt={'thumbnail'} width={200} height={200} className={s.image}/>
      </div>
      <div className={s.content}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.desc}>{children}</div>
      </div>
    </div>
  )
}

export default Card
