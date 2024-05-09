import {Button, Center, Flex, Text} from '@chakra-ui/react';
import React, {useMemo} from 'react';
import s from '../item.module.scss';
import {useLaunchpadContext} from "@/providers/LaunchpadProvider/hooks/useLaunchpadContext";
import useFormatAllowBTC from "@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/AllowBTCMessage/useFormatAllowBTC";
import {formatCurrency} from "@/utils/format";
import useToggle from "@/hooks/useToggle";
import ConnectModal from "@/components/ConnectModal";
import {BigNumber} from "bignumber.js";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {requestReload} from "@/store/states/common/reducer";
import CLaunchpadAPI from "@/services/api/launchpad";
import {userSelector} from "@/store/states/user/selector";
import {getError} from "@/utils/error2";
import toast from "react-hot-toast";
import cx from 'clsx';
import AllowBTCMessage from "@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/AllowBTCMessage";

const shareTw = (params: {
  fee: string | number;
  point: string | number;
  refCode: string;
}) => {
  const amount = new BigNumber(params.fee).gte(0.0001)
    ? new BigNumber(params.fee).toFixed(4, BigNumber.ROUND_FLOOR)
    : new BigNumber(params.fee).toFixed();
  const content = `I've spent ${amount} BTC on gas fees and earned ${formatCurrency(params.point, 0, 0)} points for @Naka_Chain launchpad at nakachain.xyz/launchpad.\n\nTheir mainnet launched in Jan 2024 and has already hit 2M transactions!\n\nIf you missed out on Merlin, then don’t fade NakaChain!`;

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  }, 200);
};

const BitcoinOG = (props: {index: number}) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowBTC = useFormatAllowBTC();
  const dispatch = useAppDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const user = useAppSelector(userSelector);

  const btcOGMessage = Number(allowBTC.amount.fee) > 0 ?
    <p>You're a true Bitcoin OG! You've spent {<span>{formatCurrency(allowBTC.amount.fee, 0, 6, 'BTC')}</span>} BTC on 500 lastest transactions, earning you a total of {<span>{formatCurrency(allowBTC.amount.point, 0)}</span>} points.</p>:
    'The more sats you spend, the more points you\'ll earn. Connect your Unisat or Xverse wallet to prove your OG status.';
  const isNeedClaimBTCPoint = allowBTC.isUnclaimed;
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickShare = async () => {
    if(isNeedClaimBTCPoint) {
      shareTw({ fee: allowBTC.amount.fee, point: allowBTC.amount.point, refCode: user?.referral_code || '' });
      await launchpadApi.requestClaimBTCPoint(allowBTC.status)
      dispatch(requestReload())
    } else {
      onToggleConnect();
    }
  }

  const handleConnect = async (res: any) => {
    if(res) {
      try {
        const {
          address,
          pubKey,
          message,
          signature,
        } = res;
        await launchpadApi.verifyBTCSignature({
          address,
          pubKey,
          message,
          signature,
          launchpadId: currentLaunchpad?.id as number,
          network: 'bitcoin',
          type: 'gas-fee'
        });
      } catch (error) {
        const { message } = getError(error);
        toast.error(message);
      } finally {
        onToggleConnect();
      }
    } else {
      onToggleConnect();
    }

  }

  return (
    <Flex className={s.container}>
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={"space-between"} gap={"12px"}>
          <Flex direction="column">
            <Text className={s.title}>Are you a Bitcoin OG?</Text>
            <Text className={s.desc}>{btcOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={"110px"} alignItems={"flex-end"}>
            <Text className={s.title}>+10 pts</Text>
            <Text className={s.desc} textAlign={"right"}>per 1000 sats</Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"12px"}>
          <Button className={s.btnShare} loadingText="Submitting..." onClick={onClickShare} isDisabled={isDisabled}>
            {isNeedClaimBTCPoint ? `Tweet to claim ${formatCurrency(allowBTC.amount.unClaimedPoint, 0, 0)} pts` : 'How much have I spent on sats?'}
          </Button>
          {
            isNeedClaimBTCPoint && (
              <Button className={cx(s.btnShare, s.btnSecondary)} loadingText="Submitting..." onClick={onToggleConnect} isDisabled={isDisabled}>
                Verify another wallet
              </Button>
            )
          }
          <AllowBTCMessage />
        </Flex>
      </Flex>
      <ConnectModal isShow={isShowConnect} onHide={handleConnect}/>
    </Flex>
  );
};

export default BitcoinOG;
