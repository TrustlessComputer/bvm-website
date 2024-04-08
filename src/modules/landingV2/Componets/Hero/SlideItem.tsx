import s from './styles.module.scss';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import Link from 'next/link';

interface IProp extends PropsWithChildren {
  title: string,
  action: string,
  src: string,
}

export default function SlideItem({ title, children, action, target }: IProp) {

  return <div className={s.slideItem}>
    <Image src={'/landing-v2/hero-slide-item.jpeg'} alt={'hero-slide-item.jpeg'} width={1056} height={572} />
    <div className={s.slideItem_item}>
      <div className={s.slideItem_item_left}>
        <h2 className={s.heading}>{title}</h2>
        <p className={s.desc}>{children}</p>
      </div>
      <div className={s.slideItem_item_action}>
        <Link className={s.btn} href={action} target={target}>
          Learn more
        </Link>
      </div>
    </div>
  </div>;
}
