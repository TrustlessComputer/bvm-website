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
  position: number;
}

const FollowTwitter = (props: IReferFriend) => {
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
              {props.position === 1
                ? 'Follow Eternal AI on X'
                : "Eternal AI's Founder"}
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            {props?.position === 1 && (
              <Button
                className={cx(s.btnShare, s.btnLink)}
                onClick={() =>
                  handleFollow('https://twitter.com/CryptoEternalAI')
                }
                isDisabled={isDisabled}
              >
                Follow @CryptoEternalAI
              </Button>
            )}
            {props?.position === 2 && (
              <Button
                className={cx(s.btnShare, s.btnLink)}
                onClick={() => handleFollow('https://twitter.com/AIonBitcoin')}
                isDisabled={isDisabled}
              >
                Follow @AIonBitcoin
              </Button>
            )}
          </Flex>
        </Flex>
        {/*<Flex gap={"24px"}>
          {
            props?.index === 2 && (
              <Button className={cx(s.btnShare, s.btnLink)} onClick={() => handleFollow("https://twitter.com/CryptoEternalAI")} isDisabled={isDisabled}>
                Follow @CryptoEternalAI
              </Button>
            )
          }
          {
            props?.index === 3 && (
              <Button className={cx(s.btnShare, s.btnLink)} onClick={() => handleFollow("https://twitter.com/AIonBitcoin")} isDisabled={isDisabled}>
                Follow @AIonBitcoin
              </Button>
            )
          }
        </Flex>*/}
      </Flex>
    </Flex>
  );
};

export default FollowTwitter;
