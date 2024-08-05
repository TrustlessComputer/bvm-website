'use client';

import ButtonConnected from '@/components/ButtonConnected/v2';
import Countdown from '@/components/Countdown';
import FAQs from '@/components/faq';
import { CDN_URL } from '@/config';
import { LINKS } from '@/constants/external-links';
import useCountdown from '@/hooks/useCountdown';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import {
  checkRegistered,
  getContestStats,
  registerCodeBattle,
} from '@/services/api/EternalServices';
import { IUserContest } from '@/services/api/EternalServices/types';
import { openModal } from '@/stores/states/modal/reducer';
import { Box, Image as ChakraImage, Flex, Text } from '@chakra-ui/react';
import cn from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FAQ_POC } from './faqs';
import s from './HackathonModue.module.scss';
import LeaderboardSection from './LeaderboardSection';
import RegisterModal, { REGISTER_MODAL } from './Register/Modal';
import CompetitionTimer from './CompetitionTimer';

type Props = {};

const START_TIME = '2024-08-08T10:00:00Z';

const END_TIME = '2024-08-15T10:00:00Z';

// export private key
// should check wallet.privateKey first,
// if not exist, then call login
// else show private key for user to copy

const TimeCounter = () => {
  const startTime = useCountdown(START_TIME);

  const endTime = useCountdown(END_TIME);
  if (!startTime.ended) {
    return (
      <Flex
        alignItems={'center'}
        gap="4px"
        flexDir={{ base: 'column', xl: 'row' }}
      >
        <Text whiteSpace={'nowrap'} opacity={0.6}>
          Competition starts in
        </Text>
        <Countdown
          className={s.countDown_time}
          expiredTime={dayjs.utc(START_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
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
          Competition ends in
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

const HackathonModule = (props: Props) => {
  const { loggedIn, login, logout, userInfo, wallet } = useWeb3Auth();
  const dispatch = useDispatch();

  const [peopleSubmitted, setPeopleSubmitted] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentUserContest, setCurrentUserContest] = useState<IUserContest>();

  useEffect(() => {
    let setTimeoutInstance: NodeJS.Timeout | null = null;
    if (!!userInfo && !!wallet && !isRegistered) {
      // call register api
      setTimeoutInstance = setTimeout(() => {
        const payload = {
          team: userInfo.name || userInfo?.email || wallet.address,
          university: '',
          email: userInfo?.email,
        };
        registerCodeBattle(payload).then(() => {
          setIsRegistered(true);
        });

        console.log('call register api');
      }, 5000);
    }

    return () => {
      if (setTimeoutInstance) {
        clearTimeout(setTimeoutInstance);
      }
    };
  }, [isRegistered, wallet, userInfo]);

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

  const handleOpenRegisterModal = () => {
    if (!loggedIn) {
      login();
    }

    // dispatch(
    //   openModal({
    //     id: REGISTER_MODAL,
    //     className: s.modalContent,
    //     modalProps: {
    //       size: 'xl',
    //     },
    //     theme: 'light',
    //     render: () => (
    //       <RegisterModal
    //         userInfo={userInfo}
    //         setIsRegistered={setIsRegistered}
    //       />
    //     ),
    //   }),
    // );
  };

  const checkUserRegistered = async () => {
    try {
      const res = await checkRegistered();
      if (res) {
        setIsRegistered(res?.register || false);
        setCurrentUserContest(res);
      }
    } catch (error) {
    } finally {
      setIsChecking(false);
    }
  };

  const handleClickPractice = () => {
    console.log('handleClickPractice');
    // scroll to #practice-section
    const practiceSection = document.getElementById('practice-section');
    if (practiceSection) {
      practiceSection.scrollIntoView({ behavior: 'smooth' });
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
            {/* <div className={s.reward}>
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
            </div> */}
            <div>
              <h2 className={s.title}>
                <p>Proof of Code</p>
              </h2>
              <p className={s.desc}>
                Welcome to Proof of Code, where your crypto coding skills are
                put to the ultimate test. Solve challenging crypto problems, and
                engage in competitions that push the limits of what's possible
                in the crypto world.
              </p>
              <p className={s.desc}>
                Rise through the ranks to earn an on-chain rating that showcases
                your crypto coding prowess and potential. Achieve victory, gain
                recognition, and unlock monetary rewards as you compete for
                glory.
              </p>
            </div>
            <Flex
              alignItems={'center'}
              justifyContent={{ base: 'center', sm: 'flex-start' }}
              gap="16px"
              flexWrap={'wrap'}
              mb="24px"
            >
              {/* <ButtonConnected title="Let's practice" className={s.reward_btn}> */}
              <button
                className={cn(s.reward_btn)}
                onClick={
                  loggedIn ? handleClickPractice : handleOpenRegisterModal
                }
                // onClick={handleClickPractice}
                // disabled={isRegistered}
              >
                Let's practice
              </button>
              {/* </ButtonConnected> */}

              <div className={s.connect_btn}>
                <a
                  href={LINKS.POC_TELEGRAM_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.tele_link}
                >
                  Join the PoC community
                </a>
              </div>

              {/* <div className={s.meta_info}>
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
              </div> */}
            </Flex>
            <CompetitionTimer />
          </div>
          {/* </Fade> */}
          <div className={s.right}>
            <Box position={'relative'} aspectRatio={'773 / 685'}>
              <Image
                layout="fill"
                alt="hero thumbnail"
                src={`${CDN_URL}/images/candidate-with-result.png`}
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
      <Box zIndex={1} pos={'relative'} id={'practice-section'}>
        <LeaderboardSection currentUserContest={currentUserContest} />
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
