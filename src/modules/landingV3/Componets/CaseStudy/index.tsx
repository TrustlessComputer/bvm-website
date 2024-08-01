import s from './styles.module.scss';
import React from 'react';
import CaseStudyContent from '@/modules/landingV3/Componets/CaseStudy/content';
import CaseStudyThumbnail from '@/modules/landingV3/Componets/CaseStudy/thumbnail';

export default function CaseStudy() {

  return <div className={'containerV3'}>
    <div className={s.inner}>
      <CaseStudyThumbnail />
      <CaseStudyContent />
    </div>
  </div>;
}

