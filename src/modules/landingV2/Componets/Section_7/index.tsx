'use client';

import { Box, Card, CardBody, Image, VStack } from '@chakra-ui/react';
import s from './styles.module.scss';

const SliderSlick = dynamic(
  () => import('react-slick').then((m) => m.default),
  {
    ssr: false,
  },
);

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import SectionTitle from '../SectionTitle';
import { BLOGS, IBlog, LOGOS } from './constant';
import { useIsMobile, useIsTablet } from '@/hooks/useWindowResize';
import SvgInset from '@/components/SvgInset';

const Section_7 = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 4;
  const renderCard = (item: IBlog) => {
    const getLogo = useMemo((): string => {
      const tmp = LOGOS.filter((itemLogo) => {
        return itemLogo.id === item.logo;
      });
      return tmp.length ? tmp[0].img : '';
    }, [item]);
    return (
      <Box
        minH={'450px'}
        key={item.title}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
      >
        <Card bgColor={'#fff'} boxShadow={'none'}>
          <CardBody p={[0]}>
            {getLogo ? (
              <div className={s.cardLogo}>
                <Image
                  src={getLogo}
                  alt="thumb image"
                  width={'100%'}
                  height={28}
                  objectFit={'contain'}
                />
              </div>
            ) : (
              <Box height={'28px'} />
            )}
            <Image
              src={item.imageUrl}
              className={s.cardLogo_img}
              alt="thumb image"
              width={'100%'}
              height={186}
              objectFit={'cover'}
            />

            <Box height={'20px'} />
            <VStack gap={'32px'} align={'flex-start'}>
              <h3 className={s.cardLogo_title}>{item.title}</h3>

              <p className={s.cardLogo_decs}>{item.desc}</p>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    );
  };

  return (
    <div className={s.wrapper}>
      <div className="container">
        <SectionTitle className={s.wrapper_title} textAlign="left">
          Oh, and the press loves us too!
        </SectionTitle>
        <div className={s.sliderContainer}>
          <SliderSlick
            infinite={true}
            swipe={true}
            speed={1000}
            autoplaySpeed={3000}
            slidesToShow={numberSlide}
            slidesToScroll={numberSlide}
            autoplay={false}
            prevArrow={
              <SvgInset
                className={s.btn}
                svgUrl={'/landing-v2/svg/left_circle.svg'}
                size={48}
              />
            }
            nextArrow={
              <SvgInset
                className={s.btn}
                svgUrl={'/landing-v2/svg/right_circle.svg'}
                size={48}
              />
            }
          >
            {BLOGS.map(renderCard)}
          </SliderSlick>
        </div>
      </div>
    </div>
  );
};

export default Section_7;
