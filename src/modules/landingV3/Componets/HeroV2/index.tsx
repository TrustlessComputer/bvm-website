import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import ImagePlaceholder from '@components/ImagePlaceholder';
import IcLogoText from '../IcLogoText';
import IcArrowRight from '../IcArrowRight';
import { WHITEPAPER_DOC_URL } from '@/config';
import ModalVideo from 'react-modal-video';

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
                router.push('/pricing');
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
        <ImagePlaceholder
          className={s.imageHero}
          src={'/bvm/hero-banner.png'}
          width="694"
          height="579"
          alt={'hero'}
        />
        {/*<div className={s.img_video} onClick={() => setIsOpenModalVideo(true)}>*/}
        {/*  <ImagePlaceholder src={'/video_bvm.png'} width={582} height={452} alt={'video'} />*/}
        {/*</div>*/}
      </div>
      <Brand />
      {/*<ModalVideo*/}
      {/*  channel="custom"*/}
      {/*  url={*/}
      {/*    'https://storage.googleapis.com/bvm-network/icons-tool/DragnDrop_03.mp4'*/}
      {/*  }*/}
      {/*  isOpen={isOpenModalVideo}*/}
      {/*  onClose={() => {*/}
      {/*    setIsOpenModalVideo(false);*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}
