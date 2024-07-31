import s from './styles.module.scss';
import Image from 'next/image';
import { VIDEO_BVM_STUDIO_HOW_IT_WORK } from '@constants/common';
import React, { useState } from 'react';

const FakeData = [
  {
    icon: '/icons/ic_1.svg',
    title: 'Easily deploy',
    desc: 'Launch your ZK rollups without writing a single line of code.'
  },
  {
    icon: '/icons/ic_2.svg',
    title: 'Affordable pricing',
    desc: 'Get started with ZK rollups on Bitcoin from just $99/month.'
  },
  {
    icon: '/icons/ic_3.svg',
    title: 'Scalable solutions',
    desc: 'Scale your ZK rollup or resize it as your demand shifts.'
  },
  {
    icon: '/icons/ic_4.svg',
    title: 'Bitcoin security',
    desc: 'Inherit Bitcoin’s robust security with your ZK rollup.'
  },
  {
    icon: '/icons/ic_5.svg',
    title: 'Economic opportunity',
    desc: 'Be the first to tap into the $1 trillion Bitcoin economy.'
  }
]

export default function VideoSection() {
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
  return (
    <div className={s.wrapperVideoSection}>
      <div className="containerV3">
        <p className={s.wrapperVideoSection_heading}>Comprehensive, cost-effective ZK rollup solution. Built for
          building on Bitcoin.</p>
        <div className={s.wrapperItem}>
          {
            FakeData.map(item => {
              return (
                <div key={item.title} className={s.item}>
                  <div className={s.item_icon}>
                    <Image src={item.icon} alt={'ic_bell'} width={80} height={80} />
                  </div>
                  <p className={s.item_heading}>{item.title}</p>
                  <p className={s.item_decs}>{item.desc}</p>
                </div>
              )
            })
          }
        </div>
        <div className={s.wrapperImage}>
          <div className={s.imageHero} onClick={() => setIsOpenModalVideo(true)}>
            {!isOpenModalVideo && (
              <div className={s.imageHero_bg}>
                {/*<video src={'https://storage.googleapis.com/bvm-network/image/output_v5.mp4'} loop preload="auto" playsInline muted autoPlay width={16} height={9} />*/}
                <Image
                  className={s.imagePreload}
                  // src={
                  //   'https://storage.googleapis.com/bvm-network/image/Drag%20and%20Drop%20Banner%2003.gif'
                  // }
                  src={
                    '/video.jpg'
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
      </div>
    </div>
  )
}
