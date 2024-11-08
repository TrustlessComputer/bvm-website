import React, { useState } from 'react';
import s from './HeroV5.module.scss';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { VIDEO_BVM_STUDIO_HOW_IT_WORK } from '@/constants/common';
import UserReviews from '../UserReviews';
import cn from 'classnames';

const HeroV5 = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
  const [firstClick, setFirstClick] = useState(false);
  // const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className={cn(s.wrapper, 'containerV3')}>
      <div className={s.upper}>
        <div className={s.left}>
          <h2 className={s.title}>Servers with superpowers.</h2>
          <p className={s.desc}>
            Bitcoin Virtual Machines are a new kind of server running on
            Bitcoin. Open, verifiable, and censorship-resistant. Built to power
            the next generation of unstoppable applications.
          </p>
          <Flex alignItems={'center'} gap="20px">
            <Link href="/studio" className={s.primary_btn}>
              Get Started
            </Link>
            {/* <Link
              href="https://docs.bvm.network/bvm"
              target="_blank"
              rel="
              noopener noreferrer
            "
              className={s.link_docs}
            >
              View docs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.172 12.0007L8.222 7.05072L9.636 5.63672L16 12.0007L9.636 18.3647L8.222 16.9507L13.172 12.0007Z"
                  fill="#FA4E0E"
                />
              </svg>
            </Link> */}
          </Flex>
        </div>
        <div className={s.right}>
          <div
            className={`${s.thumbnail} `}
            // ref={refContent}
            onClick={() => {
              if (!firstClick) {
                setFirstClick(true);

                setTimeout(() => {
                  if (videoRef.current) {
                    // check if video playing
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }, 100);
              }
              // else {
              //   if (videoRef.current) {
              //     // check if video playing
              //     if (videoRef.current.paused) {
              //       // videoRef.current.play();
              //     } else {
              //       videoRef.current.pause();
              //     }
              //   }
              // }

              // toggle video
            }}
          >
            <video
              ref={videoRef}
              // poster={'/home-v5-video.png'}
              src={
                'https://storage.googleapis.com/tc-cdn-prod/pages/bvm-studio/AIVoicePrompt_v2_02.mp4'
              }
              width={160}
              height={90}
              preload="auto"
              playsInline
              controls={!!firstClick}
            />
            {!firstClick && (
              <Box
                position={'absolute'}
                top={0}
                left="0"
                w="100%"
                h="100%"
                className={s.video_pause}
              >
                <video
                  className={s.video_thumbnail}
                  src={
                    'https://storage.googleapis.com/bvm-network/image/bvm_hero_video_v3_comp.mp4'
                  }
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload={'auto'}
                />
                <div className={s.play_btn}>
                  <img src="/landing-v6/ic-play.png" />
                </div>
              </Box>
            )}
          </div>
        </div>
      </div>
      <div className={s.lower}>
        <UserReviews />
      </div>
    </div>
  );
};

export default HeroV5;
