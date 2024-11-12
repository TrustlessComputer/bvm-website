import { ReactElement, useEffect, useRef } from 'react';
import s from './style.module.scss';
import ImagePlaceholder from '@/components/ImagePlaceholder';

import Image from 'next/image';
import { gsap } from 'gsap';
import Fade from '@/interactive/Fade';

interface IProp {
  data: any;
  delay: number;
}

export default function LegoItem({ data, delay }: IProp): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onLeave();
  }, []);

  const onHover = () => {
    if (!refContent.current) return;
    const box = refContent.current?.querySelector('.js-box');
    const items = refContent.current?.querySelectorAll('.js-item');

    gsap.to(box, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.4 });
    gsap.to(items, {
      y: 0,
      delay: 0.05,
      opacity: 1,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    if (!refContent.current) return;
    const box = refContent.current?.querySelector('.js-box');
    const items = refContent.current?.querySelectorAll('.js-item');

    gsap.to(items, {
      y: 10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.out',
    });
    gsap.to(box, {
      y: 30,
      delay: 0.05,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.4,
    });
  };
  return (
    <div
      className={s.legoItem}
      ref={refContent}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Fade delay={delay}>
        <div className={s.legoItem_inner}>
          <div className={s.legoItem_thumbnail}>
            <ImagePlaceholder
              src={data.img}
              alt={data.title}
              width={278}
              height={160}
            />
          </div>
          <div className={s.boxWrapper}>
            <ul className={`${s.boxs} js-box`}>
              {data.icons.map((src: any) => {
                return (
                  <li className={'js-item'}>
                    <Image
                      src={`/landing/images/box-image-${src}.png`}
                      width={48}
                      height={48}
                      alt={'bxImg1'}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <h4 className={s.legoItem_title}>{data.title}</h4>
        </div>
      </Fade>
    </div>
  );
}
