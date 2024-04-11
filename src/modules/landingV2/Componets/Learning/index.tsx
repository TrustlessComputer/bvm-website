import React, { useState } from 'react';
import s from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import CardLearn from './CardLearn';
import ModalVideo from 'react-modal-video';

const DATA_LEARN = [
  {
    title: 'Deyloy your own Bitcoin L2 with BVM modules.',
    decs: 'Choose a rollup module, select a data availability module, and then launch to the world - it’s that easy. ',
  },
  {
    title: 'Write Smart contracts and build dapps on Bitcoin.',
    decs: 'BVM is EVM equivalent. It allows Ethereum developers to migrate their dApps from Ethereum to Bitcoin with minimal modificiations.',
  },
  {
    title: 'Kickstart your BITcoin L2 with a CROWDSALE',
    decs: 'Already deployed a Bitcoin L2? You can do a public sale to raise funds and grow your Bitcoin L2 via the BVM launchpad.',
  },
];
export default function Learning() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.inner_left}>
            <SectionTitle className={s.inner_left_title}>
              Learn what BVM products can do for you
            </SectionTitle>
            <div className={s.inner_video}>
              <div>
                <div
                  className={s.inner_left_wrapImg}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <video
                    src="/landing-v2/banner_night_gif_1.mp4"
                    playsInline
                    autoPlay
                    muted
                    preload="auto"
                    loop
                  />
                  <img src="/landing-v2/icon-play.svg" alt="icon-play" />
                </div>
                <ModalVideo
                  channel="custom"
                  url={'/public-sale/public_sale_video_2.mp4'}
                  isOpen={isOpen}
                  onClose={() => {
                    setOpen(false);
                  }}
                />
              </div>
              <h4 className={s.inner_left_text}>
                Welcome to the future of Bitcoin
              </h4>
            </div>
          </div>
          <div className={s.wrapper_list}>
            {DATA_LEARN.map((item, index) => {
              return (
                <CardLearn
                  {...item}
                  key={index}
                  isLast={index === DATA_LEARN.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
