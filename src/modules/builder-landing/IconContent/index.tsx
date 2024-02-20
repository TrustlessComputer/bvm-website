import { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';

interface IIconContent extends PropsWithChildren {
  icon: string,
  step?: number
  link?: string
}

export default function IConContent({ icon, step, children, link }: IIconContent) {

  return <div className={s.iconContent}>
    <div className={s.icon}>
      <img src={icon} alt='icon' />
    </div>
    {
      step && <div className={s.step}>Step {step}</div>
    }
    <div className={s.content}>
      {children}
    </div>
    {
      link && <Link className={s.link} href={link}>Launch now</Link>
    }
  </div>;
}

