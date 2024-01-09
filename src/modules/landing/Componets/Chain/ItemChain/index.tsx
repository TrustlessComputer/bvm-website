import { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';
import SectionTop from './SectionTop';
import SectionBottom from './SectionBottom';

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

function ItemChain({ data }: { data: TItemChain }) {
  const { img, bgTop, stud, ...dataSectionBottom } = data;
  return (
    <div className={s.itemChain}>
      <SectionTop img={img} color={bgTop} stud={stud} />
      <SectionBottom data={dataSectionBottom} />
    </div>
  );
}

export default ItemChain;
