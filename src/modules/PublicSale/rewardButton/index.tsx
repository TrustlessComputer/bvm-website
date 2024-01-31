import {
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import {
  getPublicSaleDailyReward,
  getPublicSaleSummary,
  IPublicSaleDailyReward,
  requestRewardDailyShareCode,
} from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';
import { formatCurrency } from '@/utils/format';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { getLink } from '@/utils/helpers';
import VerifyRewardDailyModal from '@/modules/PublicSale/rewardButton/VerifyRewardDailyModal';
import { toast } from 'react-hot-toast';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';

const REWARD_DAILY = JSON.parse("{\"2024-01-30\":100000,\"2024-01-31\":50000,\"2024-02-01\":50000,\"2024-02-02\":50000,\"2024-02-03\":50000,\"2024-02-04\":50000,\"2024-02-05\":50000}");

const RaffleButton = ({ className }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEnd, setIsEnd] = React.useState(false);
  const user = useAppSelector(userSelector);
  const [dailyReward
    , setDailyReward] = useState<IPublicSaleDailyReward | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [raffleCode, setRaffleCode] = useState();
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const refInterval = useRef<any>(undefined);
  const dispatch = useDispatch();
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const [showManualCheck, setShowManualCheck] = useState(false);

  const currentDay = React.useMemo(() => {
    const diffDay = new BigNumber(
      dayjs.utc(PUBLIC_SALE_START).diff(dayjs.utc(), 'days'),
    )
      .absoluteValue()
      .toNumber();
    return {
      // step: DAYS.length > diffDay ? DAYS[diffDay] : DAYS[DAYS.length - 1],
      diffDay,
    };
  }, []);

  const REWARDS = useMemo(() => {
    return Object.values(REWARD_DAILY);
  }, [REWARD_DAILY]);

  const currentDayReward = useMemo(() => {
    return REWARDS[currentDay.diffDay];
  }, [currentDay, REWARDS])

  console.log('dailyReward', dailyReward);
  console.log('user', user);
  console.log('currentDay', currentDay);
  console.log('REWARDS', REWARDS);
  console.log('currentDayReward', currentDayReward);
  console.log('=====')

  useEffect(() => {
    getProgramInfo();

    if(refInterval?.current) {
      clearInterval(refInterval.current);
    }

    refInterval.current = setInterval(() => {
      getProgramInfo();
    }, 300000);

    return () => {
      if(refInterval?.current) {
        clearInterval(refInterval.current);
      }
    }
  }, []);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleDailyReward();
      setDailyReward(res);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const onShareNow = async () => {
    const shareUrl = !user?.referral_code
      ? 'bvm.network/public-sale'
      : `bvm.network/public-sale?refer=${user?.referral_code}`;

    const saleSummary = await getPublicSaleSummary();

    const content = `Welcome to the future of Bitcoin!\n\n$BVM is the 1st modular blockchain meta-protocol that allows launching Bitcoin L2 in a few clicks\n\nJoin the ${formatCurrency(
      saleSummary.total_user || '0',
      0,
      0,
      'BTC',
      false,
    )} early contributors who've committed $${formatCurrency(
      saleSummary.total_usdt_value_not_boost || '0',
      0,
      0,
      'BTC',
      true,
    )} to building Bitcoin's future with @BVMnetwork\n\n`;
    return window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

  const rewardValue = useMemo(() => {
    if(dailyReward) {
      return Number(dailyReward?.total) - Number(dailyReward?.claimed);
    }
    return 0;
  }, [dailyReward]);

  const titleReward = useMemo(() => {
    if (rewardValue > 0) {
      return `Congrats! You Have Earned`;
    } else if (Number(dailyReward?.pending) > 0) {
      return `Your Estimated Reward for Day ${currentDay.diffDay + 1}`;
    }
    return 'Today’s $BVM Reward';
  }, [rewardValue, dailyReward]);

  const generateLinkTweet = async () => {
    let code = '';
    const res: any = await requestRewardDailyShareCode();
    setAuthenCode(res);
    code = `\n\n#${res?.public_code}`;

    const shareUrl = !user?.referral_code ? 'bvm.network/public-sale' : getLink(user?.referral_code || '');

    const saleSummary = await getPublicSaleSummary();
    const content = `Proud to be one of the early backers for $BVM - the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s!\n\nJoin me and the ${formatCurrency(
      saleSummary.total_user || '0',
      0,
      0,
      'BTC',
      false,
    )} early contributors who've committed ${formatCurrency(
      saleSummary.total_usdt_value || '0',
      0,
      0,
      'BTC',
      false,
    )} to building Bitcoin's future with @BVMnetwork${code}`;

    return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;
  };

  const handleShareTw = async () => {
    const content = await generateLinkTweet();
    setTimeout(() => {
      window.open(content, '_blank');
    }, 300);

    setTimeout(() => {
      setShowManualCheck(true);
    }, 1000);
  };

  const onVerifyTwSuccess = (result: any) => {
    if (result) {
      // clearInterval(timer.current);
      // const twitterToken = AuthenStorage.getAuthenKey();
      // if (!twitterToken || twitterToken !== result?.token) {
      //   AuthenStorage.setAuthenKey(result?.token);
      //   setBearerToken(result?.token);
      // }
      // setSubmitting(false);
      toast.success("Successfully.")
      setShowManualCheck(false);
      dispatch(requestReload());
      onClose();
    }
  };

  return (
    !isLoading && (
      <>
        <Popover onClose={onClose} isOpen={isOpen}>
          <PopoverTrigger>
            <Flex className={cx(s.container, className)}>
              <Flex onMouseOver={onOpen} gap={'8px'} alignItems={'center'}>
                <Center
                  className={s.raffleBgIcon}
                >
                  <img src={'/public-sale/rwbn_2.png'} alt="raffleBtnBg" />
                </Center>
                <Flex direction={"column"} alignItems={"flex-start"} flex={1}>
                  <Text
                    className={s.text_text}
                    fontSize={11}
                    lineHeight={'12px'}
                    fontWeight={400}
                  >
                    {titleReward}
                  </Text>

                  <Flex gap={'6px'} className={s.timeWrapper}>
                    <Text className={cx(s.time, rewardValue > 0 ? s.claimable : '')}>{formatCurrency(rewardValue || dailyReward?.pending || currentDayReward, MIN_DECIMAL, MAX_DECIMAL, 'BTC', false)} BVM</Text>
                  </Flex>
                  <Flex gap={4} w={"100%"}>
                    <>
                      <Flex
                        className={cx(s.learnMoreWrapper)}
                        gap={2}
                        onClick={rewardValue > 0 ? handleShareTw : onShareNow}
                        cursor="pointer"
                        bg={rewardValue > 0 ? "#FA4E0E" : '#FFFFFF'}
                      >
                        {
                          rewardValue > 0 ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" fill="white"/>
                              <g clip-path="url(#clip0_30630_9258)">
                                <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="black"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_30630_9258">
                                  <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" fill="black"/>
                              <g clip-path="url(#clip0_30640_11775)">
                                <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_30640_11775">
                                  <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                                </clipPath>
                              </defs>
                            </svg>
                          )
                        }
                        <Text lineHeight={'100%'} fontSize={'12px'} color={rewardValue > 0 ? "#FFFFFF" : "#000000"}>
                          {rewardValue > 0 ? 'Share to claim' : 'Share'}
                        </Text>
                      </Flex>
                    </>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </PopoverTrigger>

          <PopoverContent className={cx(s.menuContent)}>
            <PopoverCloseButton />
            <PopoverArrow />
            <PopoverBody mt={4}>
              <Flex gap={6} direction={['column', 'row']} maxW={"350px"}>
                <Flex direction={'column'} gap={4}>
                  <Text className={s.title}>Contribute Early and Earn Extra BVM Tokens</Text>
                  <img className={s.imgDemo} src={'/public-sale/dailyReward.png'} alt={'dailyReward'} />
                  <Flex direction={"column"} gap={"12px"}
                        className={s.desc}
                  >
                    <Text>We are offering 200,000 $BVM in daily rewards to all BVM public sale participants!</Text>
                    <Text>Within 7 days of the sale, the daily reward pool will diminish by half each day, similar to Bitcoin Halving Block Reward</Text>
                    <Text>This means the earlier you join, the more extra $BVM reward you are eligible to claim</Text>
                    <Text>Furthermore, the rewards will be distributed proportionally based on your contribution amount</Text>
                  </Flex>
                </Flex>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <VerifyRewardDailyModal
          isShow={showManualCheck}
          onHide={() => {
            setShowManualCheck(false);
          }}
          secretCode={authenCode?.secret_code}
          onSuccess={onVerifyTwSuccess}
        />
      </>

    )
  );
};

export default RaffleButton;
