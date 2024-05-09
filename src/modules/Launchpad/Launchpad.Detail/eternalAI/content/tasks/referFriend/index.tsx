import { useAppSelector } from '@/store/hooks';
import { userSelector } from '@/store/states/user/selector';
import {Button, Center, Flex, Text} from '@chakra-ui/react';
import cs from 'classnames';
import React, {useMemo} from 'react';
import s from '../item.module.scss';
import copy from 'copy-to-clipboard';
import { showSuccess } from '@/components/toast';
import { shareReferralURL } from '@/utils/helpers';
import {useLaunchpadContext} from "@/providers/LaunchpadProvider/hooks/useLaunchpadContext";

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const ReferFriend = (props: IReferFriend) => {
  const user = useAppSelector(userSelector);
  const { currentLaunchpad } = useLaunchpadContext();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);
  
  const onClickRefer = async () => {
    if (!user?.referral_code) return;
    copy(shareReferralURL(user?.referral_code || ''));
    showSuccess({ message: 'Copied'})
  };

  return (
    <Flex className={cs(s.container, { [`${s.container_disable}`]: !props.isVerifyTW })}>
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={"space-between"} gap={"12px"}>
          <Flex direction="column">
            <Text className={s.title}>Refer a fren to NakaChain</Text>
            <Text className={s.desc}>Spread the love to your friends, team, and communities.</Text>
          </Flex>
          <Flex direction="column" minW={"110px"} alignItems={"flex-end"}>
            <Text className={s.title}>+1,000 pts</Text>
            <Text className={s.desc}>per friend</Text>
          </Flex>
        </Flex>
        <Button className={s.btnShare} onClick={onClickRefer} isDisabled={isDisabled}>
          Copy your referral link
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReferFriend;
