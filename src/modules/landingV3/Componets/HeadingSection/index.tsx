import s from './styles.module.scss';
import React, { PropsWithChildren, useState } from 'react';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useRouter } from 'next/navigation';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import Image from 'next/image';
import { VIDEO_BVM_STUDIO_HOW_IT_WORK } from '@constants/common';

type THeadingSection = PropsWithChildren & {
  title: string;
  video?: string;
  bgColor?: string;
  showBtn?: boolean;
}


const HeadingSection = ({...props}: THeadingSection) => {
  const { bgColor = '#ffffff', title = '' } = props;
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();


  return (
    <div className={s.headingSection} style={{backgroundColor: bgColor}}>
      <div className={`${s.top} containerV3`}>
        <p className={s.top_heading}>{title}</p>
        <p className={s.top_desc}>{props.children}</p>
        {
          props.showBtn && (
            <div className={s.wrapperBtn}>
              <div className={`${s.btn} ${s.btn__primary}`} onClick={() => {
                tracking('GET_STARTED');
                router.push('/rollups/customizev2');
              }}>
                <p>Build now</p>
              </div>
              <div className={`${s.btn} ${s.btn__secondary}`} onClick={() => {
                showContactUsModal({ subjectDefault: 0 });
              }}>
                <p>Request a demo</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HeadingSection;
