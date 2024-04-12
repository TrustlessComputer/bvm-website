import s from './styles.module.scss';
import Image from 'next/image';
import { PropsWithChildren, useEffect, useRef } from 'react';
import Link from 'next/link';
import Container from '../Container';
import cn from 'classnames';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current?.muted === false) {
      videoRef.current.muted = true;
    }
  }, [videoRef]);
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
          ref={videoRef}
          src={srcVideo}
          width={1920}
          height={572}
          muted
          autoPlay
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
