import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo } from 'react';
import s from '../item.module.scss';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { useParams } from 'next/navigation';
import { formatCurrency } from '@/utils/format';
import { useSelector } from 'react-redux';
import { userSelector } from '@/stores/states/user/selector';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
  myDataLeaderBoard?: ILeaderBoardPoint;
}

const ReferFriendIDO = (props: IReferFriend) => {
  const user = useSelector(userSelector);
  const { currentLaunchpad } = useLaunchpadContext();
  const params = useParams();
  const { blockScout } = useSelector(launchpadSelector);

  const hasJoin = useMemo(() => {
    return (props?.myDataLeaderBoard?.total_ticket as number) > 0;
  }, [props?.myDataLeaderBoard]);

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'ido' || !hasJoin;
  }, [currentLaunchpad?.status, hasJoin]);

  // const onClickRefer = async () => {
  //   if (!user?.referral_code) return;
  //   copy(shareReferralURL(user?.referral_code || ''));
  //   showSuccess({ message: 'Copied'})
  // };

  const shareTw = () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Just discovered @naka_chain - the first Bitcoin L2 for DeFi! Impressive growth for a new Bitcoin L2:\n\n🔥$${formatCurrency(
      blockScout.tvl,
      0,
      0,
      'BTC',
      false,
    )}+ TVL
🔥${formatCurrency(
      blockScout.address,
      0,
      0,
      'BTC',
      false,
      1000,
    )}+ active wallets
🔥${formatCurrency(
      blockScout.total_transactions,
      0,
      0,
      'BTC',
      false,
    )}+ transactions\n\nYou can buy $NAKA now at very low valuation ($1M FDV) on $NAKA launchpad IDO now:\n👉${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  return (
    <Flex
      className={cs(s.container, {
        [`${s.container_disable}`]: !props.isVerifyTW,
      })}
      bg={'#FFFFFF !important'}
      border={`${
        hasJoin ? '2px solid #A87EFF' : '1px solid #ECECEC'
      } !important`}
      borderRadius={'16px !important'}
      p={'32px 24px !important'}
    >
      <Flex className={s.shareTw}>
        <Flex justifyContent={'space-between'} gap={'12px'}>
          <Flex direction="column">
            <Text
              className={s.title}
              fontSize={'32px !important'}
              textAlign={'center'}
              marginBottom={'16px !important'}
            >
              Increase your chance to win
            </Text>
            <Text
              className={s.desc}
              fontSize={'16px !important'}
              textAlign={'center'}
              style={{ fontWeight: 400 }}
            >
              Invite friends to earn more tickets. You’ll get 1 additional
              ticket for every ticket purchased by your friends. There is no
              limit.
            </Text>
          </Flex>
          {/*<Flex direction="column" minW={"110px"} alignItems={"flex-end"}>
            <Text className={s.title}>+1 ticket</Text>
            <Text className={s.desc} style={{textAlign: 'right'}}>per new ticket purchased</Text>
          </Flex>*/}
        </Flex>
        <Button
          className={s.btnShare}
          onClick={shareTw}
          isDisabled={isDisabled}
          fontSize={'18px !important'}
          p={'8px 40px'}
          h={'54px'}
        >
          {hasJoin
            ? 'Invite your friends'
            : 'Buy a ticket to join launchpad first'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReferFriendIDO;
