import { useDispatch, useSelector } from 'react-redux';

import React, { useMemo } from 'react';

import axios from 'axios';
import { ethers } from 'ethers';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import {
  hasSpreadTheLoveSelector,
  isDoneBirthEternalSelector,
  showClaimButtonSelector,
  userContributeSelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import {
  setBirthEternal,
  setBirthEternalAddress,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { showError, showSuccess } from '@/components/toast';
import { getError } from '@/utils/error';

const useBirthEternal = () => {
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const userContributeInfo = useSelector(userContributeSelector);
  const hasSpreadTheLove = useSelector(hasSpreadTheLoveSelector);
  const showClaimButton = useSelector(showClaimButtonSelector)(address);
  const isDone = useSelector(isDoneBirthEternalSelector)(address);
  const [claimming, setClaimming] = React.useState(false);

  const isHasTw = useMemo(
    () =>
      hasSpreadTheLove &&
      Boolean(userContributeInfo?.twitter_username) &&
      !ethers.utils.isAddress(userContributeInfo?.twitter_username || ''),
    [userContributeInfo?.twitter_username, hasSpreadTheLove],
  );

  const onJoinClick = () => {
    setTimeout(() => {
      window.open('https://eternalai.org/dojo', '_blank');
    }, 100);

    setTimeout(() => {
      dispatch(setBirthEternalAddress(address));
    }, 2000);
  };

  const onClaim = async () => {
    setClaimming(true);
    try {
      const res = await axios.get(
        `https://api-dojo.eternalai.org/api/other/get-user-deploy-count?twitter_username=${
          userContributeInfo?.twitter_username || ''
        }`,
      );
      if (res?.data?.data && Number(res?.data?.data)) {
        showSuccess({
          message: 'Congratulations! You have successfully claimed 1 $EAI.',
        });
      } else {
        throw new Error('Some thing went wrong. Try again.');
      }
      dispatch(
        setBirthEternal({
          address,
          birthEternal: {
            address: address,
            count: res?.data?.data,
          },
        }),
      );
    } catch (error) {
      const { message } = getError(error);
      console.log('message', message);
      showError({
        message: 'You have not yet built your own AI model',
      });
    } finally {
      setClaimming(false);
    }
  };

  return {
    onJoinClick,
    onClaim,
    claimming,
    isHasTw: isHasTw,
    showClaimButton: isHasTw && showClaimButton,
    isDone,
  };
};

export default useBirthEternal;
