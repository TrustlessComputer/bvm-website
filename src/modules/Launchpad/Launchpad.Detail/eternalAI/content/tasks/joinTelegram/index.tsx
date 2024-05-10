import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import cx from 'clsx';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const JoinTelegram = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const handleFollow = (url: string) => {
    if (!url) return;
    window.open(url, '_blank');
    setTimeout(() => {
      launchpadApi.requestClaimFollow(currentLaunchpad?.id as number);
    }, 30000);
  };

  return (
    <Flex
      className={cs(s.container, {
        [`${s.container_disable}`]: !props.isVerifyTW,
      })}
      alignItems={'center !important'}
    >
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex
          justifyContent={'space-between'}
          gap={'12px'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Flex direction="column">
            <Text className={s.title} style={{ marginBottom: 0 }}>
              Join Eternal AI community on Telegram
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Button
              className={cx(s.btnShare, s.btnLink)}
              onClick={() => handleFollow('https://t.me/+d8yMI3IjmCU1ODhh')}
              isDisabled={isDisabled}
            >
              TELEGRAM
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default JoinTelegram;
