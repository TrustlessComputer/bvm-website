'use client';

import React, { useEffect, useState } from 'react';
import s from './HackathonModue.module.scss';
import {
  Box,
  Image as ChakraImage,
  Flex,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { CDN_URL } from '@/config';
import Fade from '@/interactive/Fade';
import LeaderboardSection from './LeaderboardSection';
import useCountdown from '@/hooks/useCountdown';
import Countdown from '@/components/Countdown';
import dayjs from 'dayjs';
import Link from 'next/link';
import ButtonConnected from '@/components/ButtonConnected/v2';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useDispatch } from 'react-redux';
import { openModal } from '@/stores/states/modal/reducer';
import RegisterModal, { REGISTER_MODAL } from './Register/Modal';
import {
  checkRegistered,
  getContestStats,
} from '@/services/api/EternalServices';
import cn from 'classnames';
import { formatCurrencyV2, humanReadable } from '@/utils/format';
import FAQs from '@/components/faq';
import { FAQ_POC } from './faqs';
import { LINKS } from '@/constants/external-links';

type Props = {};

const START_TIME = '2024-08-01T10:00:00Z';

const END_TIME = '2024-08-06T10:00:00Z';

// export private key
// should check wallet.privateKey first,
// if not exist, then call login
// else show private key for user to copy

const HackathonModule = (props: Props) => {
  const { loggedIn, login, logout, userInfo, wallet } = useWeb3Auth();
  const dispatch = useDispatch();

  const [peopleSubmitted, setPeopleSubmitted] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const startTime = useCountdown(START_TIME);

  const endTime = useCountdown(END_TIME);

  const fetchPeopleSubmitted = async () => {
    try {
      const res = await getContestStats();
      if (res) {
        setPeopleSubmitted(res?.total_register);
      }
    } catch (error) {
      console.error('Error fetching people submitted', error);
    }
  };

  const renderCountdown = () => {
    if (!startTime.ended) {
      return (
        <Flex
          alignItems={'center'}
          gap="4px"
          flexDir={{ base: 'column', xl: 'row' }}
        >
          <Text whiteSpace={'nowrap'} opacity={0.6}>
            Practice battle starts in
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

    console.log('🚀 ~ renderCountdown ~ endTime.ended:', endTime.ended);
    if (!endTime.ended) {
      return (
        <Flex alignItems={'center'} gap="4px">
          <Text whiteSpace={'nowrap'} opacity={0.6}>
            Practice battle ends in
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

  const handleOpenRegisterModal = () => {
    if (!loggedIn) {
      login();
    }

    dispatch(
      openModal({
        id: REGISTER_MODAL,
        className: s.modalContent,
        modalProps: {
          size: 'xl',
        },
        theme: 'light',
        render: () => (
          <RegisterModal
            userInfo={userInfo}
            setIsRegistered={setIsRegistered}
          />
        ),
      }),
    );
  };

  const checkUserRegistered = async () => {
    try {
      const res = await checkRegistered();
      if (res) {
        setIsRegistered(res?.register || false);
      }
    } catch (error) {
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    fetchPeopleSubmitted();
    checkUserRegistered();
  }, [userInfo]);

  useEffect(() => {
    // refetch every 5 seconds

    const interval = setInterval(() => {
      fetchPeopleSubmitted();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                  Weekly Prize Pool
                </Text>
                <p className={s.reward_amount}>$500</p>
              </div>
            </div>
            <div>
              <h2 className={s.title}>
                <p>Proof of Code</p>
              </h2>
              <p className={s.desc}>
                Introducing Proof of Code: the weekly crypto coding competition
                with weekly prize pools of $500, starting with Solidity
                problems.
              </p>
              <p className={s.desc}>
                Proof of Code is hosted by BVM - the leading Rollup as a Service
                on Bitcoin, where anyone can easily launch their own blockchain
                on Bitcoin for only $99/month.
              </p>
              <p className={s.desc}>
                Register now to sharpen your coding abilities, connect with a
                community of like-minded developers, and prove that you are the
                best.
                {/* <br />
                <Link href="/" className={s.link}>
                  Learn more about BVM here
                  <Image
                    src="/hackathon/ic-link-orange.svg"
                    alt="link"
                    width={16}
                    height={16}
                  ></Image>
                </Link> */}
              </p>
            </div>
            <Flex
              alignItems={'center'}
              gap="16px"
              flexWrap={'wrap'}
              rowGap={'24px'}
            >
              <div className={s.connect_btn}>
                <a
                  href={LINKS.POC_TELEGRAM_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.tele_link}
                >
                  Join dev community
                </a>
              </div>

              <ButtonConnected title="Register" className={s.reward_btn}>
                <button
                  className={cn(s.reward_btn, {
                    [s.registered]: isRegistered,
                  })}
                  onClick={handleOpenRegisterModal}
                  disabled={isRegistered}
                >
                  {isRegistered ? 'Registered' : 'Register'}
                </button>
              </ButtonConnected>
              <div className={s.meta_info}>
                {!!peopleSubmitted && (
                  <Flex alignItems={'center'} gap="4px" mb="12px">
                    <b>
                      {formatCurrencyV2({
                        amount: peopleSubmitted,
                        decimals: 0,
                      })}
                    </b>
                    <Text opacity={0.6}>people registered</Text>
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
                src={`/images/poc/candidate-with-result-3x.png`}
                // srcSet={`
                //   /images/candidate-with-result-1x.png 1x,
                //   /images/candidate-with-result-2x.png 2x,
                //   /images/candidate-with-result-3x.png 3x,
                // `}
              />
            </Box>
          </div>
        </div>
      </div>
      <Box zIndex={1} pos={'relative'}>
        <LeaderboardSection />
      </Box>
      <Box
        zIndex={10}
        bg="#000"
        pos={'relative'}
        mt={{
          base: '0px',
          // md: '100px',
        }}
        pb={{
          base: '60px',
          md: '160px',
        }}
        className={s.faq}
        overflow={'hidden'}
      >
        <Box
          pt={{
            base: '60px',
          }}
          maxW={'846px'}
          mx="auto"
          zIndex={2}
          pos={'relative'}
        >
          <Text as="h3" className={s.faq_title}>
            FAQs
          </Text>
          <FAQs data={FAQ_POC} viewAll />
        </Box>
        <ChakraImage
          pos={'absolute'}
          maxW={'1107px'}
          maxH={'1096px'}
          left={'45%'}
          transform={'translate(-50%, 50%)'}
          bottom="0"
          alt="hero thumbnail"
          zIndex={1}
          src={`${CDN_URL}/images/hero-gradient-bg.png`}
          // `}
        />
      </Box>
    </>
  );
};

export default HackathonModule;
