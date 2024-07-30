'use client';

import React, { useState } from 'react';
import s from './HackathonModue.module.scss';
import cn from 'classnames';
import { Box, Image as ChakraImage, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { CDN_URL } from '@/config';
import Fade from '@/interactive/Fade';
import LeaderboardSection from './LeaderboardSection';
import useCountdown from '@/hooks/useCountdown';
import Countdown from '@/components/Countdown';
import dayjs from 'dayjs';
import Link from 'next/link';
import IcLinkOrange from '@/public/hackathon/ic-link-orange.svg';

type Props = {};

const START_TIME = '2024-08-02T08:00:00Z';

const END_TIME = '2024-08-02T010:00:00Z';

const HackathonModule = (props: Props) => {
  const [peopleSubmitted, setPeopleSubmitted] = useState<number | null>(null);

  const startTime = useCountdown(START_TIME);

  const endTime = useCountdown(END_TIME);

  const fetchPeopleSubmitted = async () => {
    try {
      const res = await fetch('https://api.example.com/people-submitted');
      if (res) {
        const data = await res.json();
        setPeopleSubmitted(data?.count);
      }
    } catch (error) {
      console.error('Error fetching people submitted', error);
    }
  };

  const renderCountdown = () => {
    if (!startTime.ended) {
      return (
        <Flex alignItems={'center'} gap="4px">
          <Text whiteSpace={'nowrap'} opacity={0.6}>
            Start in
          </Text>
          <Countdown
            className={s.countDown_time}
            expiredTime={dayjs
              .utc(START_TIME, 'YYYY-MM-DD HH:mm:ss')
              .toString()}
            hideIcon={true}
            showDay
            // type="column"
            // hideZeroHour={true}
          />
        </Flex>
      );
    }

    if (!endTime.ended) {
      return (
        <Flex alignItems={'center'} gap="4px">
          <Text whiteSpace={'nowrap'} opacity={0.6}>
            End in
          </Text>
          <Countdown
            className={s.countDown_time}
            expiredTime={dayjs.utc(END_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
            hideIcon={true}
            showDay
            // type="column"
            // hideZeroHour={true}
          />
        </Flex>
      );
    }

    return <Text>Ended</Text>;
  };

  return (
    <>
      <div className="containerV3">
        <div className={cn(s.wrapper)}>
          {/* <Fade from={{ y: 40 }} to={{ y: 0 }}> */}

          <div className={s.left}>
            <div className={s.reward}>
              <ChakraImage src="/hackathon/ic-reward.svg" />
              <div>
                <Text
                  fontFamily={'SF Pro Display'}
                  fontSize={'16px'}
                  fontWeight={500}
                  letterSpacing={'0.48px'}
                  lineHeight={'180%'}
                  opacity={0.6}
                  mb="9px"
                >
                  Reward
                </Text>
                <p className={s.reward_amount}>$10,000</p>
              </div>
            </div>
            <div>
              <h2 className={s.title}>
                <p>BVM</p> <p>Code Battle</p>
              </h2>
              <p className={s.desc}>
                Starting on August 8th 2024, BVM is launching a weekly Solidity
                coding competition with the total prize pool of $10,000 for 20
                weeks.
              </p>
              <p className={s.desc}>
                BVM is the leading Rollup-As-A-Service on Bitcoin, in which
                anyone can launch their own blockchain on Bitcoin for only
                $99/month.
                <br />
                <Link href="/" className={s.link}>
                  Learn more about BVM here
                  <IcLinkOrange />
                </Link>
              </p>
            </div>
            <Flex alignItems={'center'} gap="24px">
              <button className={s.reward_btn}>Register</button>
              <div className={s.meta_info}>
                {!!peopleSubmitted && (
                  <Flex alignItems={'center'} gap="4px" mb="12px">
                    <b>1000</b>
                    <Text opacity={0.6}>people submitted</Text>
                  </Flex>
                )}
                {renderCountdown()}
              </div>
            </Flex>
          </div>
          {/* </Fade> */}
          <div className={s.right}>
            <Box position={'relative'} aspectRatio={'773 / 685'}>
              <Image
                layout="fill"
                alt="hero thumbnail"
                src={`${CDN_URL}/images/hero-thumbnail-1.png`}
                // `}
              />
            </Box>
          </div>
        </div>
      </div>
      <Box zIndex={1} pos={'relative'}>
        <LeaderboardSection />
      </Box>
    </>
  );
};

export default HackathonModule;
