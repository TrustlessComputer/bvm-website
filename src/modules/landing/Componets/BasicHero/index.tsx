import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import React, { useState } from 'react';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import Intro from '@/modules/landing/Componets/Intro';

export default function BasicHero() {
  const [isOpen, setOpen] = useState(false);

  return <div className={s.basicHero}>
    <div className={`${s.basicHero_container} container`}>
      <div className={s.left}>
        <h1 className={s.heading}>Bitcoin L2
          as a Service</h1>
        <p className={s.desc}>
          Powerful infrastructure to build and scale your own Bitcoin L2 with ease.
        </p>
        <ul className={s.actions}>
          <li>
            <button className={`${s.btn} ${s.btn__red}`}>Launch your Bitcoin L2</button>
          </li>
          <li>
            <button className={`${s.btn}`}>Contact us</button>
          </li>
        </ul>
      </div>
      <div className={s.right}>
        <img src='/public-sale/bvm-website.png' alt='banner-video' />
      </div>
    </div>
    <ModalVideo
      channel='custom'
      url={'/public-sale/public_sale_video_2.mp4'}
      isOpen={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    />
    <HeroLabel />
    <Intro />
  </div>;
}
