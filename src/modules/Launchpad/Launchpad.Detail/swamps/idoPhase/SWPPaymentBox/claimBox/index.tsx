'use client';

import { showError, showSuccess } from '@/components/toast';
import CContract from '@/contract/contract';
import { formatCurrency } from '@/utils/format';
import sleep from '@/utils/sleep';
import {
  Button,
  Center,
  Flex,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import cx from 'classnames';
import { first } from 'lodash';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import { commonSelector } from '@/stores/states/common/selector';
import CPaymentSWPAPI from '@/modules/Launchpad/services/payment.swp';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import { ILaunchpadClaimParams } from '@/modules/Launchpad/services/launchpad.interfaces';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { requestReload } from '@/stores/states/common/reducer';
import { getErrorMessage } from '@/utils/errorV2';

const ClaimBox = () => {
  const { getConnector } = useContext(NakaConnectContext);
  const dispatch = useDispatch();
  const params = useParams();
  const needReload = useSelector(commonSelector).needReload;
  const [loading, setLoading] = useState<boolean>(true);

  const { nakaAddress, isAuthen, requestAccount } = useNakaAuthen();

  const id = params?.id;
  const [currentLeaderboard, setCurrentLeaderboard] =
    useState<ILeaderBoardEAI | undefined>(undefined);
  const launchpadApi = useRef(new CPaymentSWPAPI()).current;
  const contract = useRef(new CContract()).current;

  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  // const { currentLaunchpad } = useLaunchpadContext();

  useEffect(() => {
    if (id) {
      getLaunchpadInfo();
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        }),
      ]);
      setCurrentLeaderboard(first(response[0]?.rows));

      // const data = {
      //   ...first(response[0]?.rows),
      //   token_balance: '1000',
      //   is_claimed: true,
      //   claimable: true,
      // }
      // setCurrentLeaderboard(data);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  const amountAllocation = useMemo(
    () => currentLeaderboard?.token_balance || '0',
    [currentLeaderboard],
  );

  const isClaimable = useMemo(
    () => currentLeaderboard?.claimable,
    [currentLeaderboard],
  );

  const isClaimed = useMemo(
    () => currentLeaderboard?.is_claimed,
    [currentLeaderboard],
  );

  const isDisabled = useMemo(() => {
    return claiming;
  }, [claiming]);

  const onClaim = async () => {
    try {
      const message = 'claim_GSWP_' + nakaAddress;
      const connector = getConnector();
      const signature = await connector.requestSignMessage({
        signMessage: message,
        target: 'popup',
        fromAddress: nakaAddress,
      });

      const body: ILaunchpadClaimParams = {
        address: nakaAddress as string,
        message: message,
        signature: signature.signature,
      };

      return await launchpadApi.requestClaimIDO(body);
    } catch (error) {
      throw error;
    }
  };

  const onClickClaim = async () => {
    try {
      setClaiming(true);
      await onClaim();
      await sleep(2);
      setClaimed(true);
      showSuccess({
        message: 'You has claimed successfully!',
      });
      dispatch(requestReload());
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setClaiming(false);
    }
  };

  const renderContent = () => {
    let content = <></>;

    if (loading) {
      content = <Spinner color={'#000'} />;
    } else if (!isClaimable && !isAuthen) {
      content = (
        <Flex className={s.balanceWrapper} flexDirection={'column'}>
          <Text className={s.balanceTitle}>Claimable balance</Text>
          <Skeleton isLoaded={false}>
            <Text className={s.balanceBalance}>{`${formatCurrency(
              amountAllocation,
              0,
              2,
            )} $GSWP`}</Text>
          </Skeleton>
          <Flex gap={'24px'} w={'100%'} mt="20px">
            <Button className={s.linkClaimed} onClick={requestAccount} flex={1}>
              Sign in to claim
            </Button>
          </Flex>
        </Flex>
      );
    } else if (isClaimed || claimed) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceBalance}>
              {`Congrats! You have successfully claimed ${formatCurrency(
                amountAllocation,
                0,
                3,
              )} GSWP tokens.`}
            </Text>
          </Flex>
          <Flex gap={'24px'} w={'100%'}>
            <Button
              className={s.btnClaimed}
              onClick={() => {
                window.open(
                  `https://swamps-explorer.tc.l2aas.com/address/${nakaAddress}`,
                );
              }}
              flex={1}
            >
              View your $GSWP
            </Button>
          </Flex>
        </>
      );
    } else if (!(isClaimed || claimed) && isClaimable) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Flex gap={'4px'}>
              {parseFloat(amountAllocation) > 0 && (
                <Text className={s.balanceBalance}>{`${formatCurrency(
                  amountAllocation,
                  0,
                  2,
                )} $GSWP`}</Text>
              )}
            </Flex>
          </Flex>
          <Flex gap={'24px'} w={'100%'}>
            <Button
              isDisabled={isDisabled}
              onClick={onClickClaim}
              className={s.linkClaimed}
              isLoading={claiming}
              loadingText={'Claiming...'}
              flex={1}
            >
              Claim $GSWP
            </Button>
          </Flex>
        </>
      );
    }

    return (
      <Center className={cx(s.wrapper)}>
        <Center className={cx(s.container, s.loadingContainer)}>
          {content}
        </Center>
      </Center>
    );
  };

  return renderContent();
};

export default ClaimBox;
