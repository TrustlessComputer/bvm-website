import s from './styles.module.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import Banner from '@/modules/landingV3/Componets/Banner';
import { Box, Flex } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';

const DELAY = 2;

export default function HeroVideo() {
  const router = useRouter();
  const { tracking } = useL2ServiceTracking();
  const { showContactUsModal } = useContactUs();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.heroVideo}>
        <div className={s.heroVideo_inner}>
          {/* <Banner /> */}

          <Box
            className={s.heroVideo_content}
            // pl={{ base: '20px', md: '40px', lg: '120px' }}
            // pr="20px"
          >
            <div className={` ${s.heroVideo_content_container}`}>
              <div className={s.content}>
                <h3 className={s.content_heading}>
                  Welcome to the future of Bitcoin.
                </h3>
                <p className={s.content_desc}>
                  BVM creates tools for the next generation of Bitcoin builders,
                  empowering them to develop advanced infrastructures and useful
                  apps.
                  <br /> Together, these builders bring Bitcoin to the people
                  and upgrade Bitcoin beyond just money.
                </p>
                {/* <div className={s.groupBtn}>
                <div
                  className={`${s.btn} ${s.btn__primary}`}
                  onClick={() => {
                    tracking('GET_STARTED');
                    router.push('/rollups/customizev2');
                  }}
                >
                  Let’s roll
                </div>
                <div
                  className={`${s.btn} ${s.btn__secondary}`}
                  onClick={() => {
                    showContactUsModal({ subjectDefault: 0 });
                  }}
                >
                  Request a demo
                </div>
              </div> */}
                <Flex
                  gap={5}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className={s.more_info}
                  px="20px"
                  flexWrap={'wrap'}
                >
                  {/* <Fade delay={DELAY + 0.6}> */}
                  <div>
                    <a
                      href={'#'}
                      onClick={() => setOpen(true)}
                      style={{ textAlign: 'center', display: 'block' }}
                    >
                      <img
                        src={`/landing-v4/frame-bvm.png`}
                        width={224}
                        alt={'right'}
                        style={{ margin: 'auto', marginBottom: '8px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: 400 }}>
                        What is BVM?
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={'#'}
                      onClick={() => router.push('/bvm')}
                      style={{ textAlign: 'center', display: 'block' }}
                    >
                      <img
                        src={`/landing-v4/frame-own-bvm-1.png`}
                        width={224}
                        alt={'right'}
                        style={{ margin: 'auto', marginBottom: '8px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: 400 }}>
                        Own a piece of BVM
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={'#'}
                      onClick={() => router.push('/build-bitcoin')}
                      style={{ textAlign: 'center', display: 'block' }}
                    >
                      <img
                        src={`/landing-v4/frame-studio-1.png`}
                        width={224}
                        alt={'right'}
                        style={{ margin: 'auto', marginBottom: '8px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: 400 }}>
                        Build with BVM Studio
                      </span>
                    </a>
                  </div>
                </Flex>
              </div>
            </div>
          </Box>
        </div>
      </div>

      <ModalVideo
        channel="custom"
        url={'/public-sale/public_sale_video_2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
