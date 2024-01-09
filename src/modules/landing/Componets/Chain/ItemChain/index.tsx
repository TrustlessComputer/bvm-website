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
  data: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgTop: string;
  bgBottom: string;
};

function ItemChain({ data, delay }: { data: TItemChain, delay: number }) {
  const { img, bgTop, stud, ...dataSectionBottom } = data;
  return (

    <div className={s.itemChain}>
      <Fade from={{ x: 50 }} to={{ x: 0 }} delay={delay}>
        <SectionTop delay={delay + .1} img={img} color={bgTop} stud={stud} />
        <SectionBottom delay={delay + .2} data={dataSectionBottom} />
      </Fade>
    </div>
  );
}

export default ItemChain;
