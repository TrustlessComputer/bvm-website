import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import Fade from '@interactive/Fade';

export type TDappCardProps = {
  idx: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  tags: string[];
}


export default function DappCard({ idx, ...props }: TDappCardProps): React.JSX.Element {
  console.log('props.bgColor', props.bgColor);
  return (
    <Fade delayEnter={(.5 + idx / 10)}>
      <div className={s.wrapperDappCard} style={{ background: props.bgColor }}>
        <div className={s.wrapperDappCard_image}>
          <Image src={props.image} alt={'dapp1'} width={448} height={432} />
        </div>
        <div className={s.wrapperDappCardContent}>
          <p className={s.wrapperDappCard_heading}>{props.title}</p>
          <p className={s.wrapperDappCard_decs}>{props.description}</p>
          <div className={s.tags}>
            {
              props.tags.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))
            }
          </div>
        </div>
      </div>
    </Fade>
  );
}
