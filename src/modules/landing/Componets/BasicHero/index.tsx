import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import React, { useState } from 'react';

export default function BasicHero() {
  const [isOpen, setOpen] = useState(false);

  return <div className={s.basicHero}>
    <div className={`${s.basicHero_container} container`}>
      <div className='left'>
        <h1>Bitcoin L2
          as a Service</h1>
        <p>
          Powerful infrastructure to build and scale your own Bitcoin L2 with ease.
        </p>
        <ul>
          <li>
            <button>Launch your Bitcoin L2</button>
          </li>
          <li>
            <button>Contact us</button>
          </li>
        </ul>
      </div>
      <div className='right'>
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
  </div>;
}
