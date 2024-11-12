import Lines from '@/interactive/Lines';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { VIDEO_HERO_MAIN } from '@constants/common';

export default function HeroContent() {
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.heroContent}>
        <div className={s.heroContent_inner}>
          <Chars classNames={s.heroContent_inner_heading} delayEnter={6}>
            <h1 className={s.heroContent_heading}>Bitcoin, upgraded.</h1>
          </Chars>
          <div className={s.heroContent_content}>
            <Lines delayEnter={6.1}>
              Join us on the mission to reinvent Bitcoin beyond just a currency
              — the next internet with AI, Gaming, DeFi, Social, and more on
              Bitcoin.
            </Lines>
          </div>
          <ul className={s.heroContent_actions}>
            <li>
              <Fade delayEnter={6.5}>
                <button
                  onClick={() => router.push('/studio')}
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Build on Bitcoin
                </button>
              </Fade>
            </li>
            {/* <li>
              <Fade delayEnter={6.6}>
                <button
                  onClick={() => router.push('/')}
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Experience Bitcoin
                </button>
              </Fade>
            </li> */}
          </ul>
          {/* <Fade delay={6.7}>
            <div className={s.contact}>
              Questions?{' '}
              <span
                className={s.contact_item}
                onClick={() => showContactUsModal()}
              >
                Contact us
              </span>
            </div>
          </Fade> */}
          <Fade delay={6.8}>
            <div className={s.btnVideo}>
              <a
                href={'#'}
                onClick={() => setOpen(true)}
                style={{ textAlign: 'center', display: 'block' }}
              >
                <img
                  src={`/landing/btn-hero-play-v2.png`}
                  width={224}
                  alt={'right'}
                  style={{ margin: 'auto', marginBottom: '8px' }}
                />
                <span style={{ fontSize: '14px', fontWeight: 400 }}>
                  What is BVM?
                </span>
              </a>
            </div>
          </Fade>
        </div>
      </div>

      <ModalVideo
        channel="custom"
        url={VIDEO_HERO_MAIN}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
