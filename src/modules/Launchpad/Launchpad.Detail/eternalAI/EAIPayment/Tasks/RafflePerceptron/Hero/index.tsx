import React, { useEffect, useRef } from 'react';
// import SliderSlick from 'react-slick';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { Button, useDisclosure } from '@chakra-ui/react';
import FilmsModal from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Tasks/RafflePerceptron/Films';

const CDN_URL = 'https://cdn.generative.xyz';

const PerceptronsHero = () => {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  // const refWrap = useRef<HTMLDivElement | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  //
  // const listThumbs = [
  //   `${CDN_URL}/Screen%20Shot%202023-03-21%20at%2010.43.18%20AM.jpg`,
  //   `${CDN_URL}/images/thumb/slider-1-2-thumb.jpeg`,
  //   `${CDN_URL}/images/thumbs/2.jpg`,
  //   `${CDN_URL}/images/thumb/slider-2.jpg`,
  //   `${CDN_URL}/images/thumb/slider-3.jpg`,
  //   `${CDN_URL}/images/thumb/slider-4.jpg`,
  // ];
  //
  // // const settings = {
  // //   customPaging: function (i: number) {
  // //     return (
  // //       <a>
  // //         <img src={listThumbs[i]} alt="" />
  // //       </a>
  // //     );
  // //   },
  // //   dots: true,
  // //   dotsClass: 'slick-dots slick-thumb',
  // //   infinite: true,
  // //   speed: 500,
  // //   effect: 'fade',
  // //   slidesToShow: 1,
  // //   slidesToScroll: 1,
  // // };

  useEffect(() => {
    return () => {
      if (refVideo?.current) {
        refVideo?.current && (refVideo?.current as any).pause();
      }
    };
  }, []);

  return (
    <>
      <div className={s.hero}>
        {/*<div>*/}
        {/*  <div className="row">*/}
        {/*    <div className={`${s.hero_right}`}>*/}
        {/*      <div ref={refWrap as any} className={s.slider}>*/}
        {/*        <SliderSlick {...settings}>*/}
        {/*          <div>*/}
        {/*            <video*/}
        {/*              ref={refVideo as any}*/}
        {/*              poster={`${CDN_URL}/Screen%20Shot%202023-03-21%20at%2010.43.18%20AM.jpg`}*/}
        {/*              src={`${CDN_URL}/Teaser_GenBrain_01.mp4`}*/}
        {/*              preload="auto"*/}
        {/*              autoPlay*/}
        {/*              playsInline*/}
        {/*              loop*/}
        {/*              muted*/}
        {/*            />*/}
        {/*            <Button className={`${s.btnVideo}`} onClick={() => onOpen()}>*/}
        {/*              Watch the film*/}
        {/*              <SvgInset*/}
        {/*                svgUrl={`${CDN_URL}/images/ic-play-circle.svg`}*/}
        {/*                size={44}*/}
        {/*              />*/}
        {/*            </Button>*/}
        {/*          </div>*/}
        {/*          <div>*/}
        {/*            <img*/}
        {/*              alt=""*/}
        {/*              src={CDN_URL + '/images/thumb/slider-1-2-2.jpeg'}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div>*/}
        {/*            <img alt="" src={CDN_URL + '/images/2.jpg'} />*/}
        {/*          </div>*/}
        {/*          <div>*/}
        {/*            <img alt="" src={CDN_URL + '/images/slider-2.jpg'} />*/}
        {/*          </div>*/}
        {/*          <div>*/}
        {/*            <img alt="" src={CDN_URL + '/images/slider-3.jpg'} />*/}
        {/*          </div>*/}
        {/*          <div>*/}
        {/*            <img alt="" src={CDN_URL + '/images/slider-4.jpg'} />*/}
        {/*          </div>*/}
        {/*        </SliderSlick>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className={`${s.hero_left}`}>*/}
        {/*      <div className={s.hero_left_inner}>*/}
        {/*        <ContentNoLogin />*/}
        {/*        <ContentNoLoginBottom />*/}
        {/*        <RankingModal />*/}
        {/*        <FilmsModal isShow={isOpen} onHide={onClose} />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <video
          ref={refVideo as any}
          poster={`${CDN_URL}/Screen%20Shot%202023-03-21%20at%2010.43.18%20AM.jpg`}
          src={`${CDN_URL}/Teaser_GenBrain_01.mp4`}
          preload="auto"
          autoPlay
          playsInline
          loop
          muted
        />
        <Button className={`${s.btnVideo}`} onClick={() => onOpen()}>
          {/*Watch the film*/}
          <SvgInset svgUrl={`${CDN_URL}/images/ic-play-circle.svg`} size={44} />
        </Button>
      </div>
      <FilmsModal isShow={isOpen} onHide={onClose} />
    </>
  );
};

export default PerceptronsHero;
