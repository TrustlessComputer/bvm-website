import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Button from '@/modules/ai-landing/components/Button';
import React from 'react';

type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage: string;
  actionTitle: string;
};

const CardFi = ({ ...props }: TCardFiProps) => {
  return (
    // <Fade from={{ y: 40 }} to={{ y: 0 }}>
    <div className={s.cardFiContainer}>
      <div
        className={s.cardFiImage}
        style={{ backgroundColor: props.bgColorImage }}
      >
        <ImagePlaceholder
          width={260}
          height={260}
          src={props.image}
          alt={props.image}
        />
      </div>
      <div className={s.cardFiContent}>
        <div className={s.cardFiContent_inner}>
          <p className={s.cardFiContent_title}>{props.title}</p>
          <div
            className={s.cardFiContent_desc}
            // dangerouslySetInnerHTML={{ __html: props.description }}
          >{props.description}</div>
          <div className={s.cardFiContent_bottom}>
            <div
              className={`${s.cardFiContent_desc} ${s.cardFiContent_bottom_btn} `}
              dangerouslySetInnerHTML={{ __html: props.actionTitle }}
            />
            {/*<Button
                onClick={() => {
                  window.open(props.actionUrl, props.actionUrl.includes("https") ? '_blank' : '_self');
                }}
                className={`${s.btn}`}
                isOrange
              >
                <div dangerouslySetInnerHTML={{__html: props.actionTitle}}/>
              </Button>*/}
          </div>
        </div>
      </div>
    </div>
    // </Fade>
  );
};

export default CardFi;
