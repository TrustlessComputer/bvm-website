import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import sItem from '../item.module.scss';
import { EARN_URL } from '@/constants/route-path';
import useFormatAllowStaking from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/stakingBVMMessage/useFormatAllowStaking';
import { getUrlToSwap, shareURLWithReferralCode } from '@/utils/helpers';
import { useParams, useRouter } from 'next/navigation';
import s from './styles.module.scss';
import NumberScale from '@/components/NumberScale';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from '@/components/Countdown';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import BigNumer from 'bignumber.js';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { last, orderBy, uniqBy } from 'lodash';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import useERC20Balance from '@/modules/Launchpad/components/ERC20Balance/useERC20Balance';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { commonSelector } from '@/stores/states/common/selector';
import { requestReload } from '@/stores/states/common/reducer';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import TOKEN_ADDRESS from '@/constants/token';
import ButtonConnected from '@/components/ButtonConnected';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const StakingBVM = (props: IReferFriend) => {
  const router = useRouter();
  const { currentLaunchpad } = useLaunchpadContext();
  const allowStaking = useFormatAllowStaking();
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const params = useParams();
  const { oldCountCurrentLeaderboard, countCurrentLeaderboard } =
    useSelector(launchpadSelector);
  const stakeUser = useSelector(stakeUserSelector);
  const { balance } = useERC20Balance({
    token: {
      address: BVM_ADDRESS.BVM.bvm,
    },
  });

  const id = params?.id;
  const needReload = useSelector(commonSelector).needReload;
  const [dataTop2, setDataTop2] = useState<ILeaderBoardPoint[]>([]);
  const [dataTop8, setDataTop8] = useState<ILeaderBoardPoint[]>([]);
  const wallet = useAuthenticatedWallet();

  const isAuthenticated = wallet?.address;

  useEffect(() => {
    if (allowStaking?.isClaimed && allowStaking?.isUnclaimed) {
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(allowStaking.status);
        dispatch(requestReload());
      }, 200);
    }
  }, [allowStaking?.isUnclaimed, allowStaking?.isClaimed]);

  useEffect(() => {
    if (id && countCurrentLeaderboard) {
      fetchDataTop2(countCurrentLeaderboard);
      fetchDataTop8(countCurrentLeaderboard);
    }
  }, [id, needReload, countCurrentLeaderboard]);

  const sortList = (arr: ILeaderBoardPoint[]) => {
    return uniqBy(
      orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
      (item: ILeaderBoardPoint) => item.twitter_id,
    );
  };

  const fetchDataTop2 = async (numJoined: number) => {
    const limit = new BigNumer(numJoined).multipliedBy(0.02).toFixed(0);
    try {
      const response = await launchpadApi.getPrelaunchLeaderBoards(Number(id), {
        page: 1,
        limit: Number(limit),
      });
      setDataTop2(sortList(response?.rows));
    } catch (error) {
      console.log('errorerror', error);
    } finally {
    }
  };

  const fetchDataTop8 = async (numJoined: number) => {
    const limit = new BigNumer(numJoined).multipliedBy(0.1).toFixed(0);
    try {
      const response = await launchpadApi.getPrelaunchLeaderBoards(Number(id), {
        page: 1,
        limit: Number(limit),
      });
      setDataTop8(sortList(response?.rows));
    } catch (error) {
      console.log('errorerror', error);
    } finally {
    }
  };

  const percentBonus = useMemo(() => {
    let result = 0;
    const lastTop2 = last(dataTop2);
    const lastTop8 = last(dataTop8);
    if (
      new BigNumer(
        formatAmountToClient(stakeUser?.principleBalance || '0'),
      ).gte(lastTop2?.staking_point as number)
    ) {
      result = 30;
    } else if (
      new BigNumer(
        formatAmountToClient(stakeUser?.principleBalance || '0'),
      ).gte(lastTop8?.staking_point as number)
    ) {
      result = 20;
    } else if (
      new BigNumer(
        formatAmountToClient(stakeUser?.principleBalance || '0'),
      ).gte(100)
    ) {
      result = 10;
    }

    return result;
  }, [stakeUser?.principleBalance, dataTop2, dataTop8]);

  const messageObj = useMemo(() => {
    let result = {
      message: '',
      action: '',
      isDisabled: false,
    };
    if (!isAuthenticated) {
      result = {
        message:
          'Not a BVM holder? Get some BVM and participate in the public sale.',
        action: 'Join the allowlist',
        isDisabled: false,
      };
    } else if (
      new BigNumer(stakeUser?.principleBalance || '0').isGreaterThan(0)
    ) {
      if (new BigNumer(stakeUser?.principleBalance || '0').gte(100)) {
        result = {
          message: `Since you staked <strong>${formatCurrency(
            formatAmountToClient(stakeUser?.principleBalance || '0'),
            0,
            2,
            'BTC',
            true,
          )} BVM</strong>, you will receive an additional <strong>${percentBonus}%</strong> boost EAI tokens.<br/><br/>${
            allowStaking?.isClaimed
              ? 'Stake more to rank up and earn more boost tokens.'
              : 'Tweet to join the allowlist and earn the boost tokens.'
          }`,
          action: allowStaking?.isClaimed
            ? 'Stake more & earn more boost tokens'
            : 'Tweet to join the allowlist',
          isDisabled: false,
        };
      } else {
        const requireAmount = new BigNumer(100)
          .minus(formatAmountToClient(stakeUser?.principleBalance || '0'))
          .toString();
        result = {
          message: `You have staked <strong>${formatCurrency(
            formatAmountToClient(stakeUser?.principleBalance || '0'),
            0,
            2,
            'BTC',
            true,
          )} BVM</strong>. Stake an additional <strong>${formatCurrency(
            requireAmount,
            0,
            2,
            'BTC',
            true,
          )} BVM</strong> to get a 10% boost. The more you stake, the more boost you’ll get.`,
          action: 'Tweet to join the allowlist',
          isDisabled: false,
        };
      }
    } else if (Number(balance) > 0.01) {
      result = {
        message: `You have <strong>${formatCurrency(
          balance,
          0,
          2,
          'BTC',
          true,
        )} BVM</strong>. Stake them to join the allowlist.`,
        action: 'Stake to join the allowlist',
        isDisabled: false,
      };
    } else {
      result = {
        message:
          'You have <strong>0 BVM</strong>. Buy & Stake BVM to join the allowlist.',
        action: 'Buy & Stake BVM to join the allowlist',
        isDisabled: false,
      };
    }

    return result;
  }, [
    stakeUser?.principleBalance,
    balance,
    percentBonus,
    allowStaking?.isClaimed,
    isAuthenticated,
  ]);

  const shareTw = () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `As a perk of staking $BVM, I just got the allowlist for the coming $EAI IDO by @CryptoEternalAI\n\nPowered by @BVMnetwork, Eternal AI is a Bitcoin L2 designed for AI, allowing anyone to train & deploy AI models on #Bitcoin\n\nJoin the $EAI IDO allowlist:\n${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickShare = () => {
    if (new BigNumer(stakeUser?.principleBalance || '0').isGreaterThan(0)) {
      if (allowStaking?.isClaimed) {
        router.push(EARN_URL);
      } else {
        shareTw();
        setTimeout(() => {
          launchpadApi.requestClaimBTCPoint(allowStaking.status);
          dispatch(requestReload());
        }, 20000);
      }
    } else if (Number(balance) > 0) {
      router.push(EARN_URL);
    } else {
      router.push(
        getUrlToSwap({
          from_token: TOKEN_ADDRESS.BTC_ADDRESS_L2,
          to_token: BVM_ADDRESS.BVM.bvm,
        }),
      );
    }

    // if (isNeedClaimBTCPoint) {
    //   shareTw();
    //   setTimeout(() => {
    //     launchpadApi.requestClaimBTCPoint(allowStaking.status);
    //     dispatch(requestReload());
    //   }, 2000);
    // } else {
    //   // router.push(EARN_URL);
    //   // if(Number(allowStaking.amount.staking_amount) > 0) {
    //   //   router.push(STAKING_URL);
    //   // } else {
    //   //   router.push(
    //   //     getUrlToSwap({
    //   //       to_token: BVM_TOKEN_ADDRESS,
    //   //       to_token_type: 'coin',
    //   //     }),
    //   //   );
    //   // }
    // }
  };

  const endDate = useMemo(() => {
    return currentLaunchpad?.status === 'prelaunch'
      ? currentLaunchpad?.pre_launch_end_date
      : currentLaunchpad?.status === 'ido'
      ? currentLaunchpad?.end_ido_date
      : currentLaunchpad?.end_date;
  }, [currentLaunchpad]);

  return (
    <Flex
      className={cs(
        sItem.container,
        {
          [`${sItem.container_disable}`]: !props.isVerifyTW,
        },
        s.wrapper,
      )}
    >
      <svg
        width="80"
        height="29"
        viewBox="0 0 80 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3192 2.43378C11.722 2.93245 10.4126 4.16795 9.66919 5.64902C9.10749 6.78387 9.07829 8.07689 9.10547 9.31533C6.72776 8.65656 3.98728 9.97016 2.95872 12.2044C2.68738 12.7937 2.71411 12.7964 2.61218 13.3849C2.47071 14.2018 2.48911 14.4684 2.54772 15.0217C2.58971 15.6733 2.76128 16.1479 2.76128 16.1479C3.31544 17.8595 4.80027 19.2476 6.55576 19.6573C7.41602 19.8687 8.31606 19.8176 9.1831 19.6717C8.89038 21.1066 9.20214 22.6419 9.9725 23.8813C11.1451 25.9235 13.6073 27.083 15.93 26.8167C17.6721 26.67 19.2765 25.6683 20.2708 24.2426C21.5536 22.4886 21.7128 20.0475 20.8421 18.0804C20.5546 17.4079 20.0784 16.8447 19.6013 16.3005C20.423 16.5483 21.1149 17.086 21.9067 17.4056C22.3457 17.0256 22.8168 16.6813 23.2373 16.2773C23.3463 16.5389 23.3498 16.8321 23.468 17.0888C23.763 17.5802 24.3235 17.9434 24.9113 17.8803C25.7947 17.8641 26.5877 17.0192 26.4472 16.1233C28.0036 16.206 29.5634 16.1701 31.1216 16.1861C41.9202 16.2297 52.7198 16.2564 63.5188 16.2904C63.5554 16.7249 63.5817 17.1632 63.4987 17.5934C62.0245 17.5694 60.5498 17.5687 59.0761 17.5827C59.0606 18.329 59.0345 19.0761 59.0885 19.8208C59.4606 19.9806 59.849 20.1013 60.238 20.2146C60.3229 20.5085 60.3075 20.8189 60.2596 21.1157C59.8605 21.2205 59.4831 21.3946 59.0792 21.4755C59.0721 23.1914 58.9796 24.91 59.0537 26.6244C60.357 26.6349 61.6626 26.5714 62.9656 26.6527C63.0346 25.4318 63.0064 24.2083 62.9857 22.9863C63.5713 22.9075 64.1635 22.9982 64.7526 22.9392C64.8169 24.1497 64.7298 25.3686 64.733 26.5813C65.785 26.6663 66.841 26.6424 67.896 26.6037C67.967 25.3954 67.8636 24.1834 67.9578 22.9745C68.5044 22.9565 69.0528 22.9805 69.6016 22.9634C69.7924 24.1714 69.5805 25.4023 69.6926 26.6179C70.9861 26.6692 72.2818 26.6159 73.5767 26.6555C73.6657 24.9487 73.6142 23.2391 73.6154 21.53C73.2198 21.4119 72.8406 21.242 72.4361 21.1625C72.3641 20.8571 72.4013 20.5421 72.4506 20.2346C72.8357 20.1413 73.2068 19.9983 73.5855 19.8737C73.6964 19.5863 73.5978 19.2775 73.616 18.9775C73.5839 18.5163 73.6193 18.0557 73.6612 17.5968C73.4843 17.5722 73.3034 17.5668 73.1287 17.5737C71.8117 17.6254 70.4933 17.5652 69.1759 17.6106C69.1368 17.2016 69.1662 16.7889 69.1502 16.3773C70.5821 16.2786 72.0189 16.3727 73.4524 16.3573C73.4489 16.1401 73.4338 15.9226 73.4427 15.7024C73.5262 15.5531 73.6935 15.6512 73.7843 15.742C74.0632 16.0329 74.3441 16.3532 74.7416 16.4828C75.6662 16.829 76.7663 16.3175 77.1903 15.4477C77.6256 14.5592 77.2335 13.3704 76.3668 12.9009C75.756 12.6331 75.0064 12.5565 74.4148 12.9134C74.0427 13.1029 73.9059 13.654 73.4296 13.6354C73.4206 13.3848 73.5044 13.1341 73.4531 12.8822C57.7968 12.796 42.1411 12.9758 26.4856 12.8715C26.6315 11.6633 25.1475 10.7564 24.1083 11.3102C23.598 11.5906 23.3732 12.1679 23.2384 12.7019C22.7778 12.3487 22.3329 11.9775 21.9026 11.5895C21.1359 11.9638 20.4203 12.4496 19.6059 12.7154C19.9933 12.2598 20.3979 11.8104 20.6774 11.2758C21.5625 9.73844 21.5918 7.82575 21.054 6.16689C20.6473 4.93588 19.7762 3.88608 18.6948 3.18239C17.1379 2.13922 15.1018 1.86833 13.3192 2.43378ZM17.2661 4.96348C18.3147 5.60612 19.0719 6.74618 19.1612 7.9824C19.302 9.38286 18.5845 10.8273 17.3975 11.5771C16.9604 11.8631 16.4621 12.0445 15.9529 12.1454C15.8383 12.1819 15.6402 12.1714 15.6512 12.3448C15.63 12.6313 15.7169 12.924 15.6159 13.2013C15.3038 13.2072 15.1645 12.8886 14.9708 12.7005C14.6181 12.2743 13.9705 12.2212 13.4974 12.4601C12.8804 12.7406 12.5469 13.4088 12.4555 14.0506C12.3273 14.8628 12.5193 15.8006 13.1788 16.3426C13.681 16.7773 14.5216 16.7821 14.9902 16.2966C15.1617 16.1063 15.2927 15.7752 15.5982 15.7961C15.7302 16.1152 15.623 16.4552 15.6216 16.7836C16.4519 16.9284 17.29 17.2152 17.8963 17.8274C19.3271 19.0758 19.5732 21.4274 18.4159 22.9362C17.7454 23.8433 16.6969 24.4906 15.5615 24.5728C14.5932 24.6741 13.6051 24.3544 12.8408 23.7627C11.7975 22.9403 11.1945 21.572 11.349 20.2449C11.4383 19.314 11.9493 18.4824 12.5782 17.8127C11.8768 17.1997 11.1832 16.5766 10.4828 15.9625C9.90726 16.6719 9.14969 17.3284 8.20673 17.43C6.581 17.595 4.95772 16.2197 4.88976 14.5777C4.83594 13.4414 5.53554 12.3318 6.55975 11.8509C7.41438 11.4208 8.49019 11.4229 9.31754 11.9195C9.77962 12.1733 10.1369 12.5738 10.4379 13.0004C11.1986 12.4492 11.8542 11.7681 12.5927 11.1878C11.9489 10.4768 11.468 9.58981 11.364 8.62695C11.126 6.71074 12.6317 4.82292 14.5002 4.47531C15.4389 4.28218 16.449 4.46303 17.2661 4.96348Z"
          fill="white"
        />
      </svg>
      <Text className={s.title}>Exclusive for $BVM stakers</Text>
      <Text className={s.description}>
        Stake a minimum of 100 $BVM to join the allowlist and unlock a boost of
        up to 30% tokens.
      </Text>
      <Text
        className={s.description}
        dangerouslySetInnerHTML={{ __html: messageObj?.message || '' }}
        mt={'12px'}
      ></Text>
      <ButtonConnected className={s.btnShare} title={'Join the allowlist'}>
        <Button
          className={s.btnShare}
          loadingText="Submitting..."
          onClick={onClickShare}
          isDisabled={isDisabled || messageObj.isDisabled}
        >
          {messageObj?.action}
        </Button>
      </ButtonConnected>
      <Flex
        direction={['column', 'row']}
        justifyContent={'space-evenly'}
        alignItems={'center'}
      >
        <Flex className={s.info}>
          <Text
            fontSize={'14px'}
            fontWeight={600}
            color={'#FFF !important'}
            lineHeight={'100%'}
          >
            <NumberScale
              label={''}
              couters={Number(countCurrentLeaderboard)}
              maximumFractionDigits={0}
              minimumFractionDigits={0}
              defaultFrom={String(oldCountCurrentLeaderboard)}
            />
          </Text>
          BVM holders have joined
        </Flex>
        <Flex className={s.info}>
          Starts in
          <Text whiteSpace={'nowrap'}>
            <Countdown
              className={cs(s.countdownTime, s.highLight)}
              expiredTime={endDate as string}
              onRefreshEnd={() => dispatch(requestReload())}
              hideIcon={true}
              showDay={true}
            />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakingBVM;
