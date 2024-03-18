import 'react-tooltip/dist/react-tooltip.css';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';
import SvgInset from '@/components/SvgInset';
import { ModuleData } from './moduleData';
import ModuleItem from './ModuleItem';
import s from './styles.module.scss';
import { VIDEOS_CDN } from '@constants/common';
const DELAY = 2;
const HeroLabel = ({ isFooter }: { isFooter?: boolean }) => {
  const delay = isFooter ? 0 : DELAY;
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.heroLabel}>
      <div className={`${s.container}`}>
        <div className={`container ${s.content}`}>
          <div className={s.module}>
            <p className={s.module_title}>
              <SvgInset svgUrl="/ai-landing/storage.svg" />
              Powered by the best-of-breed modules
            </p>
            <div className={s.module_list}>
              {ModuleData.map((item, index) => (
                <ModuleItem
                  key={index}
                  logoUrl={item.logoUrl}
                  title={item.title}
                />
              ))}
            </div>
          </div>

          <div className={s.video}>
            <a
              href={'#'}
              onClick={() => setOpen(true)}
              style={{ textAlign: 'center', display: 'block' }}
            >
              <img
                src={`/ai-landing/ai_video.png`}
                width={224}
                alt={'right'}
                style={{ margin: 'auto', marginBottom: '8px' }}
              />
              <span style={{ fontSize: '14px', fontWeight: 400 }}>
                Watch the film
              </span>
            </a>
          </div>
        </div>
        <ModalVideo
          channel="custom"
          url={`${VIDEOS_CDN}/Intro_ver03_02.mp4`}
          isOpen={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default HeroLabel;
