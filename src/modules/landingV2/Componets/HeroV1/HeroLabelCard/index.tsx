import 'react-tooltip/dist/react-tooltip.css';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import SvgInset from '@/components/SvgInset';
import { ModuleData } from './moduleData';
import ModuleItem from './ModuleItem';
import s from './styles.module.scss';
import Fade from '@interactive/Fade';
// import { CDN_URL } from '@/config';

const DELAY = 2;
const HeroLabelCard = ({ isFooter }: { isFooter?: boolean }) => {
  const delay = isFooter ? 0 : DELAY;
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.heroLabel}>
      <div className={`${s.container}`}>
        <div className={`container ${s.content}`}>
          <Fade delay={6.8}>
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
          </Fade>
          <Fade delay={6.9}>
            <div className={s.listActions}>

              <div className={s.video}>
                <a
                  href={'#'}
                  onClick={() => setOpen(true)}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  <div className={s.wrapImgs}>
                    {/*<img className={s.cdn} src={`${CDN_URL}/nbc/images/Gif_01-ezgif.com-video-to-gif-converter%20(1).gif`} alt='converter' />*/}
                    {/*<img*/}
                    {/*  className={s.lb}*/}
                    {/*  src={`/ai-landing/btn-video-hero.png`}*/}
                    {/*  width={224}*/}
                    {/*  alt={'right'}*/}
                    {/*  style={{ margin: 'auto', marginBottom: '8px' }}*/}
                    {/*/>*/}

                    <img
                      src={`/landing/btn-hero-play-v2.png`}
                      width={224}
                      alt={'right'}
                      style={{ margin: 'auto', marginBottom: '8px' }}
                    />

                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 400 }}>
                Watch the film
              </span>
                </a>
              </div>

              {/*<div className={s.video}>*/}
              {/*  <a*/}
              {/*    href={'/truly-open-ai.pdf'}*/}
              {/*    target={'_blank'}*/}
              {/*    style={{ textAlign: 'center', display: 'block' }}*/}
              {/*  >*/}
              {/*    <img*/}
              {/*      src={`/ai-landing/btn-whitepaper.png`}*/}
              {/*      width={224}*/}
              {/*      alt={'right'}*/}
              {/*      style={{ margin: 'auto', marginBottom: '8px' }}*/}
              {/*    />*/}
              {/*    <span style={{ fontSize: '14px', fontWeight: 400 }}>*/}
              {/*    Read the WhitePaper*/}
              {/*  </span>*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </Fade>
        </div>

        <ModalVideo
          channel="custom"
          url={`/public-sale/public_sale_video_2.mp4`}
          isOpen={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default HeroLabelCard;
