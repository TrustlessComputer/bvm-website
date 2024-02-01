import {
  Box,
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
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import {
  getPublicSaleDailyReward,
  getPublicSaleSummary,
  IPublicSaleDailyReward,
  requestRewardDailyShareCode,
} from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { formatCurrency } from '@/utils/format';
import { MIN_DECIMAL } from '@/constants/constants';
import SvgInset from '@/components/SvgInset';
import VerifyRewardDailyModal from '@/modules/PublicSale/rewardButton/VerifyRewardDailyModal';
import { userSelector } from '@/stores/states/user/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useDispatch } from 'react-redux';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import useWindowSize from '@/hooks/useWindowSize';
import BigNumber from 'bignumber.js';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { requestReload, setPublicSaleDailyReward } from '@/stores/states/common/reducer';
import { getLink } from '@/utils/helpers';
import { toast } from 'react-hot-toast';
import AuthForBuy from '@/modules/PublicSale/AuthForBuy';

const HourlyRewardButton = ({ className }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEnd, setIsEnd] = React.useState(false);
  const user = useAppSelector(userSelector);
  const [dailyReward
    , setDailyReward] = useState<IPublicSaleDailyReward | null>();
  const [isLoading, setIsLoading] = useState(true);
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const refInterval = useRef<any>(undefined);
  const dispatch = useDispatch();
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const [showManualCheck, setShowManualCheck] = useState(false);
  const needReload = useAppSelector(commonSelector).needReload;
  const configs = useAppSelector(commonSelector).configs;
  const { mobileScreen } = useWindowSize();

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
    if(configs) {
      if(configs['naka']?.bvm_halvings) {
        const res = JSON.parse(configs['naka']?.bvm_halvings);
        return Object.values(res);
      }
    }
    return [];
  }, [configs]);

  const currentDayReward = useMemo(() => {
    return REWARDS[currentDay.diffDay];
  }, [currentDay, REWARDS])

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
  }, [needReload]);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleDailyReward();
      setDailyReward(res);
      dispatch(setPublicSaleDailyReward(res));
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

    setTimeout(() => {
      return window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    }, 300);
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
      return `Your Estimated Reward`;
    } else if (!dailyReward) {
      return `Contribute early & earn extra $BVM`;
    }
    return `Today's Total Reward`;
  }, [rewardValue, dailyReward]);

  const isBuy = useMemo(() => {
    return !!dailyReward;
  }, [dailyReward]);

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

  const hourlyEndTime = useMemo(() => {
    let res = dayjs.utc().set('minute', 30);
    res = res.set('second', 0);
    if (dayjs().utc().isAfter(res)) {
      res = res.set('hour', res.get('hour') + 1);
    }
    if(isEnd) {
      setIsEnd(false);
    }

    return res.toString();
  }, [isEnd]);

  return (
    !isLoading && (
      <>
        <Popover onClose={onClose} isOpen={isOpen}>
          <PopoverTrigger>
            <Flex className={cx(s.container, className)}>
              <Flex
                onMouseOver={mobileScreen ? undefined : onOpen}
                onClick={mobileScreen ? onOpen : undefined}
                gap={'16px'}
                direction={"column"}
              >
                <Flex direction={"column"} className={s.topWrapper} justifyContent={"space-between"}>
                  <Center className={s.hourglassWrapper}>
                    <div className="hourglass">
                      <div className="top"></div>
                      <div className="bottom"></div>
                    </div>
                  </Center>
                  <Flex gap={'6px'} className={s.timeWrapper}>
                    <Text className={s.title}>Ends in</Text>
                    <Countdown
                      className={s.time}
                      expiredTime={dayjs
                        .utc(hourlyEndTime, 'YYYY-MM-DD HH:mm:ss')
                        .toString()}
                      hideIcon={true}
                      onRefreshEnd={() => setIsEnd(true)}
                      type={"column"}
                      showColon={true}
                    />
                  </Flex>
                </Flex>
                <Flex className={s.bottomWrapper} direction={"column"}>
                  <Text
                    className={cx(s.text_text, !isBuy && s.notBuy)}
                  >
                    {titleReward}
                  </Text>

                  {
                    isBuy && (
                      <Flex gap={'6px'} className={s.timeWrapper}>
                        <Text className={cx(s.rewardValue, rewardValue > 0 ? s.claimable : '')}>{formatCurrency(rewardValue || dailyReward?.pending || currentDayReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', false)} BVM</Text>
                      </Flex>
                    )
                  }
                  <Flex gap={4} w={"100%"}>
                    <>
                    {
                      isBuy ? (
                        <Flex
                          className={cx(s.learnMoreWrapper)}
                          gap={2}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            rewardValue > 0 ? handleShareTw() : onShareNow()
                          }}
                          cursor="pointer"
                          bg={rewardValue > 0 ? "#FA4E0E" : '#FFFFFF'}
                        >
                          {
                            rewardValue > 0 ? (
                              <SvgInset svgUrl={`public-sale/tw_white.svg`} />
                            ) : (
                              <SvgInset svgUrl={`public-sale/tw_black.svg`} />
                            )
                          }
                          <Text lineHeight={'100%'} fontSize={'12px'} color={rewardValue > 0 ? "#FFFFFF" : "#000000"}>
                            {rewardValue > 0 ? 'Share to claim' : 'Share'}
                          </Text>
                        </Flex>
                      ) : (
                        <Box className={s.buyWrapper}>
                          <AuthForBuy hideBuyAndStake={true}/>
                        </Box>
                      )
                    }
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
                  <Text className={s.title}>Earn Extra $BVM Daily for Your Contribution</Text>
                  <img className={s.imgDemo} src={`/public-sale/dailyReward_${currentDay?.diffDay}.png`} alt={'dailyReward'} />
                  <Flex direction={"column"} gap={"12px"}
                        className={s.desc}
                  >
                    <Text>We are offering <span style={{color: '#FA4E0E'}}>200,000 $BVM</span> in daily rewards to all BVM public sale participants!</Text>
                    <Text>Within 7 days of the sale, the daily reward pool will diminish by half each day, similar to Bitcoin Halving Block Reward.</Text>
                    <Text>This means the earlier you join, the more extra $BVM reward you are eligible to claim.</Text>
                    <Text>Furthermore, the rewards will be distributed proportionally EVERY HOUR based on your contribution amount.</Text>
                    <Text>Be an early $BVM backer!</Text>
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

export default HourlyRewardButton;
