import s from './styles.module.scss';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
// import Banner from '@/modules/landingV3/Componets/Banner';

export default function HeroVideo() {
  const router = useRouter();
  const { tracking } = useL2ServiceTracking();
  const { showContactUsModal } = useContactUs();


  return <div className={s.heroVideo}>
    <div className={s.heroVideo_inner}>
      {/*<Banner />*/}
      <div className={s.heroVideo_bg}>
        <video src={'https://storage.googleapis.com/bvm-network/image/bvm_hero_video_v3_comp.mp4'} loop muted
               playsInline
               autoPlay preload={'auto'} />
      </div>
      <div className={s.heroVideo_content}>
        <div className={`containerV3 ${s.heroVideo_content_container}`}>
          <div className={s.content}>
            <div className={s.content_sub}>
              <p>Bitcoin Rollup as a Service</p>
            </div>
            <h3 className={s.content_heading}>
              Launch your own ZK Rollup on Bitcoin with drags and drops for just $99/month.
            </h3>
            <div className={s.groupBtn}>
              <div
                className={`${s.btn} ${s.btn__primary}`}
                onClick={() => {
                  tracking('GET_STARTED');
                  router.push('/rollups/customizev2');
                }}
              >
                Build now
              </div>
              <div
                className={`${s.btn} ${s.btn__secondary}`}
                onClick={() => {
                  showContactUsModal({ subjectDefault: 0 });
                }}
              >
                Request a demo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
