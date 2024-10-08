'use client';

import dayjs from 'dayjs';
import {
  Box,
  Flex,
  Image as ChakraImage,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import Image from 'next/image';

import useCountdown from '@/hooks/useCountdown';

import s from '../styles.module.scss';
import { useMemo, useState } from 'react';

const TIME_START = '2024-07-25 14:00:00';

const CaseStudy = () => {
  const expiredTime = dayjs.utc(TIME_START, 'YYYY-MM-DD HH:mm:ss').toString();
  const {
    days = 0,
    hours,
    minutes,
    seconds,
    ended,
    isReady,
  } = useCountdown(expiredTime);
  const [isShowVideo, setIsShowVideo] = useState<boolean>(false);

  const renderCountDown = useMemo(() => {
    if (expiredTime) {
      if (ended) {
        return <Text className={s.time}>Ended</Text>;
      }

      const arrTime = [`${seconds}s`, `${minutes}m`];

      if (days !== null && days !== 0) {
        arrTime.push(`${days * 24 + Number(hours)}h`);
      } else if (hours !== '00') {
        arrTime.push(`${hours}h`);
      }

      return <Text className={s.time}>{arrTime.reverse().join(' : ')}</Text>;
    }

    return <Text className={s.time}>-- : -- : --</Text>;
  }, [expiredTime, ended, days, hours, minutes, seconds]);

  return (
    <Flex
      gap={['80px']}
      py={['80px']}
      minW="100%"
      justifyContent="space-between"
      direction={['column', 'row']}
    >
      <Flex gap={['24px']} direction="column">
        <Text className={s.label}>Case Study</Text>
        {/* <Box> */}
        {/* <Image src="/maga/trump.svg" alt="trump" /> */}
        {/* </Box> */}
        <Flex gap="12px" direction="column">
          <Text className={s.title} as="h6">
            BITCOIN WARS
          </Text>
          <Text className={s.description} maxW={['auto', '600px']}>
            Gear up for an epic adventure and strategize your way to victory in
            Bitcoin Wars, an incredibly fun onchain game on Bitcoin.
          </Text>
          {/* <Text className={s.description} maxW={['auto', '600px']}>
            Launching at the Bitcoin 2024 Conference in Nashville.
          </Text>
          <Text className={s.description} maxW={['auto', '600px']}>
            Earn 100 XP and get a{' '}
            <Text color="#fff" as="span">
              free Starbucks just a 2-minute walk from Music City Center!
            </Text>
          </Text> */}
        </Flex>
        <Flex
          gap="24px"
          direction={['column', 'row']}
          alignItems={['flex-start', 'center']}
        >
          <Skeleton isLoaded={isReady}>
            <a
              className={s.playNowBtn}
              href={
                ended
                  ? 'https://bitcoinwars.bvm.network'
                  : 'https://x.com/BVMnetwork'
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {ended ? 'Play for free' : 'Follow BVM on'}
              {ended === false && (
                <ChakraImage src="/maga/follow-x.svg" alt="x.com" />
              )}
            </a>
          </Skeleton>
          <Skeleton isLoaded={isReady}>
            <Flex
              alignItems="center"
              gap="12px"
              display={ended ? 'none' : 'flex'}
            >
              <Text className={s.timeTitle}>Launch in</Text>
              {renderCountDown}
            </Flex>
          </Skeleton>
        </Flex>
      </Flex>

      <Box className={s.thumbnail} onClick={() => setIsShowVideo(true)}>
        {isShowVideo === false && (
          <Box className={s.thumbnail_bg}>
            <Image
              className={s.imagePreload}
              src={'/vs.jpg'}
              width={1566}
              height={880}
              alt={'video'}
              sizes={'100vw'}
              quality={100}
            />
            <Box className={s.thumbnail_btn}>
              <Image src={'/play.svg'} alt={'icons'} width={20} height={20} />
            </Box>
          </Box>
        )}
        <video
          src="https://cdn.bvm.network/image/Bitcoin%20Wars%20Intro.mp4"
          width={160}
          height={90}
          preload="auto"
          playsInline
          controls
        />
      </Box>
    </Flex>
  );
};

export default CaseStudy;
