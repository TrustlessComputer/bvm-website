import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import React, { useState } from 'react';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import Intro from '@/modules/landing/Componets/Intro';
import Scale from '@/interactive/Scale';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Chars from '@/interactive/Chars';
import Banner from '@/modules/landing/Componets/Hero/Banner';

export default function BasicHero() {
  const [isOpen, setOpen] = useState(false);
  const delay = 1;

  return <div className={s.basicHero}>
    <div className={s.hero_wrap}>
      <Banner />
    </div>
    <div className={`${s.basicHero_container} container`}>
      <div className={s.left}>
        <h1 className={s.heading}>
          <Chars delay={delay}>
            Bitcoin L2 <br />
            as a Service
          </Chars>
        </h1>

        <div className={s.desc}>
          <Lines delay={delay + .2}>
            Powerful infrastructure to build and scale your own Bitcoin L2 with ease.
          </Lines>
        </div>
        <ul className={s.actions}>
          <li>
            <Fade delay={delay + .4}>
              <button className={`${s.btn} ${s.btn__red}`}>Launch your Bitcoin L2</button>
            </Fade>
          </li>
          <li>
            <Fade delay={delay + .5}>
              <button className={`${s.btn}`}>Contact us</button>
            </Fade>
          </li>
        </ul>
      </div>
      <div className={s.right} onClick={() => {
        setOpen(true);
      }}>
        <Scale delay={delay}>
          <img src='/landing/btn-video-play.png' alt='banner-video' />
        </Scale>
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
