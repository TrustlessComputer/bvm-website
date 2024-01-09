import Image, { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';

type TSectionTop = {
  img: StaticImageData;
  color: string;
  stud: number;
};

function SectionTop({ img, color, stud }: TSectionTop) {
  const listStud = Array.from({ length: stud }, () => 0);

  return (
    <figure className={`${s.sectionTop} ${s[`bg__${color}`]}`}>
      <Image
        className={s.sectionTop_img}
        src={img}
        alt="chain"
        width={img.width}
        height={img.height}
      />
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
