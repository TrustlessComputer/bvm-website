import s from './styles.module.scss';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

export default function HeroVideo() {
  const router = useRouter();
  const { tracking } = useL2ServiceTracking();
  const { showContactUsModal } = useContactUs();


  return <div className={s.heroVideo}>
    <div className={s.heroVideo_inner}>
      <div className={s.heroVideo_bg}>
        <video src={'https://storage.googleapis.com/bvm-network/image/dragn_video_hero.mp4'} loop muted playsInline
               autoPlay preload={'auto'} />
      </div>
      <div className={s.heroVideo_content}>
        <div className={`container ${s.heroVideo_content_container}`}>
          <div className={s.content}>
            <div className={s.content_sub}>
              {/*<IcLogoText />*/}
              <p>Bitcoin RaaS Studio</p>
            </div>
            <h3 className={s.subTitle}>
              Launch your own Bitcoin-backed blockchain for just{' '}
              <span>$99/month</span>
            </h3>
            <div className={s.desc}>
              <p>
                Whether you're an indie developer or a large-scale project, BVM
                makes it easy and affordable to create your own blockchain —
                secured by Bitcoin.
              </p>
              <p>
                With Bitcoin as the base layer, your blockchain will inherit the
                security guarantees of Bitcoin and you can tap into the $1
                trillion Bitcoin economy.
              </p>
            </div>
            <div className={s.groupBtn}>
              <div
                className={`${s.btn} ${s.btn__primary}`}
                onClick={() => {
                  tracking('GET_STARTED');
                  router.push('/rollups/customizev2');
                }}
              >
                Build on Bitcoin
              </div>
              {/*<div className={`${s.btn} ${s.btn__secondary}`} onClick={() => {
              showContactUsModal({ subjectDefault: 0 });
            }}>*/}
              {/*  Contact us*/}
              {/*  <IcArrowRight />*/}
              {/*</div> */}
              <div
                className={`${s.btn} ${s.btn__secondary}`}
                onClick={() => {
                  showContactUsModal({ subjectDefault: 0 });
                }}
              >
                Request a demo
                {/*<IcArrowRight />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
