import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import s from './styles.module.scss';

interface IProp extends PropsWithChildren {
  title: string;
  action: string;
  srcImg?: string;
  srcVideo?: string;
  target: string;
}

export default function SlideItem({
  title,
  srcImg,
  srcVideo,
  children,
  action,
  target,
}: IProp) {
  return (
    <div className={s.slideItem}>
      {srcImg ? (
        <Image
          src={srcImg}
          alt={'hero-slide-item.jpeg'}
          width={1920}
          height={572}
        />
      ) : (
        <video
          src={srcVideo}
          width={1920}
          height={572}
          muted={true}
          autoPlay
          playsInline
          loop
        />
      )}
      <div className={cn(s.slideItem_inner, 'container')}>
        <div className={`${s.slideItem_item} slideItem_item `}>
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
      </div>
    </div>
  );
}
