import React, { useState } from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';

type TCardLearn = {
  title: string;
  decs: string;
  isLast: boolean;
};

export default function CardLearn({ decs, title, isLast }: TCardLearn) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={cn(s.wrapper, isLast && s.wrapper_last)}>
      <div className={s.inner}>
        <h3 className={s.inner_title}>{title}</h3>
        {!isLast ? (
          <p className={s.inner_decs}>{decs}</p>
        ) : (
          <>
            <div className={s.inner_wrapImg} onClick={() => {
              setOpen(true);
            }}>
              <video src='/landing-v2/banner_night_gif_1.mp4' playsInline autoPlay muted preload='auto' loop />
              <img src='/landing-v2/icon-play.svg' alt='icon-play' />
            </div>
            <ModalVideo
              channel='custom'
              url={'/public-sale/public_sale_video_2.mp4'}
              isOpen={isOpen}
              onClose={() => {
                setOpen(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
