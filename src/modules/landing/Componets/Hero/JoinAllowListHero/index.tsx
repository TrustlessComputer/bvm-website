import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';

const DELAY = 6.5;
const JoinAllowListHero = ({ isFooter }: { isFooter?: boolean }) => {

  const delay = isFooter ? 0 : DELAY;
  const [isOpen, setOpen] = useState(false);

  return (

    <div className={`${s.container} ${isFooter && s.isFooter}`}>
      <div className={`container ${s.content}`}>
        <HeroLabel />
        <Flex gap={5} flexDirection={'column'}>
          <Fade delay={delay + .4}>
            <div>
              <a href={'#'} onClick={() => setOpen(true)} style={{ textAlign: 'center', display: 'block' }}>
                <img src={`/public-sale/btn-play-4.png`} width={224} alt={'right'}
                     style={{ margin: 'auto', marginBottom: '8px' }} />
                <span style={{ fontSize: '14px', fontWeight: 400 }}>What is BVM?</span>
              </a>
            </div>
          </Fade>
        </Flex>
      </div>
      <ModalVideo
        channel='custom'
        url={'/public-sale/public_sale_video_2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>

  );
};

export default JoinAllowListHero;
