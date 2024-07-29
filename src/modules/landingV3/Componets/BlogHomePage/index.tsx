'use client';

import dynamic from 'next/dynamic';
import { BLOGS, IBlog, LOGOS } from '@/modules/landingV2/Componets/Section_7/constant';
import { useMemo } from 'react';
import { Box, Card, CardBody, Image, VStack } from '@chakra-ui/react';
import s from './styles.module.scss';
import SectionTitle from '@/modules/landingV2/Componets/SectionTitle';
import SvgInset from '@components/SvgInset';


const SliderSlick = dynamic(
  () => import('react-slick').then((m) => m.default),
  {
    ssr: false,
  },
);


const BlogHomePage = () => {
  const numberSlide =  4;

  const renderCard = (item: IBlog) => {
    return (
      <div
        key={item.title}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
        className={s.cardLogo}
      >
        <div>
          <Image
            src={item.imageUrl}
            className={s.cardLogo_img}
            alt="thumb image"
            width={'100%'}
            height={186}
            objectFit={'cover'}
          />
        </div>

        <div>
          <h3 className={s.cardLogo_title}>{item.title}</h3>
          <p className={s.cardLogo_decs}>{item.desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={s.wrapper}>
      <div className="container">
      <p className={s.wrapper_title}>
          Oh, and the <span>press loves us too!</span>
        </p>
        <div className={s.sliderContainer}>
          <SliderSlick
            infinite={true}
            swipe={true}
            speed={1000}
            autoplaySpeed={3000}
            slidesPerRow={2}
            rows={2}
            autoplay={false}
            // prevArrow={
            //   <SvgInset
            //     className={s.btn}
            //     svgUrl={'/landing-v2/svg/left_circle.svg'}
            //     size={48}
            //   />
            // }
            // nextArrow={
            //   <SvgInset
            //     className={s.btn}
            //     svgUrl={'/landing-v2/svg/right_circle.svg'}
            //     size={48}
            //   />
            // }
          >
            {BLOGS.map(renderCard)}
          </SliderSlick>
        </div>
      </div>
    </div>
  )
}

export default BlogHomePage
