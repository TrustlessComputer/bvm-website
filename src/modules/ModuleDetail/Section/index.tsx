import s from './styles.module.scss'
import { PropsWithChildren } from 'react';

type TSection = PropsWithChildren & {
  title: string;
}

const Section = ({title, children}:TSection) => {
  return <div className={s.wrapper}>
    <div className="containerV3">
      <div className={s.inner}>
        <p className={s.title}>{title}</p>
        <div className={s.right}>
          {children}
        </div>
      </div>
    </div>
  </div>
}

export default Section;
