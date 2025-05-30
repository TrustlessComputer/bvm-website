import React, { useState } from 'react';
import s from './styles.module.scss'
import { useRouter } from 'next/navigation';
import Loader from '@/modules/builder-landing/Loader';
import cn from 'classnames';
import Heading from './Heading';
import { Button, Flex } from '@chakra-ui/react';
import Fade from '@interactive/Fade';
import { isDesktop } from 'react-device-detect';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
import {VIDEO_HERO_MAIN} from "@constants/common";

const HeroV3 = (): React.JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={cn(s.inner)}>
        <Heading />
        <Fade delay={0.7} delayEnter={0.7} from={{ y: 40 }} to={{ y: 0 }}>
          <div>
            <a
              href={'#'}
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className={s.footer_video}
            >
              <Image
                src={`/btn-play-4.jpg`}
                width={858}
                height={440}
                alt={'right'}
              />
            </a>
          </div>
        </Fade>
      </div>
      <ModalVideo
        channel="custom"
        url={VIDEO_HERO_MAIN}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  )
}

export default HeroV3
