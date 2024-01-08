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
import { useRouter } from 'next/navigation';

const SliderSlick = dynamic(
  () => import('react-slick').then((m) => m.default),
  {
    ssr: false,
  },
);

import dynamic from 'next/dynamic';
import { DataList, SlideItemType } from './config';

const Section_2 = () => {
  const router = useRouter();
  // const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 3;
  const renderCard = (item: SlideItemType) => {
    return (
      <Box
        p={[2]}
        key={item.key}
        as="button"
        _hover={{
          cursor: item.isComminSoon ? 'none' : 'pointer',
        }}
        onClick={() => {
          item.isComminSoon ? null : window.open(item.href, '_blank');
        }}
      >
        <Card key={item.key} bgColor={'#fff'} borderRadius={0}>
          <CardBody>
            <Image src={item.srcImg} alt="thumb image" />
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
                color={item.isComminSoon ? '#666666' : 'black'}
                alignItems={'center'}
                boxShadow={'0px 0px 20px -6px rgba(0, 0, 0, 0.2)'}
                rightIcon={
                  item.isComminSoon ? (
                    <></>
                  ) : (
                    <Image
                      src={'/icons/view_project_ic.svg'}
                      alt="thumb image"
                      w={'24px'}
                      h={'24px'}
                      borderRadius={100}
                      bgColor={'#FF7E21'}
                    />
                  )
                }
              >
                {`${item.isComminSoon ? 'Coming soon' : 'View Project'}`}
              </Button>
            </HStack>
          </CardBody>
          {item.childrentList && (
            <>
              <Divider w={'92%'} alignSelf={'center'} color={'#ECECEC'} />
              <CardFooter>
                <Stack spacing={'20px'} w={'100%'}>
                  {item.childrentList.map((children) => (
                    <Flex
                      key={children.desc}
                      flexDir={'row'}
                      display={'flex'}
                      align={'center'}
                      justify={'space-between'}
                    >
                      <HStack>
                        <Image
                          src={children.icon}
                          alt="Green double couch with wooden legs"
                          borderRadius="lg"
                        />
                        <Text
                          fontSize={['13px', '16px']}
                          fontWeight={400}
                          lineHeight={'140%'}
                          opacity={0.7}
                          color={'#000'}
                        >
                          {children.desc}
                        </Text>
                      </HStack>
                      <Text
                        fontSize={['13px', '16px']}
                        fontWeight={400}
                        lineHeight={'120%'}
                        color={'#000'}
                      >
                        {children.desc1}
                      </Text>
                    </Flex>
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
        <Flex display={'flex'} alignItems={'center'} justify={'space-between'}>
          <Text
            textAlign={'left'}
            fontSize={['24px', '48px']}
            maxW={'907px'}
            lineHeight={'110%'}
            color={'#000'}
          >
            {`Say hello to the first `}
            <Text fontSize={['48px']} color={'#FF7E21'} as="span">
              {`Bitcoin L2 blockchains.`}
            </Text>{' '}
          </Text>

          <Button
            bgColor={'#FF7E21'}
            color={'#fff'}
            borderRadius={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            minW={['180px']}
            height={'48px'}
            fontWeight={400}
            fontSize={'20px'}
            onClick={() => {
              router.push('/blockchains/customize');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            {`Build your Bitcoin L2`}
          </Button>
        </Flex>

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
