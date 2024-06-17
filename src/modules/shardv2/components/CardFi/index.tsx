import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Button from '@/modules/ai-landing/components/Button';
import React from 'react';

type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage?: string;
  actionTitle?: string;
  bgColor?:string;
  classImage?:string;
  classNames?:string;
};

const CardFi = ({ ...props }: TCardFiProps) => {
  return (
    <div className={s.cardFiContainer}>
      <div
        className={`${s.cardFiImage} ${props.classNames} cardFiImage`}
        style={{ backgroundColor: props.bgColorImage || props.bgColor || '' }}
      >
        <ImagePlaceholder
          width={260}
          height={260}
          className={props.classImage}
          src={props.image}
          alt={props.image}
        />
      </div>
      <p className={s.cardFiContent_title}>{props.title}</p>
      <div
        className={s.cardFiContent_desc}
      >
        {props.description}
      </div>
      <div className={s.cardFiContent_bottom}>
        <div
          className={`${s.cardFiContent_desc} ${s.cardFiContent_bottom_btn} `}
          dangerouslySetInnerHTML={{ __html: props?.actionTitle || '' }}
        />
      </div>
    </div>
  );
};

export default CardFi;
