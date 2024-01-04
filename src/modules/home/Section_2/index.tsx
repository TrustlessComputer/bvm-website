'use client';

import { isMobile, isTablet } from 'react-device-detect';
import s from './styles.module.scss';

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
} from '@chakra-ui/react';

const SliderSlick = dynamic(
  () => import('react-slick').then((m) => m.default),
  {
    ssr: false,
  },
);

import dynamic from 'next/dynamic';
import { DataList, SlideItemType } from './config';

const Section_2 = () => {
  // const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 3;
  const renderCard = (item: SlideItemType) => {
    return (
      <Box p={[2]} key={item.key}>
        <Card key={item.key} bgColor={'#fff'}>
          <CardBody>
            <Image src={item.srcImg} alt="thumb image" borderRadius="lg" />
            <Box height={'20px'} />
            <HStack align={'center'} justify={'space-between'}>
              <Text
                fontSize={['16px', '24px']}
                fontWeight={400}
                lineHeight={'110%'}
                textAlign={'center'}
                color={'#000'}
              >
                {item.title}
              </Text>
              <Button
                borderRadius={100}
                bgColor={'#fff'}
                fontSize={['13px', '16px']}
                display={'flex'}
                justifyContent={'center'}
                fontWeight={400}
                color={'black'}
                alignItems={'center'}
                boxShadow={'0px 0px 20px -6px rgba(0, 0, 0, 0.2)'}
                rightIcon={
                  <Image
                    src={'/icons/view_project_ic.svg'}
                    alt="thumb image"
                    w={'24px'}
                    h={'24px'}
                    borderRadius={100}
                    bgColor={'#00C250'}
                  />
                }
              >
                View Project
              </Button>
            </HStack>
          </CardBody>
          {item.childrentList && (
            <>
              <Divider w={'92%'} alignSelf={'center'} />
              <CardFooter>
                <Stack spacing={'20px'}>
                  {item.childrentList.map((children) => (
                    <HStack key={children.desc}>
                      <Image
                        src={children.icon}
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Text
                        fontSize={['13px', '16px']}
                        fontWeight={400}
                        lineHeight={'140%'}
                        color={'#000'}
                      >
                        {children.desc}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
              </CardFooter>
            </>
          )}
        </Card>
      </Box>
    );
  };
  return (
    <Box
      bgColor={'#F3F1E8'}
      flexDir={'column'}
      display={'flex'}
      flex={1}
      overflow={'hidden'}
      justifyContent={'center'}
      alignContent={'center'}
    >
      <Box className="maxWidth" alignSelf={'center'} py={['120px']}>
        <Text
          textAlign={'left'}
          fontSize={['24px', '48px']}
          lineHeight={'110%'}
          color={'#000'}
        >
          {`The Bitcoin Superchain`}
        </Text>

        <Box height={['40px']}></Box>
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
                left={[-5, -12]}
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
            {DataList.map(renderCard)}
          </SliderSlick>
        </div>
      </Box>
    </Box>
  );
};

export default Section_2;
