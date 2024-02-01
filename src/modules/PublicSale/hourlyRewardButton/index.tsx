import { Center, Flex, Text, useDisclosure } from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { getPublicSaleDailyReward, IPublicSaleDailyReward } from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useDispatch } from 'react-redux';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { PUBLIC_SALE_END, PUBLIC_SALE_START } from '@/modules/Whitelist';
import { commonSelector } from '@/stores/states/common/selector';
import useWindowSize from '@/hooks/useWindowSize';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';

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
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    !isLoading && (
      <>
        <Flex className={cx(s.container, className)}>
          <Flex direction={"column"} justifyContent={"space-between"} flex={1}>
            <Center className={s.hourglassWrapper}>
              <div className="hourglass">
                <div className="top"></div>
                <div className="bottom"></div>
              </div>
            </Center>

            <Flex gap={'6px'} className={s.timeWrapper}>
              <Text className={s.title}>End in</Text>
              <Countdown
                className={s.time}
                expiredTime={dayjs
                  .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
                  .toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
                type={"column"}
                showColon={true}
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  );
};

export default HourlyRewardButton;
