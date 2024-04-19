import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import styles from './styles.module.scss';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import { MIN_DECIMAL, MULTIPLE_POINT_SYMBOL } from '@/constants/constants';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import StakeHistoryModal from '@/modules/staking/components/HistoryModal';
import BigNumberJS from 'bignumber.js';
import NumberScale from '@/components/NumberScale';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import {
  historySelector,
  isFetchedStakeUserSelector,
  stakeUserSelector,
} from '@/stores/states/stakingV2/selector';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import { requestReload } from '@/stores/states/common/reducer';
import { isAmount } from '@utils/number';
import { sleep } from '@toruslabs/base-controllers';
import TOKEN_ADDRESS from '@constants/token';
import { CDN_URL_ICONS } from '@/config';
import {
  NakaConnectContext,
  STAKING_URL,
} from '@/Providers/NakaConnectProvider';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
import toast from 'react-hot-toast';
import UnStakeModal from '@/modules/staking/components/UnStakeModal';
import UnStakeConfirmModal from '@/modules/staking/components/UnStakeConfirmModal';
import useNakaAuthen from '@hooks/useRequestNakaAccount';

const TOKEN_ICON_SIZE = isMobile ? 18 : 28;
const LOGO_SIZE = isMobile ? 48 : 68;
const MAX_DECIMAL = 3;

