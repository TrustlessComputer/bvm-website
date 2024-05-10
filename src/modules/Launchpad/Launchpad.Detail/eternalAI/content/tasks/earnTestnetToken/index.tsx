import { Button, Center, Flex, Link, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import s from '../item.module.scss';
import useFormatHoldingEAI from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/helpers/holdingEAIMessage/useFormatHoldingEAI';
import { ethers } from 'ethers';
import { formatCurrency } from '@/utils/format';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { commonSelector } from '@/stores/states/common/selector';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { userSelector } from '@/stores/states/user/selector';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { requestReload } from '@/stores/states/common/reducer';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const EarnTestnetToken = (props: IReferFriend) => {
  const user = useSelector(userSelector);
  const needReload = useSelector(commonSelector).needReload;
  const { currentLaunchpad } = useLaunchpadContext();
  const holdingEAI = useFormatHoldingEAI();
  const isNeedClaimBTCPoint = holdingEAI.isUnclaimed;
  const dispatch = useDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const params = useParams();
  const [amountEAI, setAmountEAI] = useState('0');

  useEffect(() => {
    onLoadBalance();
  }, [user?.twitter_username, needReload]);

  const onLoadBalance = async () => {
    try {
      if (!user?.twitter_username) return;
      const [balance] = await Promise.all([
        launchpadApi.getLaunchpadEAIAirdrop({
          twitter_username: user?.twitter_username as string,
        }),
      ]);

      setAmountEAI(balance);
    } catch (e) {
      console.log('onLoadBalance', e);
    } finally {
    }
  };

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const shareTw = () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Have fun playing around with AI on @CryptoEternalAI!\n\nAI on Bitcoin is gonna be massive!\n\nJoin the $EAI IDO allowlist now!\n${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  const onClickShare = async () => {
    if (isNeedClaimBTCPoint) {
      shareTw();
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(holdingEAI.status);
        dispatch(requestReload());
      }, 10000);
    } else {
      window.open('https://eternalai.org/build', '_blank');
    }
  };

  return (
    <Flex
      className={cs(s.container, {
        [`${s.container_disable}`]: !props.isVerifyTW,
      })}
    >
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={'space-between'} gap={'12px'}>
          <Flex direction="column">
            <Text className={s.title}>Earn testnet tokens on Eternal AI</Text>
            <Text className={s.desc}>
              The more $EAI testnet tokens you have, the more points you'll
              receive.
              <br />
              Build and utilize AI models on the platform to earn more $EAI
              testnet tokens.&nbsp;
              <Link
                href={'https://eternalai.org/'}
                target={'_blank'}
                cursor={'pointer'}
                textDecoration={'underline'}
              >
                https://eternalai.org/
              </Link>
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+1,000 pts</Text>
            <Text className={s.desc}>per 1,000 $EAI</Text>
          </Flex>
        </Flex>
        {user && (
          <Text>
            {`You're signing in with the ${user?.twitter_name} account - `}
            Balance:{' '}
            <span style={{ color: '#6633CE' }}>
              {ethers.utils.formatEther(amountEAI).toString()}
            </span>{' '}
            EAI
          </Text>
        )}
        <Button
          className={s.btnShare}
          loadingText="Submitting..."
          onClick={onClickShare}
          isDisabled={isDisabled}
        >
          {isNeedClaimBTCPoint
            ? `Tweet to claim ${formatCurrency(
                holdingEAI.amount.unClaimedPoint,
                0,
                0,
              )} pts`
            : 'Build your AI now'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default EarnTestnetToken;
