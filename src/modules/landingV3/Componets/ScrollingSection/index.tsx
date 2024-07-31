import { HOME_DATA_SECTIONS } from '@/modules/landingV3/data-sections';
import s from './styles.module.scss';
import ContentSection from '@/modules/landingV3/Componets/ScrollingSection/ContentSection';
import ImageSection from '@/modules/landingV3/Componets/ScrollingSection/ImageSection';
import React, { useRef } from 'react';
import CaseStudyThumbnail from '@/modules/landingV3/Componets/CaseStudy/thumbnail';
import CaseStudyContent from '@/modules/landingV3/Componets/CaseStudy/content';
import { Frames } from '@interactive/ScrollFrame';

export default function ScrollingSection() {
  const refContent = useRef<HTMLDivElement>(null);
  return <div id={'scrollingSection'} className={s.scrollingSection} ref={refContent}>
    <div className={`${s.container} containerV3`}>
      <div className={s.inner}>
        <div className={s.left}>
          <Frames
            comp={refContent}
            width={1920}
            height={1080}
            totalFrames={260}
            willLoad={260}
            urlFrame={'https://storage.googleapis.com/bvm-network/bvm-home-fames/%d.jpg'}
          />
        </div>
        <div className={`${s.right}`}>
          <div className={s.right_inner}>
            {
              HOME_DATA_SECTIONS.map((ob, idx) => {
                return <div className={s.right_content}>
                  <ContentSection {...ob} />
                </div>;
              })
            }
          </div>
        </div>
      </div>
    </div>
  </div>;
}
