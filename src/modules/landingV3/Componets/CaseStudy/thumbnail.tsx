import s from '@/modules/landingV3/Componets/CaseStudy/styles.module.scss';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import { sectionActive } from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';

export default function CaseStudyThumbnail({ idx }: { idx?: number }) {
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
  const refContent = useRef<HTMLDivElement>(null);
  useSignalEffect(()=>{
    if(idx=== undefined) return ;
    console.log('______2222', sectionActive.value, idx);
    sectionActive.value === idx ? refContent.current?.classList.add(s.active) : refContent.current?.classList.remove(s.active);
  })
  return (
    <div className={`${s.thumbnail} ${idx && s.isScrolling}`} ref={refContent} onClick={() => setIsOpenModalVideo(true)}>
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
  );
}
