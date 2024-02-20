import { PropsWithChildren } from 'react';
import s from './styles.module.scss'

interface IIconContent extends PropsWithChildren{
  icon: string
}

export default function IConContent({icon, children}: IIconContent){

  return <div className={s.iconContent}>
      <div className={s.icon}>
        <img src={icon} alt='icon' />
      </div>
      <div className={s.content}>
        {children}
      </div>
  </div>
}
