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

const Section_7 = () => {
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 3;
  const renderCard = (item: IBlog) => {
    return (
      <Box
        minH={'450px'}
        key={item.title}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
      >
        <Card bgColor={'#000'}>
          <CardBody p={[0]} paddingRight={['20px']}>
            <Image
              src={item.imageUrl}
              alt="thumb image"
              borderRadius="lg"
              width={'100%'}
              maxH={['265px']}
              objectFit={'cover'}
            />
            <Box height={'20px'} />
            <VStack align={'flex-start'}>
              <Text fontSize={['24px']} fontWeight={400} color={'#fff'}>
                {item.title}
              </Text>
              <Text
                fontSize={['16px']}
                fontWeight={400}
                color={'#fff'}
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
      bgColor={'#000'}
      display={'flex'}
      flexDirection={'column'}
      py={['120px']}
      justifyContent={'center'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        className="maxWidth"
        alignSelf={'center'}
      >
        <Text fontSize={['48px']} color={'#fff'} textAlign={'center'}>
          Oh, and the press loves us too!
        </Text>
        <Box height={['40px']} />
        <div className={s.sliderContainer}>
          <SliderSlick
            prevArrow={
              <Image
                src={'/icons/left_circle_ic.svg'}
                borderRadius={100}
                width={isMobile ? 25 : 50}
                height={isMobile ? 25 : 50}
                alignSelf={'center'}
                position={'absolute'}
                zIndex={999}
                left={[-5, -14]}
              />
            }
            nextArrow={
              <Image
                src={'/icons/right_circle_ic.svg'}
                borderRadius={100}
                width={isMobile ? 25 : 50}
                height={isMobile ? 25 : 50}
                alignSelf={'center'}
                position={'absolute'}
                zIndex={999}
                right={[-5, -12]}
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
      </Box>
    </Box>
  );
};

export default Section_7;
