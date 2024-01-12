import { StaticImageData } from 'next/image';
import React from 'react';
import s from './styles.module.scss';
import SectionTop from './SectionTop';
import SectionBottom from './SectionBottom';
import Fade from '@/interactive/Fade';
import useCursorStore from '@/modules/landing/Componets/Chain/Cursor/useCursorStore';

type TItemChain = {
  img: StaticImageData;
  title: string;
  stud: number;
  link?: string;
  data?: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgTop: string;
  bgBottom: string;
};

export default function ItemChain({
  data,
  delay,
  isLaunch,
}: {
  data: TItemChain;
  delay: number;
  isLaunch?: boolean;
}) {
  const { img, bgTop, stud, ...dataSectionBottom } = data;
  const { show, hide } = useCursorStore();
  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      className={`${s.itemChain} ${isLaunch && s.itemLaunch}`}
      onClick={() => {
        data.link && window.open(data.link, '_blank');
      }}
    >
      <Fade from={{ x: 50 }} to={{ x: 0 }} delay={delay}>
        <SectionTop delay={delay + 0.1} img={img} color={bgTop} stud={stud} />

        {isLaunch ? (
          <SectionBottom
            delay={delay + 0.2}
            isLaunch={isLaunch}
            data={dataSectionBottom}
          />
        ) : (
          <SectionBottom delay={delay + 0.2} data={dataSectionBottom} />
        )}
      </Fade>
    </div>
  );
}
