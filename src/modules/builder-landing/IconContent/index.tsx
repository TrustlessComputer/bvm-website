import { PropsWithChildren, useRef } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import RandomText from '@/interactive/RandomText';
import { Tooltip } from 'react-tooltip';
interface IIconContent extends PropsWithChildren {
  icon: string,
  title?: string,
  content?: string,
  step?: number
  link?: string
  lock?:boolean,
  blank?:boolean,
}

export default function IConContent({ icon, step, children, link, lock, title, blank, content }: IIconContent) {

  const refHover = useRef<{ onHover: () => void }>();

  return <div className={s.iconContent} onMouseEnter={() => {
    refHover.current?.onHover();
  }}>
    <div className={s.icon}>
      <img src={icon} alt='icon' />
    </div>
    {
      step && <div className={s.step}>STEP {step} {lock &&

        <>
          <a id="my-anchor-element_ic_sharp"><img src='/builder/ic_sharp-info.svg' alt='ic_sharp' /></a>
          <Tooltip
            anchorSelect="#my-anchor-element_ic_sharp"
            content={content}
          />
        </>
        }</div>
    }

    <div className={`${s.content} content`}>
      <RandomText ref={refHover}>
        {children}
      </RandomText>
    </div>
    {
      link && <Link className={s.link} href={link} target={blank ? '_blank' : ''}>{title}</Link>
    }
  </div>;
}

