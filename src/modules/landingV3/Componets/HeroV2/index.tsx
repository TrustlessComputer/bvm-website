import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import Image from 'next/image';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import CaseStudy from '@/modules/landingV3/Componets/CaseStudy';
import { VIDEO_BVM_STUDIO_HOW_IT_WORK } from '@constants/common';

export default function HeroV2() {

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { tracking } = useL2ServiceTracking();
  const { showContactUsModal } = useContactUs();

  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);

  return (
    <div className={s.hero} ref={ref}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.content}>
          <div className={s.content_sub}>
            {/*<IcLogoText />*/}
            <p>BVM Studio</p>
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
        <div className={s.imageHero} onClick={() => setIsOpenModalVideo(true)}>
          {!isOpenModalVideo && (
            <div className={s.imageHero_bg}>
              {/*<video src={'https://storage.googleapis.com/bvm-network/image/output_v5.mp4'} loop preload="auto" playsInline muted autoPlay width={16} height={9} />*/}
              <Image
                className={s.imagePreload}
                src={
                  'https://storage.googleapis.com/bvm-network/image/Drag%20and%20Drop%20Banner%2003.gif'
                }
                width={1566}
                height={880}
                alt={'video'}
                sizes={'100vw'}
                quality={100}
              />
              <div className={s.imageHero_btn}>
                <p>Take a tour</p>
                <Image
                  src={'/icons/ic_arrow-right.svg'}
                  alt={'icons'}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}

          <video
            src={VIDEO_BVM_STUDIO_HOW_IT_WORK}
            width={160}
            height={90}
            preload="auto"
            playsInline
            controls
          />
        </div>
      </div>
      <Brand />
    </div>
  );
}
