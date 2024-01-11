'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import { isMobile, isTablet } from 'react-device-detect';
import s from './styles.module.scss';

const SliderSlick = dynamic(
  () => import('react-slick').then((m) => m.default),
  {
    ssr: false,
  },
);

import dynamic from 'next/dynamic';
import { IBlog, BLOGS } from './constant';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';

const Section_7 = () => {
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 4;
  const renderCard = (item: IBlog) => {
    return (
      <Box
        minH={'450px'}
        key={item.title}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
      >
        <Card bgColor={'#fff'} boxShadow={'none'}>
          <CardBody p={[0]} paddingRight={['20px']}>
            <Image
              src={item.imageUrl}
              alt="thumb image"
              width={'100%'}
              height={200}
              objectFit={'cover'}
            />
            <Box height={'20px'} />
            <VStack align={'flex-start'}>
              <Text fontSize={['24px']} fontWeight={400} color={'#000'}>
                {item.title}
              </Text>
              <Text
                fontSize={['16px']}
                fontWeight={400}
                color={'#000'}
                opacity={0.7}
              >
                {item.desc}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    );
  };

  return (
    <Box
      bgColor={'#fff'}
      display={'flex'}
      flexDirection={'column'}
      py={['120px']}
      justifyContent={'center'}
      className={s.slide}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        className="maxWidth"
        alignSelf={'center'}
      >
        <Text className={s.heading} fontSize={['48px']} color={'#000'}>
          <Chars>
            Oh, and the <span>press loves us too!</span>
          </Chars>
        </Text>
        <Box height={['40px']} />
        <Fade delay={0.2}>
          <div className={s.sliderContainer}>
            <SliderSlick
              prevArrow={
                <Image
                  className={s.btn}
                  src={'/icons/left_circle_ic.svg'}
                  borderRadius={100}
                  width={isMobile ? 25 : 50}
                  height={isMobile ? 25 : 50}
                  alignSelf={'center'}
                  position={'absolute'}
                  zIndex={999}
                />
              }
              nextArrow={
                <Image
                  className={s.btn}
                  src={'/icons/right_circle_ic.svg'}
                  borderRadius={100}
                  width={isMobile ? 25 : 50}
                  height={isMobile ? 25 : 50}
                  alignSelf={'center'}
                  position={'absolute'}
                  zIndex={999}
                />
              }
              infinite={true}
              swipe={true}
              speed={1000}
              autoplaySpeed={3000}
              slidesToShow={numberSlide}
              slidesToScroll={numberSlide}
              autoplay={false}
              centerPadding={'45px'}
            >
              {BLOGS.map(renderCard)}
            </SliderSlick>
          </div>
        </Fade>
      </Box>
    </Box>
  );
};

export default Section_7;
