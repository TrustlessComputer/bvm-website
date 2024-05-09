import {
  Box,
  Button,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import { useRouter } from 'next-nprogress-bar';
import { EARN_URL } from '@/constants/route-path';
import ButtonConnected from '@/components/ButtonConnected';
import { formatCurrency } from '@/utils/format';
import { useLaunchpadContext } from '@/providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CLaunchpadAPI from '@/services/api/launchpad';
import { userSelector } from '@/store/states/user/selector';
import useFormatAllowStaking from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/stakingBVMMessage/useFormatAllowStaking';
import { requestReload } from '@/store/states/common/reducer';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useParams } from 'next/navigation';
import { isDesktop } from 'react-device-detect';
import { getUrlToSwap } from '@/utils/url';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import ss from './styles.module.scss';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

interface IStakingTier {
  title: string;
  desc: string;
}

const STAKING_TIER: IStakingTier[] = [
  {
    title: 'Top 2% allowlist participants',
    desc: `<span>30%</span> bonus tokens + <span>$100,000</span> IDO contribution max cap.`
  },
  {
    title: 'Next 8% allowlist participants',
    desc: `<span>20%</span> bonus tokens + <span>$50,000</span> IDO contribution max cap.`
  },
  {
    title: 'The remaining allowlist participants',
    desc: `<span>10%</span> bonus tokens + <span>$20,000</span> IDO contribution max cap.`
  },
]

const StakingBVM = (props: IReferFriend) => {
  const router = useRouter();
  const { currentLaunchpad } = useLaunchpadContext();
  const allowStaking = useFormatAllowStaking();
  const isNeedClaimBTCPoint = allowStaking.isUnclaimed;
  const dispatch = useAppDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const user = useAppSelector(userSelector);
  const params = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initRef = useRef<any>();

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
    if (isNeedClaimBTCPoint) {
      shareTw();
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(allowStaking.status);
        dispatch(requestReload());
      }, 2000);
    } else {
      router.push(EARN_URL);
      // if(Number(allowStaking.amount.staking_amount) > 0) {
      //   router.push(STAKING_URL);
      // } else {
      //   router.push(
      //     getUrlToSwap({
      //       to_token: BVM_TOKEN_ADDRESS,
      //       to_token_type: 'coin',
      //     }),
      //   );
      // }
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
            <Flex justifyContent={'space-between'} gap={"12px"} alignItems={"center"} flexWrap={"wrap"}>
              <Text className={s.title}>
                Buy & Stake $BVM to join allowlist
              </Text>
              <Flex color={'#000'} gap={'4px'} alignItems={'center'}>
                What is $BVM?
                <Popover
                  closeOnBlur={true}
                  placement={'top-end'}
                  initialFocusRef={initRef}
                  isOpen={isOpen}
                  onClose={onClose}
                  styleConfig={{
                    zIndex: 99999999,
                  }}
                >
                  <PopoverTrigger>
                    <Box
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseEnter={isDesktop ? onOpen : undefined}
                      // onMouseOut={isDesktop ? onClose : undefined}
                      cursor={'pointer'}
                    >
                      <Box className={s.tooltipIcon}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.0013 1.16699C3.7813 1.16699 1.16797 3.78033 1.16797 7.00033C1.16797 10.2203 3.7813 12.8337 7.0013 12.8337C10.2213 12.8337 12.8346 10.2203 12.8346 7.00033C12.8346 3.78033 10.2213 1.16699 7.0013 1.16699ZM7.58464 9.91699H6.41797V6.41699H7.58464V9.91699ZM7.58464 5.25033H6.41797V4.08366H7.58464V5.25033Z"
                            fill="black"
                          />
                        </svg>
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow backgroundColor="white !important" />
                    <PopoverBody
                      style={{
                        padding: 5,
                        width: '250px',
                        borderRadius: '8px',
                        border: '1px solid black',
                      }}
                      backgroundColor="white !important"
                    >
                      <Text fontSize={'12px'}>
                        BVM is the native cryptocurrency of the BVM ecosystem
                        that binds all Bitcoin L2 blockchains together.{' '}
                        <a
                          style={{ textDecoration: 'underline' }}
                          href={getUrlToSwap({ to_token: BVM_ADDRESS.bvm })}
                        >
                          Buy BVM
                        </a>
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
            <Text className={s.desc}>
              The more $BVM you stake, the higher allowlist tier you get:
            </Text>
            <Flex direction={"column"} gap={"8px"} mt={"12px"}>
              {
                STAKING_TIER.map((tier: IStakingTier, index: number) => {
                  return (
                    <Flex direction={"column"} gap={"8px"} className={ss.tier_container}>
                      <Flex gap={"8px"}>
                        <Text className={ss.tier_index}>TIER {index +  1}</Text>
                        <Text className={ss.tier_title}>{tier?.title}</Text>
                      </Flex>
                      <Text className={ss.tier_description}
                            dangerouslySetInnerHTML={{__html: tier?.desc}}
                      />
                    </Flex>
                  )
                })
              }
            </Flex>
          </Flex>
          {/*<Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}></Text>
            <Text className={s.desc} textAlign={'right'}>
            </Text>
          </Flex>*/}
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          <Flex columnGap={"20px"} rowGap={"12px"} direction={["column", "row"]}>
            <ButtonConnected className={cs(s.btnShare, s.btnSignIn)} title={"BUY $BVM"}>
              <Button className={s.btnBuy} onClick={() => {
                router.push(getUrlToSwap({ to_token: BVM_ADDRESS.bvm }))
              }}>BUY $BVM</Button>
            </ButtonConnected>
            <Flex direction={"column"} alignItems={"center"} flex={1}>
              <ButtonConnected className={cs(s.btnShare, s.btnSignIn)} title={"Stake now"}>
                <Button
                  className={s.btnShare}
                  loadingText="Submitting..."
                  onClick={onClickShare}
                  isDisabled={isDisabled}
                >
                  {isNeedClaimBTCPoint
                    ? `Tweet to claim`
                    : Number(allowStaking.amount.staking_amount) > 0
                      ? 'Stake now'
                      : 'Stake now'}
                </Button>
              </ButtonConnected>
              <Text
                className={s.desc}
                textAlign={'center'}
                fontSize={'12px !important'}
              >
                Your stBVM:{' '}
                {formatCurrency(
                  allowStaking.amount.staking_amount,
                  0,
                  2,
                  'BTC',
                  true,
                )}{' '}
                stBVM
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakingBVM;
