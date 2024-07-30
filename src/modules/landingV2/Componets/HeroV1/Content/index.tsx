import Lines from '@/interactive/Lines';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import ModalVideo from 'react-modal-video';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

export default function HeroContent() {
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  // const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.heroContent}>
        <div className={s.heroContent_inner}>
          <Chars classNames={s.heroContent_inner_heading} delayEnter={6}>
            <h1 className={s.heroContent_heading}>Bitcoin L2 as a Service</h1>
          </Chars>
          <div className={s.heroContent_content}>
            <Lines delayEnter={6.1}>
              Powerful infrastructure and tools to build and scale your own
              Bitcoin L2 with ease.
            </Lines>
          </div>
          <ul className={s.heroContent_actions}>
            <li>
              <Fade delayEnter={6.5}>
                <button
                  onClick={() => router.push('/rollups/customize')}
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Deploy a Bitcoin L2
                </button>
              </Fade>
            </li>
            <li>
              <Fade delayEnter={6.6}>
                <button
                  onClick={() =>
                    window.open(
                      'https://docs.bvm.network/bvm/quickstart/build-your-first-bitcoin-dapps',
                    )
                  }
                  className={`${s.btn} ${s.btn__red}`}
                >
                  Deploy a Bitcoin dapp
                </button>
              </Fade>
            </li>
          </ul>
          <Fade delay={6.7}>
            <div className={s.contact}>
              Questions?{' '}
              <span
                className={s.contact_item}
                onClick={() => showContactUsModal()}
              >
                Contact us
              </span>
            </div>
          </Fade>
        </div>
      </div>
      {/*<Fade delay={6.8}>*/}
      {/*  <div className={s.btnVideo}>*/}
      {/*    <a*/}
      {/*      href={'#'}*/}
      {/*      onClick={() => setOpen(true)}*/}
      {/*      style={{ textAlign: 'center', display: 'block' }}*/}
      {/*    >*/}
      {/*      <img*/}
      {/*        src={`/landing/btn-hero-play-v2.png`}*/}
      {/*        width={224}*/}
      {/*        alt={'right'}*/}
      {/*        style={{ margin: 'auto', marginBottom: '8px' }}*/}
      {/*      />*/}
      {/*      <span style={{ fontSize: '14px', fontWeight: 400 }}>*/}
      {/*              Watch the film*/}
      {/*            </span>*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</Fade>*/}
      {/*<ModalVideo*/}
      {/*  channel='custom'*/}
      {/*  url={'/public-sale/public_sale_video_2.mp4'}*/}
      {/*  isOpen={isOpen}*/}
      {/*  onClose={() => {*/}
      {/*    setOpen(false);*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
}
