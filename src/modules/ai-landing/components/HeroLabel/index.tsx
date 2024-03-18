import 'react-tooltip/dist/react-tooltip.css';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';
import s from './styles.module.scss';

const DELAY = 2;
const HeroLabel = ({ isFooter }: { isFooter?: boolean }) => {
  const delay = isFooter ? 0 : DELAY;
  const [isOpen, setOpen] = useState(false);

  return (
    <Fade delay={delay}>
      <div className={`${s.container}`}>
        <div className={`container ${s.content}`}>
          <div>
            MOdules
          </div>

          <Flex gap={5} flexDirection={'column'}>
            <Fade delay={delay + 0.6}>
              <div>
                <a
                  href={'#'}
                  onClick={() => setOpen(true)}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  <img
                    src={`/public-sale/btn-play-4.png`}
                    width={224}
                    alt={'right'}
                    style={{ margin: 'auto', marginBottom: '8px' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 400 }}>
                    What is BVM?
                  </span>
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
    </Fade>
  );
};

export default HeroLabel;
