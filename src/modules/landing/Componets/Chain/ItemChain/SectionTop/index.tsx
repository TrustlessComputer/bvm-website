import Image, { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';

import cn from 'classnames';
import Scale from '@/interactive/Scale';

type TSectionTop = {
  img: StaticImageData;
  color: string;
  stud: number;
  delay: number;
};

function SectionTop({ img, color, stud, delay }: TSectionTop) {
  const listStud = Array.from({ length: stud }, () => 0);

  return (
    <figure className={`sectionTop ${s.sectionTop} ${s[`bg__${color}`]}`}>
      <div className={s.sectionTop_wrap}>
        <Scale delay={delay}>
          <Image
            className={cn(s.sectionTop_img, 'sectionTop_img')}
            src={img}
            alt="chain"
            width={img.width}
            height={img.height}
          />
        </Scale>
      </div>
      <div className={s.sectionTop_studs}>
        {listStud.map((item) => {
          return (
            <div
              className={`${s.sectionTop_studs_item} ${s[`bg__${color}`]}`}
              key={item}
            ></div>
          );
        })}
      </div>
    </figure>
  );
}

export default SectionTop;
