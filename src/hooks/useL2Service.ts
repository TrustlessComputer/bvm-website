import l2ServicesAPI from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  fetchAccountInfo,
  fetchAllOrders,
  fetchOrderList,
} from '@/stores/states/l2services/actions';
import { setL2ServiceAuth } from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { getErrorMessage } from '@/utils/errorV2';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import useNakaAuthen from './useRequestNakaAccount';

const TIMER_INTERVAL = 6000; //6s

const useL2Service = () => {
  const {
    requestAccount,
    requestSignMessage,
    isAuthen: isNakaWalletAuthed,
    loading: isNakaWalletLoading,
    nakaAddress,
  } = useNakaAuthen();

  const timerRef = useRef<any>();

  const clearIntervalTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const { isL2ServiceLogged } = useAppSelector(getL2ServicesStateSelector);

  const dispatch = useAppDispatch();

  const fetchAllData = () => {
    dispatch(fetchAllOrders());
    if (isL2ServiceLogged) {
      dispatch(fetchOrderList());
      dispatch(fetchAccountInfo());
    }
  };

  const getMessageToSign = async (address: string) => {
    try {
      // Get Message from Backend
      const { nonce } = await l2ServicesAPI.getNonce({
        tcAddress: address,
      });
      return nonce; // ==> Message
    } catch (error) {
      const { message } = getErrorMessage(error, 'getMessageToSign');
      toast.error(message);
      throw error;
    }
  };

  const onLoginL2Service = async (address: string) => {
    try {
      // Get Message from Backend
      const message = await getMessageToSign(address);

      // Sign message from NAKA Wallet to get Signature
      const signature = await requestSignMessage(message);

      // Verify Signature to get AccessToken from BackEnd
      const { isVerified, token, refreshToken } =
        await l2ServicesAPI.verifySignature({
          tcAddress: address,
          signature: signature || '',
        });

      // isVerified = true => Logged
      if (isVerified) {
        const data = {
          tcAddress: address,
          accessToken: token,
          refreshToken,
        };

        // Storage AccessToken
        L2ServiceAuthStorage.setToken(data);

        // Update global state from Redux Store
        dispatch(setL2ServiceAuth(true));

        // Set AccessToken to HTTP client request when use
        l2ServicesAPI.setAccesTokenHeader(token);
      } else {
        dispatch(setL2ServiceAuth(false));
        throw new Error('Signature is invalid.');
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'onLoginL2Service');
      toast.error(message);
      throw error;
    }
  };

  const onConnect = async () => {
    try {
      if (nakaAddress || isNakaWalletAuthed) {
        await onLoginL2Service(nakaAddress);
      } else {
        const result = await requestAccount();
        if (result && result.accounts && result.accounts.length > 0) {
          const addressObject = result.accounts[0];
          const address = addressObject.address; //

          console.log('TTTTT address ', address);
          await onLoginL2Service(address);
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'onLogin_V2');
      toast.error(message);
      throw error;
    }
  };

  const onLogout = async () => {
    try {
      L2ServiceAuthStorage.removeToken(nakaAddress);
      l2ServicesAPI.removeAccesTokenHeader();
      dispatch(setL2ServiceAuth(false));
    } catch (error) {
      const { message } = getErrorMessage(error, 'onLogin_V2');
      toast.error(message);
      throw error;
    }
  };

  const onVerifyLoginFirstTime = async () => {
    let isLogged = true;

    // NakaAddress is Null | Undefined ==> Not Logged
    if (!nakaAddress) {
      isLogged = false;
    } else {
      const accessTokenObj = L2ServiceAuthStorage.getToken(nakaAddress);
      // accessTokenObj = null || accessTokenObj = undefined ==> Not Logged
      if (!accessTokenObj) {
        isLogged = false;
      } else {
        // accessTokenObj is already in Storage => this account is Logged In
        // call Verify Access Token from API
        const { isValid: accessTokenValid } =
          await l2ServicesAPI.verifyAccessToken({
            tcAddress: accessTokenObj.tcAddress,
          });

        // AccessToken verify failed ==> Not Logged
        if (!accessTokenValid) {
          // Remove access token form Storage
          L2ServiceAuthStorage.removeToken(nakaAddress);
          l2ServicesAPI.removeAccesTokenHeader();
          isLogged = false;
        } else {
          l2ServicesAPI.setAccesTokenHeader(accessTokenObj.accessToken);
          isLogged = true;
        }
      }
    }

    dispatch(setL2ServiceAuth(isLogged));
  };

  const loopFetchAccountInfor = () => {
    if (isL2ServiceLogged) {
      dispatch(fetchAccountInfo());
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          loopFetchAccountInfor();
        }, TIMER_INTERVAL);
      }
    } else {
      clearIntervalTimer();
    }
  };

  return {
    onConnect,
    onLogout,
    fetchAllData,
    onVerifyLoginFirstTime,
    loopFetchAccountInfor,
    isL2ServiceLogged,
  };
};

export default useL2Service;
