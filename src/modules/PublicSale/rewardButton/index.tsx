import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import {
  IPublicSalePrograme,
  getPublicSaleProgram,
} from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import {
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
import cx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { isMobile } from 'react-device-detect';

const RewardButton = ({ className }: any) => {
  const [isEnd, setIsEnd] = React.useState(false);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getProgramInfo();
  }, []);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleProgram();
      setProgrameInfo(res);
      if (!isMobile) {
        onOpen();
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <Popover onClose={onClose} isOpen={isOpen} defaultIsOpen={true}>
      <PopoverTrigger>
        <Flex
          onMouseOut={onClose}
          onMouseOver={onOpen}
          className={cx(s.container, className)}
        >
          <span className={s.icon}></span>
          <div className={s.text}>
            <Text
              className={s.text_text}
              fontSize={11}
              lineHeight={'12px'}
              fontWeight={400}
            >
              Daily Rewards
            </Text>
            <Flex gap={'6px'} className={s.timeWrapper}>
              <Countdown
                className={s.time}
                expiredTime={dayjs
                  .utc(programeInfo?.end_date, 'YYYY-MM-DD HH:mm:ss')
                  .toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
              />
            </Flex>
          </div>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className={cx(s.menuContent)}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Flex gap={6} direction={['column', 'row']}>
            <Flex direction={'column'}>
              <Text className={s.title}>{'Top Leaderboard Reward'}</Text>
              <Text className={s.desc}>
                {
                  'Make contributions to climb to the top of the leaderboard and earn exciting rewards every day. Stay tuned for daily updates.'
                }
              </Text>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RewardButton;
