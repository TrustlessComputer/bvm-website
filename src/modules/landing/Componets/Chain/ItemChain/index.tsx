import { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';
import SectionTop from './SectionTop';
import SectionBottom from './SectionBottom';
import Fade from '@/interactive/Fade';

type TItemChain = {
  img: StaticImageData;
  title: string;
  stud: number;
  link?: string;
  data: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgTop: string;
  bgBottom: string;
};

export default function ItemChain({ data, delay }: { data: TItemChain; delay: number }) {
  const { img, bgTop, stud, ...dataSectionBottom } = data;
  return (
    <div className={s.itemChain} onClick={() => {
      data.link && window.open(data.link, '_blank');
    }}>
      <Fade from={{ x: 50 }} to={{ x: 0 }} delay={delay}>
        <SectionTop delay={delay + 0.1} img={img} color={bgTop} stud={stud} />
        <SectionBottom delay={delay + 0.2} data={dataSectionBottom} />
      </Fade>
    </div>
  );
}
