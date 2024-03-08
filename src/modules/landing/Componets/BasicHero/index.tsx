import s from './styles.module.scss';
// import ModalVideo from 'react-modal-video';
import React, { useState } from 'react';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import Scale from '@/interactive/Scale';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Chars from '@/interactive/Chars';
import Banner from '@/modules/landing/Componets/Hero/Banner';
import { useRouter } from 'next/navigation';
import ContactUsModal from '@/components/ContactUsModal';
import ContactUsSuccessModal from '@/components/ContactUsSuccessModal';

export default function BasicHero() {
  const [isOpen, setOpen] = useState(false);
  const delay = 1;
  const router = useRouter();
  const [showContactUsModal, setContactUsModal] = useState(false);
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

  return (
    <div className={s.basicHero}>
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
            <Lines delay={delay + 0.2}>
              Powerful infrastructure and tools to build and scale your own Bitcoin L2 with ease.
            </Lines>
          </div>
          <ul className={s.actions}>
            <li>
              <Fade delay={delay + 0.4}>
                <button
                  onClick={() => router.push('/blockchains/customize')}
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Deploy a Bitcoin L2
                </button>
              </Fade>
            </li>
            <li>
              <Fade delay={delay + 0.4}>
                <button
                  onClick={() => window.open('https://docs.bvm.network/bvm/quickstart/build-your-first-bitcoin-dapps')}
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Deploy a Bitcoin dapp
                </button>
              </Fade>
            </li>
            {/* <li>
              <Fade delay={delay + 0.5}>
                <button
                  className={`${s.btn}`}
                  onClick={() => setContactUsModal(true)}
                >
                  Contact us
                </button>
              </Fade>
            </li> */}
          </ul>
          <Fade delay={delay + 0.5}>
            <div className={s.contact}>
              <p>
                Question?{' '}
                <span onClick={() => setContactUsModal(true)}>Contact us</span>
              </p>
            </div>
          </Fade>
        </div>
        <div className={s.right}>
          <Scale delay={delay}>
            <div
              className={`${s.wrapVideo} ${isOpen ? s.isplay : ''}`}
              onClick={() => {
                setOpen(true);
              }}
            >
              <video
                controls
                src="/public-sale/public_sale_video_2.mp4"
              ></video>
              <img className={s.bg} src={'/landing/btn-video-play.png'} />
            </div>
          </Scale>
        </div>
      </div>
      <HeroLabel />

      {showContactUsModal && (
        <ContactUsModal
          isShow={true}
          onHide={() => setContactUsModal(false)}
          onSuccesCB={() => {
            setContactUsModal(false);
            setShowSubmitSuccessModal(true);
          }}
        />
      )}
      {showSubmitSuccessModal && (
        <ContactUsSuccessModal
          isShow={true}
          onHide={() => setShowSubmitSuccessModal(false)}
        />
      )}
    </div>
  );
}
