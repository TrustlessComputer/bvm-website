import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import ImagePlaceholder from '@components/ImagePlaceholder';
import IcLogoText from '../IcLogoText';
import IcArrowRight from '../IcArrowRight';

export default function HeroV2() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { tracking } = useL2ServiceTracking();
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);

  return (
    <div className={s.hero} ref={ref}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.content}>
          <div className={s.content_sub}>
            <IcLogoText />
          </div>
          <h3 className={s.subTitle}>
            Blockchains anyone can set up <span>for $99/mo.</span>
          </h3>
          <div className={s.desc}>
            <p>
              Join the wave of developers building blockchains and decentralized applications. With its simple and
              intuitive interface, BVM is the perfect starting point for your blockchain journey.
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
              Get started
            </div>
            <div className={`${s.btn} ${s.btn__secondary}`} onClick={() => {
              window.open('https://docs.bvm.network/bvm');
            }}>
              Developer docs
              <IcArrowRight />
            </div>
          </div>
        </div>
        <div className={s.imageHero} onClick={() => setIsOpenModalVideo(true)}>
          {!isOpenModalVideo &&
            <ImagePlaceholder className={s.imageHero_img} src={'/images/home-hero-poster.jpg'} width={160}
                              height={90}
                              alt={'video'} />}
          <video src={'https://storage.googleapis.com/bvm-network/icons-tool/DragnDrop_03.mp4'} width={160}
                 height={90}
                 preload="auto" playsInline controls />
        </div>
      </div>
      <Brand />
    </div>
  );
}