const HeaderPoints = () => {
  const stakeUser = useAppSelector(stakeUserSelector);
  const histories = useAppSelector(historySelector);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const { getConnector } = useContext(NakaConnectContext);
  const { buttonText, requestAccount, isAuthen, loading } = useNakaAuthen();

  const {
    isOpen: isOpenUnStake,
    onOpen: onOpenUnStake,
    onClose: onCloseUnStake,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmUnStake,
    onOpen: onOpenConfirmUnStake,
    onClose: onCloseConfirmUnStake,
  } = useDisclosure();

  const address = useAppSelector(nakaAddressSelector);
  const isFetched = useAppSelector(isFetchedStakeUserSelector) || !address;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [bonusReward, setBonusReward] = React.useState<{
    newBonus: number;
    cachedBonus: number;
  }>({ newBonus: 0, cachedBonus: 0 });
  console.log(setBonusReward);

  // React.useEffect(() => {
  // setBonusReward(({ newBonus }) => {
  //   // (1000 * 0.25 * 600) / (24 * 3600 * 365);
  //   return {
  //     newBonus: new BigNumberJS(stakeUser?.principleBalance || 0)
  //       .times(0.25)
  //       .div(100)
  //       .times(600)
  //       .div(new BigNumberJS(24).times(3600).times(365))
  //       .plus(newBonus)
  //       .toNumber(),
  //     cachedBonus: newBonus,
  //   };
  // });
  // }, [stakeUser?.teamPrincipleBalance]);

  const counterBonus = React.useMemo(() => {
    const formatAmount = (_amount?: string) => {
      return formatCurrency(
        formatAmountToClient(new BigNumberJS(_amount || '0').toFixed(0)),
        MAX_DECIMAL,
        MAX_DECIMAL,
        'BTC',
        false,
      );
    };
    return {
      to: formatAmount(
        new BigNumberJS(stakeUser?.rewardAmount || 0)
          .plus(bonusReward.newBonus)
          .toString(),
      ),
      from: formatAmount(
        new BigNumberJS(stakeUser?.rewardAmount || 0)
          .plus(bonusReward.cachedBonus)
          .toString(),
      ),
    };
  }, [stakeUser?.rewardAmount, stakeUser?.teamPrincipleBalance, bonusReward]);

  const isLoadingReward = !isFetched || isLoading;

  const isHasReward = React.useMemo(() => {
    return new BigNumberJS(formatAmountToClient(stakeUser?.rewardAmount || 0)).gt(
      0.00001,
    );
  }, [stakeUser?.rewardAmount])

  const isDisableReward = React.useMemo(() => {
    return isLoadingReward ||
      !isAmount(stakeUser?.rewardAmount || 0) ||
      !isHasReward
  }, [isLoadingReward, stakeUser?.rewardAmount, isHasReward]);

  const cStake = new CStakeV2();

  const onClaimReward = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const connector = getConnector();
      const calldata = cStake.createClaimRewardCallData();
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Claim Reward',
        chainType: "NAKA"
      });
      dispatch(requestReload());
      await sleep(2);
      toast.success('Successfully.');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [cStake]);

  const renderItem = (
    title: string,
    icon: string,
    value: any,
    size?: number,
  ) => {
    return (
      <Flex className={styles.item}>
        <Flex width={'20px'} height={'20px'} alignItems={'center'}>
          <Image
            src={icon}
            alt={title}
            width={size || TOKEN_ICON_SIZE}
            height={TOKEN_ICON_SIZE}
          />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          <p className={styles.box_amount}>
            <span>{value}</span>
          </p>
          <p className={styles.box_desc}>{title}</p>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Flex
          alignItems={{ base: 'start', lg: 'center' }}
          gap={{ base: '24px', lg: '48px' }}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Flex gap="16px" flexDirection={{ base: 'column', lg: 'row' }}>
            <Flex direction="row" alignItems="center">
              <Jazzicon
                diameter={LOGO_SIZE}
                seed={jsNumberForAddress(address || TOKEN_ADDRESS.ADDRESS_ZERO)}
              />
              <p className={styles.box_title}>
                {!!address ? address.substring(0, 6) : '-'}
              </p>
              <Popover trigger={'click'} isLazy placement="bottom-start">
                <PopoverTrigger>
                  {isAuthen && (!!histories.length || stakeUser?.isStaked || isHasReward) ? (
                    <Image
                      src="/icons/staking/menu-dots.svg"
                      height={20}
                      width={20}
                      alt="menu-dots.svg"
                      style={{
                        rotate: '90deg',
                        marginLeft: '4px',
                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </PopoverTrigger>
                <PopoverContent
                  maxWidth="120px"
                  borderWidth="0px"
                  borderRadius="8px"
                >
                  <PopoverBody borderRadius="8px" lineHeight="150%">
                    {!!histories.length && (
                      <Text
                        cursor="pointer"
                        fontSize="16px"
                        fontWeight="400"
                        onClick={onOpen}
                      >
                        History
                      </Text>
                    )}
                    {isHasReward && (
                      <Button
                        isLoading={isLoadingReward}
                        isDisabled={isDisableReward}
                        className={styles.sBtn}
                        onClick={onClaimReward}
                        fontSize="16px"
                        fontWeight="400"
                      >
                        Claim
                      </Button>
                    )}
                    {stakeUser?.isStaked && (
                      <Text
                        onClick={() => {
                          if (onOpenConfirmUnStake) onOpenConfirmUnStake();
                        }}
                        cursor="pointer"
                        color="red"
                        fontSize="16px"
                        fontWeight="400"
                      >
                        Unstake
                      </Text>
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <Box className={styles.box}>
              {renderItem(
                'Staked',
                `${CDN_URL_ICONS}/ic-bvm.svg`,
                `${formatCurrency(
                  formatAmountToClient(stakeUser?.principleBalance || '0'),
                  MIN_DECIMAL,
                  STAKE_MAX_DECIMAL,
                  'BTC',
                  false,
                  10000,
                )} BVM`,
              )}
              {renderItem(
                'Mined',
                '/icons/staking/gem-icon.png',
                <p>
                  {isAmount(stakeUser?.multiplierPoint)
                    ? `${formatCurrency(
                        formatAmountToClient(stakeUser?.shardMined || '0'),
                        0,
                        3,
                        'TC',
                      )}`
                    : '+0'}{' '}
                  {MULTIPLE_POINT_SYMBOL}
                </p>,
                TOKEN_ICON_SIZE - 10,
              )}
              {renderItem(
                'Mining',
                '/icons/staking/gem-icon.png',
                <p style={{ color: '#6FFE43', fontSize: '20px' }}>
                  <NumberScale
                    label={'+'}
                    couters={new BigNumberJS(
                      formatAmountToClient(stakeUser?.shardMining || '0'),
                    ).toNumber()}
                    maximumFractionDigits={3}
                    minimumFractionDigits={3}
                    subLabel={` SHARDS`}
                  />
                </p>,
                TOKEN_ICON_SIZE - 10,
              )}

              {renderItem(
                'Interest earned',
                '/icons/staking/ic-interest-rate.svg',
                <p style={{ color: '#6FFE43', fontSize: '20px' }}>
                  <NumberScale
                    label={'+'}
                    couters={new BigNumberJS(counterBonus.to).toNumber()}
                    maximumFractionDigits={3}
                    minimumFractionDigits={3}
                    defaultFrom={counterBonus.from}
                    subLabel={` BVM`}
                  />
                </p>,
                TOKEN_ICON_SIZE,
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          gap={{ base: '12px', lg: '24px' }}
        >
          <Flex
            gap="8px"
            flexDirection={{ base: 'row-reverse', lg: 'column' }}
            alignItems={'center'}
          >
            <p className={styles.interestRate}>
              {!address || !stakeUser?.isStaked
                ? 'Up to 58% APR'
                : `${formatCurrency(stakeUser.stakingPercent, 0, 2)}% APR`}
            </p>
          </Flex>
          <Button
            height="50px"
            fontSize="16px"
            width="136px"
            fontWeight="700"
            background="#10C800"
            borderRadius="100px"
            isDisabled={loading}
            isLoading={isLoading}
            onClick={() => {
              if (isAuthen) {
                return window.open(STAKING_URL, '_blank');
              }
              return requestAccount();
            }}
          >
            {buttonText ? buttonText : 'Stake'}
          </Button>
        </Flex>
      </Box>
      <StakeHistoryModal isOpen={isOpen} onClose={onClose} />
      {isOpenUnStake && (
        <UnStakeModal show={isOpenUnStake} onHide={onCloseUnStake} />
      )}
      {isOpenConfirmUnStake && (
        <UnStakeConfirmModal
          show={isOpenConfirmUnStake}
          onHide={onCloseConfirmUnStake}
          onConfirm={() => {
            if (onOpenUnStake) onOpenUnStake();
          }}
        />
      )}
    </Box>
  );
};

export default HeaderPoints;
