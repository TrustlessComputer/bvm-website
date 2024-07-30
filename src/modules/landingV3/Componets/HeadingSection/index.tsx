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
  isVideo?: boolean;
  showBtn?: boolean;
}


const HeadingSection = ({...props}: THeadingSection) => {
  const { bgColor = '#ffffff', title = '' } = props;
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);

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
        {
          props.isVideo && (
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


          )
        }
      </div>
    </div>
  )
}

export default HeadingSection;
