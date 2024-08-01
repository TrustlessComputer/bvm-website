import { HOME_DATA_SECTIONS } from '@/modules/landingV3/data-sections';
import s from './styles.module.scss';
import ContentSection from '@/modules/landingV3/Componets/ScrollingSection/ContentSection';
import ImageSection from '@/modules/landingV3/Componets/ScrollingSection/ImageSection';
import React from 'react';
import CaseStudyThumbnail from '@/modules/landingV3/Componets/CaseStudy/thumbnail';
import CaseStudyContent from '@/modules/landingV3/Componets/CaseStudy/content';

export default function ScrollingSection() {

  return <div className={s.scrollingSection}>
    <div className="containerV3">
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.left_inner}>
            <div className={s.left_inner_content}>
              {
                HOME_DATA_SECTIONS.map((ob, idx) => {
                  return <div className={s.left_inner_item}><ImageSection idx={idx} {...ob} /></div>;
                })
              }
              <div className={s.left_inner_item}>
                <CaseStudyThumbnail idx={HOME_DATA_SECTIONS.length} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${s.right}`}>
          {
            HOME_DATA_SECTIONS.map((ob, idx) => {
              return <div  className={s.right_content}>
                <ContentSection idx={idx} {...ob} />
              </div>;
            })
          }
          <div className={s.right_content}>
            <CaseStudyContent idx={HOME_DATA_SECTIONS.length} />
          </div>
        </div>
      </div>
    </div>
  </div>;
}
