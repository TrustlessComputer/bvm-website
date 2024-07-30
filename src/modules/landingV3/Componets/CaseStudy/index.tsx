import s from './styles.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import { VIDEO_BVM_STUDIO_HOW_IT_WORK } from '@constants/common';
import React, { useState } from 'react';

export default function CaseStudy() {
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);

  return <div className={'containerV3'}>
    <div className={s.inner}>
      {/*<div className={s.thumbnail}>*/}
      {/*  <img src="/vs.jpg" alt="vs" />*/}
      {/*</div>*/}
      <div className={s.thumbnail} onClick={() => setIsOpenModalVideo(true)}>
        {!isOpenModalVideo &&
          <div className={s.thumbnail_bg}>
            {/*<video src={'https://storage.googleapis.com/bvm-network/image/output_v5.mp4'} loop preload="auto" playsInline muted autoPlay width={16} height={9} />*/}
            <Image className={s.imagePreload}
                   src={'/vs.jpg'}
                   width={1566}
                   height={880}
                   alt={'video'} sizes={'100vw'} quality={100} />
            <div className={s.thumbnail_btn}>
              <Image src={'/play.svg'} alt={'icons'} width={20} height={20} />
            </div>
          </div>}

        <video src={'https://storage.googleapis.com/bvm-network/image/Bitcoin%20Wars%20Intro.mp4'} width={160}
               height={90}
               preload="auto" playsInline controls />
      </div>
      <div className={s.inner_right}>
        <p className={s.tag}>Case Study</p>
        <div className={s.inner_img}>
          <img src="/trump.png" alt="Case Study" />
        </div>
        <div className={s.caseStudy}>
          <p className={s.caseStudy_title}>BITCOIN WARS</p>
          <p className={s.caseStudy_description}>The first fully on-chain game built on a ZK Rollup on the Bitcoin
            network.</p>
        </div>
        <div className={s.caseStudy_button}>
          <Link href="/bitcoinwars">Learn more</Link>
        </div>
      </div>

    </div>
  </div>
}

