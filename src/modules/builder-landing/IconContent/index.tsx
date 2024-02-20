import { PropsWithChildren, useRef } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import RandomText from '@/interactive/RandomText';

interface IIconContent extends PropsWithChildren {
  icon: string,
  step?: number
  link?: string
}

export default function IConContent({ icon, step, children, link }: IIconContent) {

  const refHover = useRef<{ onHover: () => void }>();

  return <div className={s.iconContent} onMouseEnter={() => {
    refHover.current?.onHover();
  }}>
    <div className={s.icon}>
      <img src={icon} alt='icon' />
    </div>
    {
      step && <div className={s.step}>Step {step}</div>
    }

    <div className={`${s.content} content`}>
      <RandomText ref={refHover}>
        {children}
      </RandomText>
    </div>
    {
      link && <Link className={s.link} href={link}>Launch now</Link>
    }
  </div>;
}

