import l2ServicesAPI from '@/services/api/l2services';
import toast from 'react-hot-toast';
import useNakaAuthen from './useRequestNakaAccount';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import { useEffect, useMemo } from 'react';
import { getErrorMessage } from '@/utils/errorV2';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setL2ServiceAuth } from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

const useL2ServiceAuth = () => {
  const {
    requestAccount,
    requestSignMessage,
    isAuthen: isNakaWalletAuthed,
    loading: isNakaWalletLoading,
    nakaAddress,
  } = useNakaAuthen();

  const { isL2ServiceLogged } = useAppSelector(getL2ServicesStateSelector);

  const dispatch = useAppDispatch();

  const onVerify = async (tcAddress: string) => {
    let isValid = false;
    try {
      const token = L2ServiceAuthStorage.getToken(tcAddress);
      if (token) {
        // this account is logged in
        const { isValid: validAPI } = await l2ServicesAPI.verifyAccessToken({
          tcAddress: token.tcAddress,
        });
        if (!validAPI) {
          onRemoveAuthen(token.tcAddress);
          isValid = false;
        } else {
          dispatch(setL2ServiceAuth(true));
          // Set AccessToken to HTTP client request when use
          l2ServicesAPI.setAccesTokenHeader(token.accessToken);
          isValid = true;
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'Failed to verify token');
      toast.error(message);
      onRemoveAuthen(tcAddress);
      isValid = false;
    }

    return isValid;
  };

  const getMessageToSign = async (address: string) => {
    try {
      // Get Message from Backend
      const { nonce } = await l2ServicesAPI.getNonce({
        tcAddress: address,
      });
      return nonce; // ==> Message
    } catch (error) {
      const { message } = getErrorMessage(error, 'useLogin');
      toast.error(message);
      throw error;
    }
  };

  const onRemoveAuthen = (address: string) => {
    L2ServiceAuthStorage.removeToken(address);
    dispatch(setL2ServiceAuth(false));
    l2ServicesAPI.removeAccesTokenHeader();
  };

  const onVerifyAccessToken = async (tcAddress: string) => {
    // let isValid = false;
    // try {
    //   const token = l2ServiceAuthStorage.getToken(tcAddress);
    //   if (token) {
    //     // this account is logged in
    //     const { isValid: validAPI } = await l2ServicesAPI.verifyAccessToken({
    //       tcAddress: token.tcAddress,
    //     });
    //     if (!validAPI) {
    //       onRemoveAuthen(token.tcAddress);
    //       isValid = false;
    //     } else {
    //       dispatch(setAuthen({ tcAddress: token.tcAddress, isAuthen: true }));
    //       axiosSetAccessToken(token.accessToken);
    //       isValid = true;
    //     }
    //   }
    // } catch (error) {
    //   const { message } = getErrorMessage(error, 'Failed to verify token');
    //   toast.error(message);
    //   onRemoveAuthen(tcAddress);
    //   isValid = false;
    // }
    // return isValid;
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
        onRemoveAuthen(address);
        throw new Error('Signature is invalid.');
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'useLogin');
      toast.error(message);
      throw error;
    }
  };

  const onLogin = async () => {
    try {
      const result = await requestAccount();
      if (result && result.accounts && result.accounts.length > 0) {
        const addressObject = result.accounts[0];
        const address = addressObject.address;
        await onLoginL2Service(address);
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'onLogin');
      toast.error(message);
      throw error;
    }
  };

  const isNeededRequestSignMessageFromNakaWallet = useMemo(() => {
    const accessTokenObj = L2ServiceAuthStorage.getToken(nakaAddress);

    // AccessToken from Storage be EMPTY => isL2ServiceLogged = FALSE
    if (!accessTokenObj || !accessTokenObj.accessToken) return true;
    return false;
  }, [nakaAddress, isNakaWalletAuthed, isL2ServiceLogged]);

  useEffect(() => {
    if (nakaAddress && isNakaWalletAuthed && isL2ServiceLogged) {
      const accessTokenObj = L2ServiceAuthStorage.getToken(nakaAddress);
      if (accessTokenObj) {
        l2ServicesAPI.setAccesTokenHeader(accessTokenObj.accessToken);
      }
    }
  }, [nakaAddress, isNakaWalletAuthed, isL2ServiceLogged]);

  return {
    onVerify,
    onLogin,
    onLoginL2Service,
    onVerifyAccessToken,
    isL2ServiceLogged,
    isNeededRequestSignMessageFromNakaWallet,
  };
};

export default useL2ServiceAuth;
